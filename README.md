# No Code Bot for Webex Framework (NocoBot4Webex)
Node code bot for Webex is a super easy tool to build chat bots for Webex. Just create a yaml file with regrex equation for matching and the created response for the system.


## Setup
Install Noco Bot with `npm install noco-bot-4-webex` then run the start server command with the following code below. This will deal with connecting to the webex server and communication. The only other step is to setup your config files.
```js
// index.js
(new (require( "noco-bot-4-webex" ))()).Init();
```

### API Code
Create a file in your root directory call `token.yaml` with the property `bot-token` and the code provided by the Webex Development Portal.

```yaml
# token.yaml
---
bot-token: demo.token.provided.by.webex
```

### Config Bot File
Then setup the config file for the bot to use. Create a file called `bot.yaml` in your root directory. Then set the regrex expressons and the resonse. For regrex expression, use js format `/[express]/[flags]`, even if you do not have flags had a trailing slash.

```yaml
# bot.yaml
---
version: 1.0.0
response-startup: Hi $nickname. Hope your having a great day!
response-fallback: Sorry $nickname, I did not understand that, could you say it again.
responses:
  - regrex: /(hi|hello)/ig
    message: Hi $nickname, you used regrex match.
  - regrex: /(bye)/ig
    message: Bye $nickname, you used regrex match.
```

| Varible | Description |
|---|---|
| `$nickname` | Nickname of user |
| `$name` | Full name of user |
| `$email` | Email of user |
| `$message` | Message Sent by User |
| `$created` | When the message was sent |

## Tips
- To get a new line put two spaces before the new line inline as `\s\s\n` like `this is  \nA new line`.
- do not use the `g` global flag for regrex

## Fixme
- [ ] add clear method
- [ ] Allow inline varibles for startup message and error message
- [ ] Allow inline code to be processes
- [ ] Get version from package.json file for bot response 
- [x] Fix documentation for server.js

