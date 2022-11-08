const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"), "", (err) =>{
    if(err){
        throw err;
    }
});

fs.readdir(path.join(__dirname,"styles"), { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else{
        files.forEach(file => {
            if(file.isFile())
            {
                let filePath = path.join(__dirname, "styles", file.name);
                let dataFile = path.parse(filePath);
                
                extension = dataFile.ext;
                if(extension === ".css"){
                    const stream = new fs.ReadStream(filePath, { encoding: "utf-8" });

                    stream.on("readable", function(){
                        let data = stream.read();
                        fs.appendFile(path.join(__dirname, "project-dist", "bundle.css"), `${data}\n`, (err) =>{
                            if(err){
                                throw err;
                            }
                        });
                        stream.destroy();
                    });
                    
                }
            }
        });
    }
});