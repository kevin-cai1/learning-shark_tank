import os
import time
import re
import slack

slack_client = SlackClient(os.environ.get('SLACK_BOT_TOKEN'))
bot_id = None

RTM_READ_DELAY = 1  # 1 second delay to process RTM reads
MENTION_REGEX = "^<@(|[WU].+?)>(.*)"



if __name__ == "__main__":
    if slack_client.rtm_connect(with_team_state=False):
        print("Bot connected and running")
        bot_id = slack_client.api_call('auth.test')['user_id']
        print(bot_id)
    else:
        print("Connection failed")
