const fs = require('fs');
const path = require('path');
const checkFolder = () => {
    fs.access(path.join(__dirname,"files-copy"), fs.constants.F_OK, (err) => {
        if(err){
            fs.mkdir(path.join(__dirname,"files-copy"), (err) => {
                copyFiles();
            });
        }
        else{
            fs.readdir(path.join(__dirname, "files-copy"), (err, files) => {
                if(err)
                    console.log(err);
                else{
                    while(files.length > 0){
                        let file = files.pop();
                        let filePath = path.join(__dirname, "files-copy", file);
                        console.log(__dirname, "files-copy", file);
                        fs.unlink(filePath, (err) => {
                            if(err)
                                console.log(err);
                        });
                    }
                    copyFiles();
                }
            });
        }
    })
}
const copyFiles = () => fs.readdir(path.join(__dirname,"files"), { withFileTypes: true }, (err, files) => {
    if(err)
        console.log(err);
    else{
        files.forEach(file => {
            if(file.isFile()){
                let filePath = path.join(__dirname, "files", file.name);
                let copyPath = path.join(__dirname, "files-copy", file.name);
                fs.copyFile(filePath, copyPath,(err) => {
                    if(err)
                        console.log(err);
                })
            }
        });
    }
});
checkFolder();