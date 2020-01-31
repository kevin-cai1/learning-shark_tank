import requests
import sys
from pprint import pprint
import json

BOT_TOKEN = "xoxb-910569057991-913295056547-VclTdvlyWKNdVjnyWMnwWlsI"
BOT_ID = ""

def get_request(url):
    URL = url
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(BOT_TOKEN)
    }
    r = requests.get(url=URL, headers=HEADERS)
    return r.json()

def send_message(user, block):
    SLACK_URL = "https://slack.com/api/chat.postMessage"
    print("Sending message to Slack")
    json_txt = json.dumps({
        "channel": open_channel(user),
        "blocks": block
    }).encode('utf8')

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(BOT_TOKEN)
    }
    
    response = requests.request("POST", SLACK_URL, data=json_txt, headers=headers)

def open_channel(user_id):
    url = 'https://slack.com/api/im.open'
    json_txt = json.dumps({
	    "user": "{}".format(user_id)
    }).encode('utf8')   
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(BOT_TOKEN)
    }
    response = requests.request("POST", url, headers=headers, data = json_txt)
    res = response.json()
    if ('channel' in res):
        id = res['channel']['id']
        return id
    else:
        return 0
	
def get_users():
    global BOT_ID
    users = get_request('https://slack.com/api/users.list')['members']
    user_dict = {}
    for u in users:
        if (not u['deleted']):
            if (u['name'] == 'learningtrackingbot'):
                BOT_ID = u['id']
            else:
                if ('email' in u['profile']):
                    user_dict[u['id']] = u['profile']['email']
    return user_dict

def remind():
    user_dict = get_users()

    # go through database
    for slack_id, email in user_dict.items():

        # get_request(https://{}/plan/{email})
        print(email)
        # send message to user with slack_id
        message = gen_block("course from db", "end_date")
        send_message(slack_id, message)

        
def gen_block(course, end_date):
    blocks = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*REMINDER*\nYou have an upcoming deadline in your learning plan"
			}
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Course:*\n{course}".format(course=course)
				},
				{
					"type": "mrkdwn",
					"text": "*Due Date:*\n{date}".format(date=end_date)
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Finish"
					},
					"style": "primary",
					"value": "click_me_123"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Postpone"
					},
					"style": "danger",
					"value": "click_me_123"
				}
			]
		}
    ]
    print(type(blocks))
    return blocks

if __name__ == "__main__":
    remind()

    #data = json.dumps({
	#    "channel":"DT8JCMC2K",
	#    "text": "Python test message"
    #}).encode('utf8')
    #send_message()