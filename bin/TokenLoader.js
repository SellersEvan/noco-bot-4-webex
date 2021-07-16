/**
 * 
 *  Created by Evan Sellers <sellersew@gmail.com>
 *
 *  author: Evan Sellers <sellersew@gmail.com>
 *  date: Fri Jul 16 2021
 *  file: TokenLoader.py
 *  project: Webex Node Code Bot Framework
 *  purpose: Load api token key from ./token.yaml
 *  
 */

const yaml = require( "js-yaml" );
const fs   = require( "fs" );
const FILE = "./token.yaml"

exports.get = () => {
    try {
        let file = fs.readFileSync( FILE, "utf8" );
        return yaml.load( file )[ "bot-token" ];
    } catch ( e ) {
        console.error( e );
        return false;
    }
}