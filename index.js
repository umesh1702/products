const fs = require("fs");
const readline = require("readline");
const {Table, printTable} = require("console-table-printer");



filepaths=["clothing.json","electronics.json","books.json"];
//to create interface for taking input
const rl= readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//function to read the data from json files
 function inputjsonfile(filepath){
    const data =fs.readFileSync(filepath);
    return JSON.parse(data);
   
 }
 
 const p =new Table({
    coloumns : [{Name : "ID"},{Name : "Name"},{Name : "Type"},{Name : "Price"},{Name : "Discount"},{Name : "Inventory"},{Name : "Currency"}],
  

});


 var completeData = [];
//to copy data from json files and copy it to complete data array
 filepaths.forEach(filepath => {
    const loopData= inputjsonfile(filepath);
    completeData.push(loopData);
 });
// to take input from the user
const showOptions=()=>{
    console.log("1. Books");
    console.log("2. clothings");
    console.log("3. Electronics");
    console.log("4. exit");
    rl.question("choose your option   ",userInput=>{
        UserChoice(userInput);
    });
}


//if condition to print the details of desired products
function UserChoice(choice){
    if (choice === "1"){

       
        const booksInfo = completeData.find(type => type.category === 'books');
        const productarray = booksInfo.products;
        booksInfo.products.forEach(product=>{
            p.addRow({
                Id : product.id, Name : product.Name, Type :product.Type, Price : product.Price, Discount : product.Discount,Inventory : product.Inventory,Currency :product.currency
            })
        });
       p.printTable();
       
        rl.close();
    }
    else if (choice === "2"){
        const clothingsInfo = completeData.find(type => type.category === 'clothing');
        const productarray = clothingsInfo.products;
        clothingsInfo.products.forEach(product=>{
            p.addRow({
                Id : product.id, Name : product.Name, Type :product.Type, Price : product.Price, Discount : product.Discount,Inventory : product.Inventory,Currency :product.currency
            })
        });
       p.printTable();
       
        rl.close()

        
    }
    else if (choice === "3") {
        const electronicsInfo = completeData.find(type => type.category === 'Electronics');
        const productarray = electronicsInfo.products;
        electronicsInfo.products.forEach(product=>{
            p.addRow({
                Id : product.id, Name : product.Name, Type :product.Type, Price : product.Price, Discount : product.Discount,Inventory : product.Inventory,Currency :product.currency
            })
        });
       p.printTable();
       
        rl.close()
    }
    else {
        console.log("thank you for shopping with us")
        rl.close()
    }
}

showOptions(); //to start with showOptions function

 

 

 