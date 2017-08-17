var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var vision = require('@google-cloud/vision')({
    projectId: 'Creative Engineering',
    keyFilename: '/Users/minjae/Downloads/Creative Engineering-ae2856be4ceb.json'
    // "@google-cloud/vision": "^0.11.5"
});
const imagePath = '/Users/minjae/git/Dorcus_Server/image';

function getMostRecentFileName(dir) {
    // read directory file
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);
        // birthtime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).birthtime;
    });
}

//이미지 랜딩
function callVision() {
    var image = path.join(imagePath, getMostRecentFileName(imagePath))
    // render label value
    vision.detectLabels(image)
        .then((results) => {
    //     const labels = results[0];
    //
    // console.log('Labels:',imageName);
    // labels.forEach((label) => console.log(label));
    console.log(results)

    }).catch(err => {
            console.error(err);
    });
}

console.log(path.join(imagePath, getMostRecentFileName(imagePath)))
callVision()


