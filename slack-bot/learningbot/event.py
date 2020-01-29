import json
import urllib
import os

BOT_TOKEN = os.environ['BOT_TOKEN']
SLACK_URL = "https://slack.com/api/chat.postMessage"

def receive(event, context):
    data = json.loads(event['body'])
    print("Got data: {}".format(data))
    return_body = "ok"

    if data["type"] == "url_verification":
        print("Received challenge")
        return_body = data["challenge"]
    elif (
        data["type"] == "event_callback" and
        data["event"]["type"] == "message" and
        "subtype" not in data["event"]
    ):
        handle_message(data)

    return {
        "statusCode": 200,
        "body": return_body
    }

def handle_message(data):
    poster_user_id = data["event"]["user"]
    print(data)
    reply = "Hello {}. Nice to meet you!".format(
        poster_user_id
    )
    send_message(data, reply)

def send_message(data, text):
    print("Sending message to Slack: {}".format(text))
    json_txt = json.dumps({
        "channel": data["event"]["channel"],
        "text": text
    }).encode('utf8')

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(BOT_TOKEN)
    }

    req = urllib.request.Request(
        SLACK_URL,
        data=json_txt,
        headers=headers
    )
    urllib.request.urlopen(req)