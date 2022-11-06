const fs = require("fs");
const path = require('path');

let html = {};
template = ""

fs.writeFile(path.join(__dirname, "style.css"), "", (err) =>{
    if(err){
        throw err;
    }
});

fs.writeFile(path.join(__dirname, "index.html"), "", (err) =>{
    if(err){
        throw err;
    }
});

fs.readdir(path.join(__dirname), { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else
    {
        files.forEach(file => {
            if(file.isFile()){
                let name;
                let extension;
                let filePath = path.join(__dirname, file.name);
                let dataFile = path.parse(filePath);
                name = dataFile.name;
                extension = dataFile.ext;
                if(name === "template" && extension === ".html"){
                    console.log(filePath);
                    const stream = new fs.ReadStream(filePath, { encoding: "utf-8" });
                
                    stream.on("readable", function(){
                        let data = stream.read();
                        template = data;
                        stream.destroy();
                        template=template.replace("{{header}}", html["header"]);
                        template=template.replace("{{articles}}", html["articles"]);
                        template=template.replace("{{footer}}", html["footer"]);
                        console.log(template);
                        fs.appendFile(path.join(__dirname, "index.html"), `${template}\n`, (err) =>{
                            if(err){
                                throw err;
                            }
                        });
                    });
                }
            }
        });
    }
});

fs.readdir(path.join(__dirname, "components"), { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else
    {
        files.forEach(file => {
            if(file.isFile()){
                let name;
                let extension;
                let filePath = path.join(__dirname, "components", file.name);
                let dataFile = path.parse(filePath);
                name = dataFile.name;
                extension = dataFile.ext;
                if(extension === ".html"){
                    const stream = new fs.ReadStream(filePath, { encoding: "utf-8" });
                    stream.on("readable", function(){
                        let data = stream.read();
                        html[name] = data;
                        stream.destroy();
                    });
                }
            }
        });
    }
});
fs.readdir(path.join(__dirname, "styles"), { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else
    {
        files.forEach(file => {
            if(file.isFile()){
                let name;
                let extension;
                let filePath = path.join(__dirname, "styles", file.name);
                let dataFile = path.parse(filePath);
                name = dataFile.name;
                extension = dataFile.ext;
                if(extension === ".css"){
                    const stream = new fs.ReadStream(filePath, { encoding: "utf-8" });
                
                    stream.on("readable", function(){
                        let data = stream.read();
                        fs.appendFile(path.join(__dirname, "style.css"), `${data}\n`, (err) =>{
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
