const fs = require("fs");
const readline = require("readline");
const {Table, printTable} = require("console-table-printer");
const { resolve } = require("path");
const uid = require("uniqid");
const inquirer = require("inquirer");

var filepaths=["clothing.json","electronics.json","books.json"];
var completeData = [];

//to create interface for taking input
const rl= readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

//function to read the data from json files
 function inputjsonfile(filepath){
    const data =fs.readFileSync(filepath);
    return JSON.parse(data);  
 };

 // to create a table 
const p =new Table({
    coloumns : [{Name : "ID"},{Name : "Name"},{Name : "Type"},{Name : "Price"},{Name : "Discount"},{Name : "Inventory"},{Name : "Currency"}]
});

//to copy data from json files and copy it to complete data array
filepaths.forEach(filepath => {
    const loopData=inputjsonfile(filepath);
    completeData.push(loopData);
});

productInfo= ["","books","clothing","Electronics"];
// to take input from the user
const showOptions=()=>{
    productInfo.forEach((items,index) => { 
        if (index >= 1 && index <=3){
            console.log((index),(items));
        }});
        console.log("4. exit");
        rl.question("choose your option: ",selectedOption=>{
        const choice = parseInt(selectedOption);
        if(choice == 4){
            console.log("Thank you for shopping");
            rl.close();
            return;
        } 
        if (choice > 4 || choice < 1){
            console.log("wrong option, Try again!!");
            rl.close();
        }else{
        UserChoice(productInfo[choice]);
        };
    });
};

//if condition to print the details of desired products
function UserChoice(product){ 
    const selectedProduct = completeData.find(type => type.category === product);
    selectedProduct.products.forEach(productItem=>{
        p.addRow({
            Id : productItem.id, Name : productItem.Name, Type :productItem.Type, Price : productItem.Price, Discount : productItem.Discount,Inventory : productItem.Inventory,Currency :productItem.currency
        })
    });
    p.printTable();
        
    userActions();
};



showOptions(); //to start with showOptions function

var dataPath=["","books.json","clothing.json","electronics.json"]
const col=["name","Type","Price","Discount","Inventory","Currency"];
const options = ["","Add","Del","Modify"]
const id =["id"]

function userActions(){
    rl.question("Do you want to modify the data (FOR yes '1' and for No '2')  ",response=>{
        if(response === "1"){
    options.forEach((items,index) => { 
        if (index >= 1 && index <=3){
            console.log((index),(items));
        }
    });
    console.log("4. exit");
    rl.question("choose your option: ",selectedOption=>{
    const choice = parseInt(selectedOption);
    if(choice == 4){
        console.log("All modifications have been saved");
        rl.close();
        return;
    } 
    if (choice > 4 || choice < 1){
        console.log("wrong option, Try again!!");
        rl.close();
    }else{
        userIntrest(options[choice]);
    };
});
}
    else{
        console.log("You have not done any modifications ")
        rl.close();
    }
})
}

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
        fs.writeFileSync(dataPath[response],selectedProducts); 
        console.log("your changes have been updated ");
        rl.close();
            
    }  
    else{
        console.log("enter a valid option")
        DataAdd();
        }      
}

async function DataModify(){
    const response = await askQuestion("Which file do you want to modify? ");
    const selectedProduct = completeData.find(type => type.category === productInfo[response]);
    const selection = await askQuestion("Write the id of the item to modify ");
    for (let i in selectedProduct.products){
        console.log(selectedProduct.products[i].id,selectedProduct.products[i].Name)
        const choice = await askQuestion("Which property do you need to modify ")
    }
    for (let i in selectedProduct.products) {
        if(selectedProduct.products[i].id === selection){
                
            }
        }
    }

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
                fs.writeFileSync(dataPath[response],selectedProducts);
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

