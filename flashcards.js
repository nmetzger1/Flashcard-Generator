function BasicCard(front, back) {
    //Check if "new" was used when invoked
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;
    }
    else {
        //create a new card and return it.
        return new BasicCard(front, back)
    }
}

function ClozeCard(text, cloze) {
    //Check if "new" was used when invoked
    if(this instanceof ClozeCard) {
        //Determine if cloze text in found inside of full text
        if (text.search(cloze) != -1) {

            this.cloze = cloze;
            this.fullText = text;
            this.partialText = function () {
                //remove cloze text from full string
                var splitText = text.split(cloze);
                //return part of the array with partial text
                return "..." + splitText[1];
            };
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

var math = new BasicCard("What is 2 + 2?", "4");
var math2 = BasicCard("What is 2 + 2?", "4");

var prez = ClozeCard("George Washington was the first president of the United States.", "George ssakjdf");

console.log("partial", prez.partialText());
console.log("full", prez.fullText);
console.log("cloze", prez.cloze);