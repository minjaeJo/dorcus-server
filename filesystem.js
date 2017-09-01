var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var chokidar = require('chokidar');
var vision = require('@google-cloud/vision')({
    projectId: 'Creative Engineering',
    keyFilename: '/Users/minjae/Downloads/Creative Engineering-ae2856be4ceb.json'
    // "@google-cloud/vision": "^0.11.5"
});
const imagePath = '/Users/minjae/git/Dorcus_Server/image'; // 이미지 디렉토리 경로 

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
function callVision(path) {
    //var image = path.join(imagePath, getMostRecentFileName(imagePath))
    // render label value
    vision.detectLabels(path)
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

//console.log(path.join(imagePath, getMostRecentFileName(imagePath)))
//callVision()

var watcher = chokidar.watch('/Users/minjae/git/Dorcus_Server/image', {ignored: /[\/\\]\./, persistent: true})
    watcher.on('all', function(event, path) {
    console.log(event, path);
    callVision(path)
});

// var watcher = chokidar.watch('/Users/minjae/git/Dorcus_Server/image', {
//     ignored: /[\/\\]\./, persistent: true
// });
//
// var log = console.log.bind(console);
//
// watcher
//     .on('add', function(path) { log('File', path, 'has been added'); })
//     .on('addDir', function(path) { log('Directory', path, 'has been added'); })
//     .on('change', function(path) { log('File', path, 'has been changed'); })
//     .on('unlink', function(path) { log('File', path, 'has been removed'); })
//     .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
//     .on('error', function(error) { log('Error happened', error); })
//     .on('ready', function() { log('Initial scan complete. Ready for changes.'); })
//     .on('raw', function(event, path, details) { log('Raw event info:', event, path, details); })
//
// // 'add', 'addDir' and 'change' events also receive stat() results as second
// // argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
// watcher.on('change', function(path, stats) {
//     if (stats) console.log('File', path, 'changed size to', stats.size);
// });
//
// // Watch new files.
// watcher.add('new-file');
// watcher.add(['new-file-2', 'new-file-3', '**/other-file*']);
//
// // Un-watch some files.
// watcher.unwatch('new-file*');
//
// // Only needed if watching is `persistent: true`.
// watcher.close();