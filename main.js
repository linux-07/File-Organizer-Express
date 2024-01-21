const fs = require('fs');
const path = require('path');

let dirpath = path.join(__dirname, "folder")

let a = fs.readdirSync(dirpath)

let folders = [];
let ext;
let newdirpath;

for (let i = 0; i < a.length; i++) {
    const element = a[i];
    ext = path.extname(element);
    newdirpath = path.join(dirpath, ext.slice(1));
    if (!folders.includes(newdirpath)) {
        folders.push(newdirpath)
    }
}

for (let i = 0; i < folders.length; i++) {
    const element = folders[i];
    fs.mkdirSync(element, { recursive: true });
}

let fileNames = fs.readdirSync(dirpath);
let files = [];

for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const filePath = path.join(dirpath, fileName);

    if (fs.statSync(filePath).isFile()) {
        files.push(fileName);
    }
}

// Moving the files to appropriate folders
for (let i = 0; i < files.length; i++) {
    const element = files[i];
    const filePath = path.join(dirpath, element)
    const fileExt = path.extname(filePath).slice(1)
    fs.renameSync(filePath, `${dirpath}/${fileExt}/${element}`)
}