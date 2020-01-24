# Slack Bot
## Functionalities
- Bot sends reminder to do active tasks
    * on a regularly scheduled basis
---
### SENDING REMINDERS
- GET user_id from http://slack.com/api/users.list
    - Match user_ids with current users in our system through "email" field
- POST https://slack.com/api/chat.postMessage with user_id as "channel" field
- Response payload in JSON form

---
## Slash Commands
### Viewing Certificates

### Mark task as complete



