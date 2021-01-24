const fs = require('fs');
const mysql = require('mysql');

class QuickFunctions {
    constructor() {
        throw new Error("QuickFunctions is not a constructor");
    }

    /** ----------------------------- Basic Functions ----------------------------- **/

    /**
     * Quick Command Intervals
     * @param {int} time 
     * @param {string} timer
     */
    static async setCommandInterval(timer, time) {
        if (!time) throw new Error("No time has been specified");
        if (!timer) throw new Error("No Timer specified");
        if (isNaN(time)) throw new Error("Time must be a number");
        if (!time && !timer) throw new Error("A time and timer must be specified");

        if (timer && time) return setInterval(timer, time);
    }

    /**
     * 
     * @param {string} interval 
     */
    static async clearCommandInterval(interval) {
        if (!interval) throw new Error("No Interval specified");

        if (interval) return clearInterval(interval);
    }

    /**
     * Set Command Timeout
     * @param {string} command 
     * @param {int} time 
     */
    static async setCommandTimeout(command, time) {
        if (!command) throw new Error("No Command specified");
        if (!time) throw new Error("No time specified");
        if (isNaN(time)) throw new Error("Time has to be a number");
        if (!command && !time) throw new Error("A command and time is needed");

        if (command && time) return setTimeout(command, time);
    }

    /**
     * Clear Command Timeout
     * @param {string} command 
     */
    static async clearCommandTimeout(command) {
        if(!command) throw new Error("No command specified");

        if (command) return clearTimeout(command);
    }

    /**
     * obtain current time
     */
    static async currentTime() {
        var currentdate = new Date(); 
        var datetime = "Current Time: " + currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        
        return datetime;
    }

    /**
     * convert an image to an Array Buffer
     * @param {string} image 
     */
    static async imgToArrayBuffer(image) {
        if (!image) throw new Error("An Image needs to be specified ")

        try {
                fs.readFile(image, (err, data) => {
                    if (err) return console.error(err);
                    const buffer = Buffer.from(data);
                    const arr = [...buffer];

                    console.log(arr);
                });
            } catch (error) {
                throw new Error("Unexpected error occurred: \n" + error);
            }
    }

    /**
     * convert an Array Buffer to an Image
     * @param {string} arrayBuffer 
     */
    static async arrayBufferToImg(arrayBuffer) {
        if (!arrayBuffer) throw new Error("A buffer array is needed to convert to an image");

        let xhr = new XMLHttpRequest();

        xhr.open("GET", arrayBuffer, true);

        xhr.responseType = "arrayBuffer";

        xhr.onload = function(e) {
            try {
                // obtain the data blob: URL for img
                var arrBuffView = new Uint8Array( this.respose );
                var blob = new Blob([ arrBuffView ], { type: "image/jpeg"});
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                var img = document.querySelector("#photo");
                img.src = imageUrl;
            } catch (error) {
                throw new Error("Unexpected error occurred: \n" + error);
            }
        }

        xhr.send();
    }

    /** ----------------------------- MySQL DataBase Basics ----------------------------- **/
    /**
     * MySQL Connection and Test
     * @param {string} host 
     * @param {string} uName 
     * @param {string} pass 
     */
    static async dbConnect(host, uName, pass) {
        if (!host) throw new Error("A host name is needed to connect to the MySQL DataBase");
        if (!uName) throw new Error("A user name is needed to connect to the MySQL DataBase");
        if (!pass) throw new Error("A password is needed to connect to the MySQL DataBase");

        var con = mysql.createConnection({
            host: host,
            user: uName,
            password: pass
        });

        con.connect(function(err) {
            if (err) throw new Error("An error occured: \n"+err);

            console.log("DataBase Connected");
            con.query("CREATE DATABASE test", function (err, result) {
                if (err) throw new Error("Error making test DataBase");
                console.log("Test DataBase created! \n" + `Result: ${result}`);
            });

            con.query("DELETE DATABASE test", function(err, result) {
                if (err) throw new Error("Error when deleting test DataBase \n" + err);

                console.log("Test DataBase Deleted" + `Result: ${result}`);
            });
        });
    }

