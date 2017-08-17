var fs = require('fs');
var path = require('path');
var vision = require('@google-cloud/vision')({
    projectId: 'Creative Engineering',
    keyFilename: '/Users/minjae/Downloads/Creative Engineering-ae2856be4ceb.json'
});
var _ = require('underscore');
const image = '/Users/minjae/git/Dorcus_Server/image';

function getMostRecentFileName(dir) {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);
        // birthtime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).birthtime;
    });
}

console.log(path.join(image, getMostRecentFileName(image)))


//이미지 랜딩
function callVision(imagePath, imageName) {

    vision.detectLabels(imagePath)
        .then((results) => {
        const labels = results[0];

    console.log('Labels:',imageName);
    labels.forEach((label) => console.log(label));
    console.log(results)

    }).catch(err => {
            console.error(err);
    });
}
// 가장 최신 파일 탐색



//path.join(dir,getMostRecentFileName(image))
//searchForRecentlyFile();


/*var searchForRecentlyFile = function () {

    fs.readdir(image, (err, files) => {
        files.forEach(file => {
            fs.stat(pathModule.join(image, file), function (err, stats) {
                if(err) {
                    throw err;
                }
                var time = '';
                var recentImage = '';

                if (time == '') {
                    time = stats.birthtime;
                    recentImage = file
                }
                else if (time < stats.birthtime){
                    time = stats.birthtime;
                    recentImage = file
                };
                //console.log(recent)
                console.log(time)
                renderImage(pathModule.join(image, file),recentImage)

            });
        })
    })
};*/
