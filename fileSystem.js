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
    readCardLibrary: function (array, func) {
        fs.readFile("card-library.txt", "utf8", function (err, data) {
            if (err) {
                throw new Error(err);
            }

            array = data.split("\r\n");

            func(array);
        });
    }

};