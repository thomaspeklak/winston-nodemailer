#Winston NodeMailer
[![Build
Status](https://travis-ci.org/thomaspeklak/winston-nodemailer.png)](https://travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME]) [![Dependency
Status](https://gemnasium.com/thomaspeklak/winston-nodemailer.png)](https://gemnasium.com/thomaspeklak/winston-nodemailer)

__WIP__

is a transport for Winston that uses NodeMailer to send mails for log events.
Contrary to other solution Winston NodeMailer requires you to provide a valid
NodeMailer transport. It's in your hand how to configure your desired
transport and to inject it into this module.

##Installation

```bash
npm install winston-nodemailer
```

You can either invoke it via winston.Transports.NodeMailer like this:

```javascript
var winston = require("winston");
require("winston-nodemailer");

winston.add(winston.Transports.NodeMailer, options);
```

or with a local variable that Winston NodeMailer exports:

```javascript
var winston = require("winston");
var winstonNodeMailer = require("winston-nodemailer");

winston.add(winstonNodeMailer, options);
```

##Options

<dl>
  <dt>to<dt>
  <dd>The address(es) you want to send to. [required]</dd>
  <dt>from</dt>
  <dd>The address you want to send from. (default:
  winston@[server-host-name])</dd>
  <dt>subject</dt>
  <dd>Subject for email (default: winston: {{level}} {{msg}})</dd>
  <dt>level</dt>
  <dd>Level of messages that this transport should log.</dd>
  <dt>silent</dt>
  <dd>Boolean flag indicating whether to suppress output.</dd>
  <dt>transport</dt>
  <dd>A NodeMailer transport e.g. smtpTransport [required]</dd>
</dl>
