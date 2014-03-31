var fs = require('fs');
var regData = [];
var files = ['reginfo.html', 'reginfo_async.html'];

function extractData(info, data, files, i){
    var r = /username\s*:\s*\w+,\s*password\s*:\s*\w+,\s*email\s*:\s*\w+@\w+.com/g;
    var a;
    while (1){
        a = r.exec(data);
        if(a !== null){
            info.push(a[0]);
        }else{
            break;
        }
    }
    if(i < files.length) readFile(info, files, i);
    else{
        writeFile('reg_result.html', info);
    }
}

function readFile(info, files, i){
    console.log('read file %s\n', files[i]);
    fs.readFile(files[i], function(err, data){
        if(err) throw err;
        extractData(info, data, files, ++i);
    });
}

function writeFile(filename, info){
    fs.writeFile(
        filename, 
        info.reduce(function(memo, elem, i){
            memo.push('[' + i + '] ' + elem);
            return memo;
        }, []).join('<br>'), 
        function(err){
            if(err) throw err;    
        }
    );
}

readFile(regData, files, 0);
