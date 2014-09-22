#!/usr/bin/env node
var b = require('bonescript');
var util = require('util');
//var rencoder = require('./readRotaryEncoder.js');

var xIndex = 3;
var yIndex = 3;
var arrSize = 8;
var array = new Array(arrSize);
for(var i = 0; i < arrSize; i++)
{
    array[i] = new Array(arrSize);
    for(var j = 0; j < arrSize; j++)
    {
        array[i][j] = ' ';
    }
}

var analogMax = 1300;
var mvPerSquare = analogMax/arrSize;

var pinDown     = 'P9_27',
    pinUp       = 'P9_24',
    pinRight    = 'P9_23',
    pinLeft     = 'P9_30';

//rencoder.readRotaryEncoder(pinDown, pinUp, up, down);
//rencoder.readRotaryEncoder(pinRight, pinLeft, right, left);

b.pinMode(pinDown, b.INPUT);
b.pinMode(pinUp, b.INPUT);
b.pinMode(pinRight, b.INPUT);
b.pinMode(pinLeft, b.INPUT);

b.attachInterrupt(pinDown, true, b.RISING, down);
b.attachInterrupt(pinUp, true, b.RISING, up);
b.attachInterrupt(pinRight, true, b.RISING, right);
b.attachInterrupt(pinLeft, true, b.RISING, left);

b.digitalWrite("USR0", b.LOW);
b.digitalWrite("USR1", b.LOW);
b.digitalWrite("USR2", b.LOW);
b.digitalWrite("USR3", b.LOW);

printToConsole();

function up()
{
    yIndex = Math.max(yIndex - 1, 0);
    flashLED("USR3");
    changeArray();
}

function down()
{
    yIndex = Math.min(yIndex + 1, arrSize - 1);
    flashLED("USR2");
    changeArray();
}

function right()
{
    xIndex = Math.min(xIndex + 1, arrSize - 1);
    flashLED("USR0");
    changeArray();
}

function left()
{
    xIndex = Math.max(xIndex - 1, 0);
    flashLED("USR1");
    changeArray();
}

function changeArray()
{
    array[yIndex][xIndex] = 'x';
    printToConsole();
}

function printToConsole()
{
    util.print("\n\n\n\n");
    util.print("   ");
    for(var i = 0; i < arrSize; i++)
    {
        util.print(i);
        util.print(' ');
    }
    util.print('\n');
    for(var i = 0; i < arrSize; i++)
    {
        util.print(util.format("%d: ", i));
        for(var j = 0; j < arrSize; j++)
        {
            util.print(util.format("%s ", array[i][j]));
        }
        util.print('\n');
    }
}

function flashLED(led)
{
    b.digitalWrite(led, b.HIGH);
    
}