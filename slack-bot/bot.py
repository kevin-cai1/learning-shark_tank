import os
import time
import re
import slack

slack_client = slack.webClient(token=os.environ.get('SLACK_BOT_TOKEN'))
bot_id = None

RTM_READ_DELAY = 1  # 1 second delay to process RTM reads
MENTION_REGEX = "^<@(|[WU].+?)>(.*)"


