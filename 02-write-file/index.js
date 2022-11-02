const fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.writeFile("./02-write-file/file.txt", "", (err) =>{
        if(err){
            throw err;
        }
        writeFile();
    }
);

let writeFile = () => {
    rl.question('Введите текст ', function (data) {
        if(data !== "exit"){
            fs.appendFile("./02-write-file/file.txt", `${data}\n`, (err) =>{
                if(err){
                    throw err;
                }
                writeFile();
            });
        }
        else{
            rl.close();
        }
    }); 
}

rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});