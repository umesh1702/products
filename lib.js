const fs = require("fs");
const readline = require("readline");
const {Table, printTable} = require("console-table-printer");
const { resolve } = require("path");
const uid = require("uniqid");
const prompt = require ("prompt");


prompt.start();
//to create interface for taking input
const rl= readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
var completeData = [];
var filepaths=["./assests/clothing.json","./assests/electronics.json","./assests/books.json"];
//function to read the data from json files
function inputjsonfile(filepath){
    const data =fs.readFileSync(filepath);
    return JSON.parse(data);  
 };
filepaths.forEach(filepath => {
    const loopData=inputjsonfile(filepath);
    completeData.push(loopData);
});
 // to create a table 
const table =new Table({
    coloumns : [{Name : "ID"},{Name : "Name"},{Name : "Type"},{Name : "Price"},{Name : "Discount"},{Name : "Inventory"},{Name : "Currency"}]
});

//to copy data from json files and copy it to complete data array


productInfo= ["","books","clothing","Electronics"];

// To take input from the user
const showOptions=()=>{
    productInfo.forEach((items,index) => { 
        if (index >= 1 && index <=3){
            console.log((index),(items));
        }});
        console.log("4. exit");
        rl.question("choose your option: ",selectedOption=>{
        const choice = parseInt(selectedOption);
        if(choice == 4){
            console.log("Thank you!!!!!");
            rl.close();
            return;
        } 
        if (choice > 4 || choice < 1){
            console.log("wrong option, Try again!!");
            showOptions();
        }else if (choice>=1 || choice<=3) {
            UserChoice(productInfo[choice]);
        }
        else {
            console.log("enter correct option");
            showOptions();
       }
    });
};


//printing the table
function UserChoice(product){ 
    const selectedProduct = completeData.find(type => type.category === product);
    selectedProduct.products.forEach(productItem=>{
        table.addRow({
            Id : productItem.id, Name : productItem.Name, Type :productItem.Type, Price : productItem.Price, Discount : productItem.Discount,Inventory : productItem.Inventory,Currency :productItem.currency
        })
    });
    table.printTable();
    rl.close();
};
var dataPath=["","books.json","clothing.json","electronics.json"]
const col=["Name","Type","Price","Discount","Inventory","currency"];
const options = ["","Add","Del","Modify"]
const id =["id"]

//function to add the data
async function DataAdd(){
    const response = await askQuestion("To Which file do you want to Add? ");
    if(response >=1 && response <=3){
        const selectedProduct = completeData.find(type => type.category === productInfo[response]);
        console.log("Fill the following");
        const infObject = {};
        for (const items of id){
            infObject[items]=uid();  
        }; 
        for (const items of col){
            const answer = await askQuestion(`Enter the value for ${items} `);
            infObject[items]=answer  
        };  
        selectedProduct.products.push(infObject)            
        var selectedProducts = JSON.stringify(selectedProduct,null,2);
        fs.writeFileSync(`./assests/${dataPath[response]}`,selectedProducts); 
        console.log("your changes have been updated ");
        rl.close();
            
    }  
    else{
        console.log("enter a valid option")
        DataAdd();
        }      
}
//Function to modify the data
async function DataModify(){
    const response = await askQuestion("Which file do you want to modify? ");
    const selectedProduct = completeData.find(type => type.category === productInfo[response]);
    for (let i in selectedProduct.products){
        console.log(i,selectedProduct.products[i].id,selectedProduct.products[i].Name)
    }   
    const selection = await askQuestion("write the index 0f the object to be modified ");
    const selected = parseInt(selection)
   col.forEach((item,index)=>{
    console.log(index,item);
   })
    const choice = await askQuestion("Which property do you need to modify (NOTE: you cannot change id) ")
    const choiceInt = parseInt(choice);
    console.log(col[choiceInt])

    const changedProperty = await askQuestion(`Type the change `);
    selectedProduct.products[selected][col[choice]]= changedProperty;          
    var selectedProducts = JSON.stringify(selectedProduct,null,2);
    fs.writeFileSync(`./assests/${dataPath[response]}`,selectedProducts); 
    console.log("your changes have been updated ");
    rl.close();
        }
    

//function to delete the data 
async function DataDelete(){
    const response = await askQuestion("Which file do you want to Delete? ");
    const selectedProduct = completeData.find(type => type.category === productInfo[response]);
    var selectedProducts = JSON.stringify(selectedProduct,null,2);
    for (let i in selectedProduct.products){
        console.log(i,selectedProduct.products[i].id,selectedProduct.products[i].Name)
    }   
    const selection = await askQuestion("write the index 0f the object to be deleted ");
    const selected = parseInt(selection)
    if(response >=1 && response <=3){
        for (let i in selectedProduct.products) {
            if(selectedProduct.products[i].id === selectedProduct.products[selected].id){
                selectedProduct.products.splice(i,1);
                var selectedProducts = JSON.stringify(selectedProduct,null,2);
                fs.writeFileSync(`./assests/${dataPath[response]}`,selectedProducts);
                rl.close();
            }
        }
    }
    else{
        console.log("enter the right index");
        DataDelete();
    }
}


function askQuestion(question){
    return new Promise((resolve)=>{
        rl.question(question,answer=>{
            resolve(answer)
        })
    })
}


//function to check whether user need to modify or not
async function userActions(){
    const response = await askQuestion("Do you want to modify the data (FOR yes '1' and for No '2')  ")
        if(response === "1"){
    options.forEach((items,index) => { 
        if (index >= 1 && index <=3){
            console.log((index),(items));
        }
    });
    console.log("4. exit");
    const selectedOption= await askQuestion("choose your option: ")
    const choice = parseInt(selectedOption);
    if(choice == 4){
        console.log("Thank you!!! ");
        rl.close();
        return;
    } 
    else if (choice > 4 || choice < 1){
        console.log("wrong option, Try again!!");
        userActions();
    }
    
    else if (choice>=1 || choice<=3) {
        console.log(choice)
        userIntrest(options[choice]);
    }
    else {
        console.log("enter correct option");
        userActions();
   }

}
    else if (response === "2"){
        console.log("You have not done any modifications ")
        rl.close();
    }
    else {
        console.log("enter correct option !!!!!");
        userActions();
    }

}





//function to check what user needs
function userIntrest (opinion){
    console.log("existing files")
    dataPath.forEach((items,index) => { 
        if (index >= 1 && index <=3){
            console.log((index),(items));
        }});
    if (opinion === "Add"){
        DataAdd();
    }
    else if(opinion === "Modify"){
        DataModify();
    }
    else if(opinion === "Del"){
        DataDelete();
    }
}
module.exports={rl,productInfo,completeData,table,showOptions,DataAdd,DataDelete,DataModify,userActions}