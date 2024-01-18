const fs = require("fs");
const readline = require("readline");
const {Table, printTable} = require("console-table-printer");
filepaths=
["clothing.json","electronics.json","books.json"];
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
    const loopData= inputjsonfile(filepath);
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
    rl.close();    
};
showOptions(); //to start with showOptions function

 

 

 