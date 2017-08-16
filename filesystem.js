var fs = require('fs');
var path = require('path');

// 가장 최신 파일 뽑아내기
var cola = '/Users/minjae/git/Dorcus_Server/image/cola.jpg'
var sprite = '/Users/minjae/git/Dorcus_Server/image/sprite.png'
var image = '/Users/minjae/git/Dorcus_Server/image'
function compare(cola, sprite, err) {

}

fs.readdir(image, (err, files) => {
    files.forEach(file => {
    //console.log(file);
    console.log(fs.stat(path.join(image,file), function (err, stats) {
        if(err) { throw err;}
        console.log(stats)
    }))
});
})
// fs.stat(cola, function(err, stats){
//         if(err){ throw err;}
//     console.log(stats);
//
//      });
// fs.stat(sprite, function(err, stats){
//     if(err){ throw err;}
//     console.log(stats);
//
//     console.log(stats.birthtime);
//
//      });

