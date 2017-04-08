var fileManagement = require("./fileSystem.js");

function BasicCard(front, back) {
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