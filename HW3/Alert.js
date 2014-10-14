#!/usr/bin/env node
var b = require('bonescript');
var util = require('util');
var s = require("child_process");

var P1 = "P9_13";
var P2 = "P9_11";
var P1signal = 0;
var P2signal = 0;

s.exec("i2cset -y 1 0x48 0x3 0x19");
s.exec("i2cset -y 1 0x49 0x3 0x19");

b.pinMode(P1, b.INPUT);
b.pinMode(P2, b.INPUT);
b.attachInterrupt(P1, true, b.FALLING, P1Alert);
b.attachInterrupt(P2, true, b.FALLING, P2Alert);

function P1Alert()
{
    //util.print("1\n");
    if(P1signal)
    {
        var x = s.exec('i2cget -y 1 0x48 0', function(stdout, stderr) {
            //console.log(stderr);
            var f = stderr*9/5+32;
            util.print(util.format("TMP 1:   Celsius: %d   Farenheit: %d\n", stderr, f));
        });
    }
    P1signal = 1;
}

function P2Alert()
{
    //util.print("2\n");
    if(P2signal)
    {
        var x = s.exec('i2cget -y 1 0x49 0', function(stdout, stderr) {
            //console.log(stderr);
            var f = stderr*9/5+32;
            util.print(util.format("TMP 2:   Celsius: %d   Farenheit: %d\n", stderr, f));
        });
    }
    P2signal = 1;
}