    /**
     * Creating a MySQL DataBase
     * @param {string} dbName 
     */
    static async CreateDB(dbName) {
        if (!dbName) throw new Error("A DataBase name is needed to create a DataBase");
        if (isNaN(dbName)) throw new Error("DataBase name can't be a number!");

        var con = this.CreateDB();

        con.query(`CREATE DATABASE ${dbName}`, function(err, result) {
            if (err) throw new Error(`An Error occurred when making the DataBase: ${err}`);

            console.log(`DataBase Created Successfully \nResult: ${result}`);
        })
    }

    /**
     * Creating MySQL DataBase Table
     * @param {string} tblName 
     * @param {string} extras 
     */
    static async TableCreate(tblName, extras) {
        if (!tblName) throw new Error("A table name is needed to create a DataBase Table");
        if (isNaN(extras)) throw new Error("DataBase Content can't be a number!");

        var con = this.DbConnect();

        // if the user supplied Extra data content
        if (extras) {
                con.query(`CREATE TABLE ${tblName} ${extras}`, function(err, result) {
                if (err) {
                    throw new Error(
                        "An Error occured when creating the table, trying to alter table if it exists..."
                    ).then(con.query(`ALTER TABLE ${tblName} ${extras}`, function(err, result) { if (err) throw new Error("No Table to Alter"); console.log("Table altered" + `\nResult: ${result}`) }));

                }
                console.log("Table created Successfully \n" + `Result: ${result}`);
            });
        }

        // if the user hasn't supplied extra content
        if (extras === null) {
            con.query(`CREATE TABLE ${tblName}`, function(err, result) {
                if (err) throw new Error("An Error occured when creating an empty table \n" + err)
                .then(con.query(`ALTER TABLE ${tblName}`, function(err, result) { if (err) throw new Error("No Table to Alter"); console.log("Table altered" + `\nResult: ${result}`) }));

                console.log(`Empty Table successfully created \nResult: ${result}`);
            });
        }
       
    }

    /**
     * Alters a table in an MySQL DataBase
     * @param {string} tblName 
     * @param {string} data 
     */
    static async alterTable(tblName, data) {
        let con = this.DbConnect()
        if (!tblName) throw new Error("A Table Name is needed to alter the table");

        con.query(`ALTER TABLE ${tblName} ${data}`, function (err, result) {
            if (err) throw new Error("An error occurred when altering DataBase Table" + err);

            console.log("Table Altered Successfully \n" + `Result: ${result}`);
        });

    }

    /** ----------------------------- REGEX CHECKING ----------------------------- **/

    /**
     * Gather Input to check against alphabetical regex (Regular Expression)
     * @param {string} input 
     */
    static async RegLettersAll(input) {
        if (!input) throw new Error("Input Data is needed to check against regex");
        //if (input === int) throw new Error("Input can't be a number");
        
        var letters = /^[A-Za-z]+$/;
        if (input.value.match(letters))
        {
            return true;
        } else {
            alert("Input does not contain an English Letter");
            return false;
        }
    }

    /**
     * Gather Input to check against numeric regex (Regular Expression)
     * @param {string} input 
     */
    static async RegNumbersAll(input) {
        if (!input) throw new Error("An input in needed to check against regex");
        //if (isNaN(input)) throw new Error("The input needs to be a number!");

        var numbers = /^[0-9]+$/;

        if (input.value.match(numbers)) {
            return true;
        } else {
            alert("Input must be a number, only!");
            return false;
        }
    }
    
    /**
     *  Quick Mention Reading
     * @param {string} mention 
     */
    static async getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/); // reads as: <@!someID>
    
        if (!matches) return console.log("No mention matches found...");
    
        const id = matches[1];
    
        return `${id}`;
    }

}


module.exports = QuickFunctions;
