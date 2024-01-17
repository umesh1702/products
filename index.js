const fs = require("fs");
const {table, log} = require("console");
const readline = require("readline");

const rl= readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


 function inputjsonfile(filepath){
    const data =fs.readFileSync(filepath);
    return JSON.parse(data);

 }

 filepaths=["clothing.json","electronics.json","books.json"];

 var completeData = [];

 filepaths.forEach(filepath => {
    const loopData= inputjsonfile(filepath);
    completeData.push(loopData);
 });
 const completeDataString = JSON.stringify(completeData);
const showOptions=()=>{
    console.log("1. Books");
    console.log("2. clothings");
    console.log("3. Electronics");
    console.log("4. exit");
    rl.question("choose your option   ",userInput=>{
        UserChoice(userInput);
    });

    
}


function UserChoice(choice){
    if (choice === "1"){

       
        const booksInfo = completeData.find(type => type.category === 'books');
        const booksInfoString = JSON.stringify(booksInfo);
        console.table(booksInfo);
        rl.close();
    }
    else if (choice === "2"){
        const clothingsInfo = completeData.find(type => type.category === 'clothing');
        const clothingsInfoString = JSON.stringify(clothingsInfo);
        console.table(clothingsInfo);
        rl.close()

        
    }
    else if (choice === "3") {
        const electronicsInfo = completeData.find(type => type.category === 'Electronics');
        const electronicsInfoString = JSON.stringify(electronicsInfo);
        console.table(electronicsInfo);
        rl.close()
    }
    else {
        console.log("thank you for shopping with us")
        rl.close()
    }
}

showOptions();

 

 

 