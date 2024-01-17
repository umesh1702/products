const fs = require("fs");
const {table, log} = require("console");
const readline = require("readline");

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

 filepaths=["clothing.json","electronics.json","books.json"];

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
        productarray.forEach(product=>
            {
             console.log("ID :", product.id, "\tName :", product.Name, "\tType :",product.Type,"\tAuthor",product.Author,"\tPrice",product.Price, "\tDiscount",product.Discount,"\tInventory",product.Inventory,"\tCurrency",product.currency);
            });
       
        rl.close();
    }
    else if (choice === "2"){
        const clothingsInfo = completeData.find(type => type.category === 'clothing');
        const productarray = clothingsInfo.products;
        productarray.forEach(product=>
            {
             console.log("ID :", product.id, "\tName :", product.Name, "\tType :",product.Type,"\tPrice",product.Price, "\tDiscount",product.Discount,"\tInventory",product.Inventory,"\tCurrency",product.currency);
            });
       
        rl.close()

        
    }
    else if (choice === "3") {
        const electronicsInfo = completeData.find(type => type.category === 'Electronics');
        productarray.forEach(product=>
            {
             console.log("ID :", product.id, "\tName :", product.Name, "\tType :",product.Type,"\tPrice",product.Price, "\tDiscount",product.Discount,"\tBrand :",product.Brand,"\tInventory",product.Inventory,"\tCurrency",product.currency);
            });
       
        rl.close()
    }
    else {
        console.log("thank you for shopping with us")
        rl.close()
    }
}

showOptions(); //to start with showOptions function

 

 

 