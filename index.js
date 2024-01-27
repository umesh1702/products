const { resolve } = require("path");
const lib = require("./lib.js");

var completeData = lib.completeData
const rl=lib.rl;
const option = ["View","Modify"];

//for promise
function askQuestion(question){
    return new Promise((resolve)=>{
        rl.question(question,answer=>{
            resolve(answer);
        });
    });
};


async function start(){
    option.forEach((items,index)=>{
        console.log((index),(items));
    });
    const choice= await askQuestion("Choose your option  ");
    const choiceInt = parseInt(choice);

    if (choiceInt === 0){
        lib.showOptions();
    }

    else if(choiceInt === 1){
        lib.userActions();
    }

    else {
        console.log("choose correct option!!!!!!!");
        start();
    };
};


start(); //to start with start function






