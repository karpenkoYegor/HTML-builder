const fs = require("fs");

const stream = new fs.ReadStream("./01-read-file/text.txt", { encoding: "utf-8" });

stream.on("readable", function(){
    let data = stream.read();
    console.log(data);
    stream.destroy();
});

// fs.readFile("./01-read-file/text.txt", "utf-8", function(error, data){
//     if(error)
//         throw error;
//     console.log(data);
// })