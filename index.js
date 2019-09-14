const path = require('path');
const fs = require('fs-extra')
const klaw = require('klaw')

const items = [];
const rootFolder = 'E:\\archive\\projects\\s';
const dups = arr => arr.filter((item, i) => arr.indexOf(item) != i);
const isDir = p => {
    const fd = fs.openSync(p, 'r');
    return fs.fstatSync(fd).isDirectory();
};
const findDups = () => {
    const duplicateItems = dups(items);
    duplicateItems.forEach(function(s) { console.log(s) });
    console.log("Duplicate Items: " + duplicateItems.length);
};

klaw(rootFolder)
    .on('readable', function () {
        let item
        while ((item = this.read())) {
            if(!isDir(item.path)) {
                items.push(path.parse(item.path).base)
            }
        }
    })
    .on('end', () => {
        findDups();
    });




