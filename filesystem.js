var fs = require('fs');
var path = require('path');

// 가장 최신 파일 뽑아내기
var cola = '/Users/minjae/git/Dorcus_Server/image/cola.jpg'
var sprite = '/Users/minjae/git/Dorcus_Server/image/sprite.png'
var image = '/Users/minjae/git/Dorcus_Server/image'

function searchForFile (recent) {
    fs.readdir(image, (err, files) => {
        var recent = ''
        files.forEach(file => {
        fs.stat(path.join(image, file), function (err, stats) {
        //console.log(stats)
        if(err) {
            throw err;
        }
        var time = '';

        if (time == '') {
            time = stats.birthtime;
            recent = file
        }
        else if (time < stats.birthtime){
            time = stats.birthtime;
            recent = file
        }

        //console.log(recent)
        console.log(time)

        })
    });
        console.log(recent)
    });
    console.log(recent)
}

searchForFile()

