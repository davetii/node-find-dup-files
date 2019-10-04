const path = require('path');
const klaw = require('klaw');

const items = [];
const rootFolder = 'E:\\archive\\projects\\s';
const dups = arr => arr.filter((item, i) => arr.indexOf(item) != i);

const findDups = () => {
    const duplicateItems = dups(items);
    duplicateItems.forEach(function(s) { console.log(s) });
    console.log("Duplicate Items: " + duplicateItems.length);
};

klaw(rootFolder)
    .on('data', function (item) {
        if(!item.stats.isDirectory()) {
            items.push(path.parse(item.path).base)
        }
    })
    .on('end', () => {
        findDups();
    });




