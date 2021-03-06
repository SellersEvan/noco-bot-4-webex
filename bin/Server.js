const TokenLoader = require( "./TokenLoader" );
const BotResponse = require( "./BotResponse" );
const InlineVars  = require( "./InlineVaribles" );
const Framework   = require( "webex-node-bot-framework" );

CONFIG_BOT   = "./bot.yaml";
CONFIG_TOKEN = "./token.yaml";

class Server {

    constructor() {
        this.ConfigBot  = CONFIG_BOT;
        this.WebexToken = TokenLoader.get( CONFIG_TOKEN )
        this.BotRes     = new BotResponse( this.ConfigBot );
        this.Framework  = new Framework( {
            token: this.WebexToken,
            removeDeviceRegistrationsOnStart: true
        } );
        this.framework.messageFormat = "markdown";
    }


    Init() {
        this.Framework.start();

        // Event Framework Logs Message
        this.Framework.on( "log", str => {
            console.log( ">> " + str );
        });

        // Event Framework Online
        this.Framework.on( "initialized", () => {
            console.log( "Framework initialized successfully!" );
        });

        // Event Framework Users Joins
        this.Framework.on( "spawn", ( bot, id, addedBy ) => {
            bot.say( this.BotRes.STARTUP_MESSAGE );
        });

        // Incoming Message
        this.Framework.hears( /^./, ( bot, trigger ) => { this.messageProcess( bot, trigger ); } );
    }


    messageProcess( bot, trigger ) {
        let payload = {
            message: trigger.text,
            email: trigger.person.emails,
            name: trigger.person.displayName,
            nickname: trigger.person.nickName,
            created: trigger.message.created
        }
        let response = this.BotRes.ProcessText( payload[ "message" ] );
            response = InlineVars.Process( response, payload );
        bot.say( response )
    }

}

module.exports = Server;