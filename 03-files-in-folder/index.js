const fs = require('fs');
const path = require('path');
  fs.readdir("./03-files-in-folder/secret-folder", { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else{
        files.forEach(file => {
            if(file.isFile()){
                let name;
                let extension;
                let size;
                let filePath = path.join(__dirname, "secret-folder", file.name);
                let dataFile = path.parse(filePath);
                fs.stat(filePath, (error, stats) => {
                    if(error)
                        console.log(error);
                    else{
                        name = dataFile.name;
                        extension = dataFile.ext;
                        size = stats.size;
                        console.log(`${name} - ${extension} - ${size}b`);
                    }
                });
            } 
        });
    }
  });