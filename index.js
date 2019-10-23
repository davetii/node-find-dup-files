const path = require('path');
const klaw = require('klaw');

const items = [];
const rootFolder = 'S:\\backup\\archive\\s';
const dups = arr => arr.filter((item, i) => arr.indexOf(item) != i);

const findDups = () => {
    const duplicateItems = dups(items);
    duplicateItems.forEach(function(s) { console.log(s) });
    console.log("Duplicate Items: " + duplicateItems.length);
};

klaw(rootFolder)
    .on('data', function (item) {
        if(!item.stats.isDirectory() &&
            path.parse(item.path).ext != '.jpg' &&
            path.parse(item.path).ext != '.bif') {
            items.push(path.parse(item.path).base)
        }
    })
    .on('end', () => {
        findDups();
    });




