var fileManagement = require("./fileSystem.js");

function BasicCard(front, back) {

    //error case
    if(typeof front != "string" || typeof back != "string"){
        throw new Error("Please use strings when declaring 'front' and 'back' properties");
    }

    //Check if "new" was used when invoked
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;

        fileManagement.addtoFile(this);
    }
    else {
        //create a new card and return it.
        return new BasicCard(front, back)
    }
}

module.exports = BasicCard;