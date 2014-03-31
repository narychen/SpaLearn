//auto register an website

var request = require('request');
var fs = require('fs');
var flib = require('./functional_lib');
var _ = require('underscore');
var cnt = 0;

function autoReg(){
    var fake = {
        username : flib.randString(8),
        first : flib.randString(8),
        last : flib.randString(8),
        com : flib.randString(6),
        email : function(){
            return this.username + '@' + this.com + '.com';
        },
        password: flib.randString(8)
    };
    
    
    var form = {
        form: {
            username: fake.username,
            firstname: fake.first,
            lastname: fake.last,
            email: fake.email(),
            password: fake.password,
            pwdconfirm: fake.password,
            protocol: '1',
            siteid: '1',
            forward: '',
            nickname: '',
            promotion: '',
            dosubmit: '1'
            
        }
    };
    
    
    request.post(
        'http://www.anxin-ex.com/index.php?m=member&c=index&a=register&siteid=1', form,
        function(error,response,body){
    //        console.log(form);
            cnt += 1;
            if(error) console.log(error);
            if(/操作成功/.test(body)){
                console.log('%s. [username:%s, email:%s, password:%s] Register successfully!',
                    cnt, fake.username, fake.email(), fake.password);
                var regInfo = '[' + cnt + '] ' + 
                    'username: ' + fake.username + ', ' + 
                    'password: ' + fake.password + ', ' + 
                    'email: ' + fake.email() + '<br>\n';  
                fs.appendFile('../../../phpdir/reginfo.html', regInfo, function (err) {
                    if (err) throw err;
                    console.log('write reginfo!');
                });
            }else{
                console.log('reg fail!');
                fs.writeFile('../../../phpdir/regdebug.html', body, function (err) {
                    if (err) throw err;
                    console.log('write debug!');
                });
            }
            autoReg();
        }
    );
}

autoReg();
