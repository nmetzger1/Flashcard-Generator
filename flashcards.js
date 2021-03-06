//Required Files / Packages
var fileManagement = require("./fileSystem");
var inquirer = require("inquirer");
var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");

//Global Variables
var cardArray = [];


function goToMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option.",
            choices: ["Add Card", "View All Cards", "Try Random Card", "Exit"],
            name: "menu"
        }
    ]).then(function (response) {

        switch (response.menu){
            case "Add Card":
                addCard();
                return;
            case "View All Cards":
                fileManagement.readCardLibrary(cardArray, outputLibrary);
                return;
            case "Try Random Card":
                fileManagement.readCardLibrary(cardArray, playGame);
        }
    })
}

function outputLibrary(cardArray) {

    for(var i = 0; i < cardArray.length - 1; i++){
        console.log(JSON.parse(cardArray[i]));
        console.log("------------------------");
    }

    //Return to menu
    goToMenu();
}

function addCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select the card type you wish to make.",
            choices: ["Basic", "Cloze"],
            name: "cardType"
        }
    ]).then(function (response) {

        if(response.cardType === "Basic"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter a question for the FRONT of the card.",
                    name: "front"
                },
                {
                    type: "input",
                    message: "Enter an answer for the BACK of the card.",
                    name: "back"
                }
            ]).then(function (response) {

                //create card object
                var newCard = new BasicCard(response.front, response.back);
                console.log("Your card was successfully added to the library.");

                //return to Menu
                goToMenu();
            })
        } //end of "Basic" if
        else {  //If "Cloze" was chosen
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the full text of a fact.",
                    name: "full"
                },
                {
                    type: "input",
                    message: "Enter the text from the fact you'd like hidden.",
                    name: "cloze"
                }

            ]).then(function (response) {

                //create card object
                var newCard = new ClozeCard(response.full, response.cloze);
                console.log("Your card was successfully added to the library.");

                //return to Menu
                goToMenu();
            })
        }
    })
}

function playGame(cardArray) {

    //Gets a random number between 0 and current number of cards
    var randomNumber = Math.floor(Math.random() * (cardArray.length - 1));  //-1 is for the empty line at the end of the page

    //Grabs a card object based on random number
    var flashCard = JSON.parse(cardArray[randomNumber]);

    if(flashCard.front === undefined){

        var demoCard = new ClozeCard(flashCard.fullText, flashCard.cloze);

        inquirer.prompt([
            {
                type: "input",
                message: demoCard.partialText(),
                name: "question"
            }
        ]).then(function (answer) {
            if(answer.question === demoCard.cloze){
                console.log("That is correct!");
            }
            else {
                console.log("I'm sorry.  The correct answer was: " + demoCard.cloze);
            }

            goToMenu();
        })
    }
    else {
        inquirer.prompt([
            {
                type: "input",
                message: flashCard.front,
                name: "question"
            }
        ]).then(function (answer) {
            if(answer.question === flashCard.back){
                console.log("That is correct!");
            }
            else {
                console.log("I'm sorry.  The correct answer was: " + flashCard.back);
            }

            goToMenu();
        })
    }
}

goToMenu();