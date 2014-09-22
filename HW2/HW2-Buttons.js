var b = require('bonescript');
var pinDown     = 'P9_27',
    pinUp       = 'P9_24',
    pinRight    = 'P9_23',
    pinLeft     = 'P9_30',
    LED0        = 'USR0',
    LED1        = 'USR1',
    LED2        = 'USR2',
    LED3        = 'USR3';
    
var LED0State = 0,
    LED1State = 0,
    LED2State = 0,
    LED3State = 0;

b.pinMode(pinDown, b.INPUT);
b.pinMode(pinUp, b.INPUT);
b.pinMode(pinRight, b.INPUT);
b.pinMode(pinLeft, b.INPUT);

b.pinMode(LED0, b.OUTPUT);
b.pinMode(LED1, b.OUTPUT);
b.pinMode(LED2, b.OUTPUT);
b.pinMode(LED3, b.OUTPUT);

b.attachInterrupt(pinDown, true, b.RISING, down);
b.attachInterrupt(pinUp, true, b.RISING, up);
b.attachInterrupt(pinRight, true, b.RISING, right);
b.attachInterrupt(pinLeft, true, b.RISING, left);

b.digitalWrite(LED0, b.LOW);
b.digitalWrite(LED1, b.LOW);
b.digitalWrite(LED2, b.LOW);
b.digitalWrite(LED3, b.LOW);


function up()
{
    if(LED0State === 0) 
    {
        b.digitalWrite(LED0, b.HIGH);
        LED0State = 1;
    }
    else 
    {
        b.digitalWrite(LED0, b.LOW);
        LED0State = 0;
    }
}

function down()
{
    if(LED1State === 0) 
    {
        b.digitalWrite(LED1, b.HIGH);
        LED1State = 1;
    }
    else 
    {
        b.digitalWrite(LED1, b.LOW);
        LED1State = 0;
    }
}

function right()
{
    if(LED3State === 0) 
    {
        b.digitalWrite(LED3, b.HIGH);
        LED3State = 1;
    }
    else 
    {
        b.digitalWrite(LED3, b.LOW);
        LED3State = 0;
    }
}

function left()
{
    if(LED2State === 0) 
    {
        b.digitalWrite(LED2, b.HIGH);
        LED2State = 1;
    }
    else 
    {
        b.digitalWrite(LED2, b.LOW);
        LED2State = 0;
    }
}