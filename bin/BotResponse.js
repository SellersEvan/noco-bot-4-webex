/**
 * 
 *  Created by Evan Sellers <sellersew@gmail.com>
 *
 *  author: Evan Sellers <sellersew@gmail.com>
 *  date: Fri Jul 16 2021
 *  file: BotResponse.py
 *  project: Webex Node Code Bot Framework
 *  purpose: Loads the bot yaml file and process each message
 *  
 */

const yaml    = require( "js-yaml" );
const fs      = require( "fs" );
const VERSION = "v1.0.1"


/** Usage
 *  let bot = new BotResponse()
 *  console.log( bot.Process( "hello" ) ) // >> response with String
 */


class BotResponse {


    /** Constructor
     *  Load the yaml config file and generate the match array
     *  @param botFile { String } directory of the yaml bot config file
     */
    constructor( botFile ) {
        this.configFile = this.getConfigFile( botFile );
        this.responses  = this.loadResponses();
        this.matchRegex = this.generateMatchArrayRegrex();

        this.FALLBACK_MESSAGE  = this.loadFallbackMessage();
        this.STARTUP_MESSAGE   = this.loadStartupMessage();
    }


    /** Get Config File
     *  Will load the file from bot.yaml
     *  @param botFile { String } locate the yaml file for the bot
     *  @returns { obj } of config files or false if failed
     */
     getConfigFile( botFile ) {
        try {
            let file = fs.readFileSync( botFile, "utf8" );
            return yaml.load( file );
        } catch ( e ) {
            console.error( e );
            return false;
        }
    }


    /** Load Bot File
     *  Will load the file from bot.yaml
     *  @returns { obj } of all responses or false if failed
     */
    loadResponses() {
        return this.configFile[ "responses" ];
    }


    /** Fall back Message
     *  Will load the file from bot.yaml, the message that will be sent if
     *  there is an error processing.
     *  @returns { String } of all responses or false if failed
     */
    loadFallbackMessage() {
        return this.configFile[ "response-fallback" ];
    }


    /** Startup Message
     *  Will load the file from bot.yaml, the message when bot is connected
     *  @returns { String } of all responses or false if failed
     */
    loadStartupMessage() {
        return this.configFile[ "response-startup" ];
    }


    /** Generate Match Array Regrex
     *  Will get the responses and will find all the ones that deal with regrex
     *  and build the eqautions from the string. The integer is the location in
     *  the response array.
     *  @returns { Obj[] } [ { match: { Regrex }, index: { Int } } ]
     */
    generateMatchArrayRegrex() {
        let match = [];
        this.responses.forEach( ( obj, index ) => {
            if ( Object.keys( obj ).indexOf( "regrex" ) >= 0 ) {
                let regrexEq = obj[ "regrex" ].split( "\/" );
                match.push( {
                    match: new RegExp( regrexEq[ 1 ], regrexEq[ 2 ] ),
                    index: index } );
            }
        });
        return match;
    }

    
    /** Match
     * 
     *  @param str { String } the string to be process 
     *  @returns 
     */
    match( str ) {
        let index = -1;
        this.matchRegex.forEach( regrex => {
            if ( regrex[ "match" ].test( str ) ) {
                index = regrex.index;
                return;
            }
        });
        return index;
    }


    ProcessText( str ) {
        if ( str == "/bot" ) {
            return `NoCode Bot for Webex (noco-bot-4-webex) ${ VERSION } by Evan Sellers.`
        } else if ( str == "/dev" ) {
            return JSON.stringify( this.configFile, null, 4 );
        }

        let responseIndex = this.match( str );
        if ( responseIndex == -1 ) return this.FALLBACK_MESSAGE;
        return this.responses[ responseIndex ][ "message" ];
    }

}

module.exports = BotResponse;