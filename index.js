const TokenLoader = require( "./bin/TokenLoader" );
const BotResponse = require( "./bin/BotResponse" );
const InlineVars  = require( "./bin/InlineVaribles" );
const Framework   = require( "webex-node-bot-framework" );
const BotRes      = new BotResponse();

// framework options
var config = {
    token: TokenLoader.get(),
    port: 80
};

// init framework
var framework = new Framework(config);
framework.start();

// Framework Log
framework.on( "log", ( str ) => {
    console.log( ">> " + str );
});

// Spawn New Bot
framework.on( "spawn", ( bot, id, addedBy ) => {
    bot.say( "Bot Online" );
});

// Server Connected
framework.on( "initialized", () => {
    console.log( "Framework initialized successfully!" );
});


framework.hears( /^./, function( bot, trigger ) {
    let payload = {
        message: trigger.text,
        email: trigger.person.emails,
        name: trigger.person.displayName,
        nickname: trigger.person.nickName,
        created: trigger.message.created
    }
    let response = BotRes.Process( payload[ "message" ] );
        response = InlineVars.Process( response, payload );
    bot.say( response )
});