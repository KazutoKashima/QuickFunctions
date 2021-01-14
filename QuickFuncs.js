class QuickFunctions {
    constructor() {
        throw new Error("QuickFunctions is not a constructor");
    }

    /**
     *  Quick Mention Reading
     * @param {string} mention 
     */
    static async getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/); // reads as: <@!someID>
    
        if (!matches) return console.log("No mention matches found...");
    
        const id = matches[1];
    
        return id;
    }

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
}


module.exports = PersonalFunctions;
