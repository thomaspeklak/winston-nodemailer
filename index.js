"use strict";

var util    = require("util");
var os      = require("os");
var winston = require("winston");
var _       = require("underscore");

function template(text, obj) {
    return _.template(text, obj, {
        interpolate : /\{\{(.+?)\}\}/g
    });
}

var check = function (options) {
    if (!options.to) {
        throw "winston-nodemailer requires 'to' property";
    }

    if (!options.transport) {
        throw "winston-nodemailer requires a valid nodemailer transport";
    }

};

var NodeMailer = function (options) {
    options = options || {};

    check(options);
    this.mailOptions = {
        name      : "nodemailer",
        to        : options.to,
        from      : options.from                   || "winston@" + os.hostname(),
        level     : options.level                  || "info",
        silent    : options.silent                 || false,
        subject   : options.subject ?
            template(options.subject) :
            template("winston: {{level}} {{msg}}")
    };
    this.transport = options.transport;

    this.handleExceptions = options.handleExceptions || false;
};

/** @extends winston.Transport */
util.inherits(NodeMailer, winston.Transport);

NodeMailer.prototype.log = function (level, msg, meta, callback) {
    var self = this;
    if (this.silent) return callback(null, true);

    if (meta) // add some pretty printing
        meta = util.inspect(meta, null, 5);

    var mailOptions = _.clone(this.mailOptions);

    var text = meta ?  msg + "\n\n" + meta : msg;

    mailOptions.subject = this.mailOptions.subject({level: level, msg: msg.split("\n")[0]});
    mailOptions.text = text;

    this.transport.sendMail(mailOptions, function (err) {
        if (err) self.emit("error", err);
        self.emit("logged");
        callback(null, true);
    });
};


winston.transports.NodeMailer = NodeMailer;

module.exports = NodeMailer;

