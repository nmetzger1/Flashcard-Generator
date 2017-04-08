var fileManagement = require("./fileSystem.js");

function ClozeCard(text, cloze) {

    //error case
    if(typeof text != "string" || typeof cloze != "string"){
        throw new Error("Please use strings when declaring 'front' and 'back' properties");
    }

    //Check if "new" was used when invoked
    if(this instanceof ClozeCard) {
        //Determine if cloze text in found inside of full text
        if (text.search(cloze) != -1) {

            this.cloze = cloze;
            this.fullText = text;
            this.partialText = function () {
                //Replace 'cloze' text and return new string
                return this.fullText.replace(cloze, "...");
            };

            //Adds new card to library
            fileManagement.addtoFile(this);
        }
        else {
            throw new Error("Cloze text must appear in full text.")
        }
    }
    else {
        //create a new card and return it.
        return new ClozeCard(text, cloze);
    }
}

module.exports = ClozeCard;