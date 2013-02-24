"use strict";

var vows = require("vows");
var assert = require("assert");
var winston = require("winston");
var helpers = require("winston/test/helpers");
var NodeMailer = require("../index.js");

function assertMail(transport) {
    assert.instanceOf(transport, NodeMailer);
    assert.isFunction(transport.log);
}

var called = false;
var nodeMailerTransport = {
    sendMail: function (optoins, cb) {
        called = true;
        cb(null);
    }
};

var transport = new (NodeMailer)({ to: "test.@test.xx", from: "dev@server.com", transport: nodeMailerTransport });

vows.describe("winston-mail").addBatch({
    "An instance of the NodeMailer Transport": {
        "should have the proper methods defined": function () {
            assertMail(transport);
        },
        "the log() method": helpers.testNpmLevels(transport,
        "should log messages to NodeMailer", function (ign, err, logged) {
            assert.isTrue(!err);
            assert.isTrue(logged);
            assert.isTrue(called);
        })
    }
}).export(module);
