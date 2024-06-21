const fs = require('fs');
const path = require('path');

function displayHelp(){
    if (DEBUG) console.log('displayHelp()');

    fs.readFile(__dirname + "/help/usage.txt", (error, data) => {
        if(error) throw error;              
        console.log(data.toString());
    });
}

module.exports = {
    displayHelp,
};

