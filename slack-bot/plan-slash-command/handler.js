'use strict';
var request = require('request')

const SLACK_OAUTH_TOKEN = process.env.OAUTH_TOKEN
const SUCCESS_RESPONSE = {
  isBase64Encoded: true,
  statusCode: 200,
  headers: {},
  body: ""
}

module.exports.hello = (event, context, callback) => {
  getUser(event, callback);
};

function getUser(event, callback) {
  if (event){
    var data = event['body']
    var regex = /(user_id=\S+)&/g
    var match = regex.exec(data)
    console.log("DATA",data)
    console.log("MATCH", match)
    if (match){
      var id = match[0].split("&")[0]
      var user_id = id.split("=")[1]
    }

    var regex2 = /(channel_id=\S+)&/g
    var match2 = regex2.exec(data)
    if (match2) {
      var temp = match2[0].split("&")[0]
      var channel_id = temp.split("=")[1]
    }
  }
  console.log("USER ID: ", user_id)
  console.log("CHANNEL ID: ", channel_id)
  callback(null, SUCCESS_RESPONSE)
  get_email(user_id, channel_id)
}

function get_email(user_id, channel_id) {
  var options = {
    'method': 'GET',
    'url': `https://slack.com/api/users.info?user=${user_id}`,
    'headers': {
      'Authorization': 'Bearer xoxb-910569057991-913295056547-VclTdvlyWKNdVjnyWMnwWlsI'
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    var res = JSON.parse(response.body)
    //var email = res.user.profile.email
    console.log(JSON.parse(response.body))
    var res = JSON.parse(response.body)
    var email = res.user.profile.email
    console.log(email)
    get_plan(email, channel_id)
  });
}

function get_plan(email, channel_id) {
  request(`https://learning-planning-tracker.herokuapp.com/plan/active/${email}`, function(err, resp, body) {
    console.log('error:', err)
    console.log('statusCode:', resp && resp.statusCode)
    console.log('body', body)
    var response_body = format_response(body)
    postPlan(response_body, channel_id)
  })
}

function format_response(body) {
  var plans = [{
      "type": "section",
      "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Here is your current learning plan:"
      }
  }]
  var div = {
  "type": "divider"
  }
  var json_body = JSON.parse(body)
  var entries = json_body.entries
  entries.forEach(element => {
    plans.push(div)
    var entry = {
      "type": "section",
      "text": {
      "type": "mrkdwn",
      "text": `*Course:* ${element.course}\n*Start Date:* ${element.start_date}\n*End Date:* ${element.end_date}`
    },
      "accessory": {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
        "alt_text": "calendar thumbnail"
      }
    }
    plans.push(entry)
  });

  var block = JSON.stringify(plans)
  return block
}

function postPlan(block, channel_id) {
  console.log("CHANNEL ID: ", channel_id)
  let options = {
    url: 'https://slack.com/api/chat.postMessage',
    headers: {
      'Accept': 'application/json'
    },
    method: 'POST',
    form: {
      token: SLACK_OAUTH_TOKEN,
      channel: channel_id,
      blocks: block
    }
  }

  request(options, function(err, resp, body) {
    console.log('error:', err)
    console.log('statusCode:', resp && resp.statusCode)
    console.log('body', body)
  })
}