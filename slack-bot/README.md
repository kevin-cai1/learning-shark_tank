# Slack Bot Integration with our Learning API
## Slack Reminders
Implemented in the form of a Python script `reminder.py`
### Usage
1. Run `python3 reminder.py` to execute the script
2. The script will automatically pull data from the Learning API at https://learning-planning-tracker.herokuapp.com/
3. The script will send POST requests through the Slack API to automatically message users with reminders of their tasks

## /plan Slash Command
A serverless function deployed through AWS Lambda that handles slash command interactivity with Slack.  
Found at `plan-slash-command/handler.js`  
Serverless function acts as an endpoint for the slack app to POST when the slash command is requested.  
The function handles the request and returns information fetched from our Learning API.