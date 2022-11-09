const fs = require("fs");
const path = require('path');

let html = {};
template = ""
let about = false;
fs.mkdir(path.join(__dirname,"project-dist"), {recursive: true}, (err) => {
    if(err)
        console.log("Dist created");
    else
        fs.mkdir(path.join(__dirname,"project-dist", "assets"), {recursive: true}, (err) => {
            if(err)
                console.log("Dist created");
        });
    createHTMLFile();
    createCSSFile();
});

let createHTMLFile = () => fs.writeFile(path.join(__dirname,"project-dist", "style.css"), "", (err) =>{
    if(err){
        throw err;
    }
});

let createCSSFile = () => fs.writeFile(path.join(__dirname, "project-dist", "index.html"), "", (err) =>{
    if(err){
        throw err;
    }
});

const writeHTML = () => fs.readdir(path.join(__dirname), { withFileTypes: true }, (err, files) => {
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
                    const stream = new fs.ReadStream(filePath, { encoding: "utf-8" });
                    stream.on("readable", function(){
                        let data = stream.read();
                        template = data;
                        stream.destroy();
                        template=template.replace("{{header}}", html["header"]);
                        template=template.replace("{{articles}}", html["articles"]);
                        template=template.replace("{{footer}}", html["footer"]);
                        if(about){
                            template=template.replace("{{about}}", html["about"]);
                        }
                        fs.appendFile(path.join(__dirname, "project-dist", "index.html"), `${template}\n`, (err) =>{
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
                        if(name === "about")
                            about = true;
                        stream.destroy();
                    });
                }
            }
        });
        writeHTML();
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
                        fs.appendFile(path.join(__dirname, "project-dist", "style.css"), `${data}\n`, (err) =>{
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

const copyFiles = (pathDir = path.join(__dirname,"assets"), dirName) => fs.readdir(pathDir, { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else{
        files.forEach(file => {
            if(file.isFile()){
                let filePath = path.join(pathDir, file.name);
                let copyPath = path.join(__dirname, "project-dist", "assets", pathDir.slice(pathDir.lastIndexOf("\\")+1, pathDir.length), file.name);
                
                fs.copyFile(filePath, copyPath,(err) => {
                    if(err)
                        console.log(err);
                });
            }
            else{
                fs.mkdir(path.join(__dirname,"project-dist","assets",file.name), {recursive: true}, (err) => {
                    if(err)
                        console.log("Dist created");
                    copyFiles(path.join(__dirname, "assets", file.name), file.name);
                });
                console.log(file.name);
            }
              
        });
    }
});
copyFiles();
