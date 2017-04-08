var fs = require("fs");

var fileManagement = module.exports = {
    //Adds card to library
    addtoFile: function (card) {
        fs.appendFile("card-library.txt", JSON.stringify(card) + "\r\n", function (error) {
            if(error){
                throw error
            }
        });
    },
    //Reads cards from library
    consoleLogCardLibrary: function (func) {
        fs.readFile("card-library.txt", "utf8", function (err, data) {
            if (err) {
                throw new Error(err);
            }

            dataArray = data.split("\r\n");

            for(var i = 0; i < dataArray.length - 1; i++){
                console.log(JSON.parse(dataArray[i]));
                console.log("------------------------");
            }

            //Run function after displaying info
            func();
        });
    }

};