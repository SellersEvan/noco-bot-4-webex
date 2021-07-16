/**
 * 
 *  Created by Evan Sellers <sellersew@gmail.com>
 *
 *  author: Evan Sellers <sellersew@gmail.com>
 *  date: Fri Jul 16 2021
 *  file: InlineVaribles.py
 *  project: Webex Node Code Bot Framework
 *  purpose: Replace Inline Varibles
 *  
 */

const PREFIX = "$"

exports.Process = ( string, varibles ) => {
    Object.keys( varibles ).forEach( key => {
        string = string.replace( PREFIX + key, varibles[ key ] )
    });
    return string;
}


