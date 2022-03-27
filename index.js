var request = require('request');
const shell = require('shelljs');
const schedule = require('node-schedule');
shell.cd(__dirname);
var fs = require('fs');
var MyDate = new Date();
var MyDateString;

MyDate.setDate(MyDate.getDate());
MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);

var url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=6IG5R%2BT%2B0rr88bxlfAD9RMYHGV7RxrGRm1JdGXe8Bb%2BlncG%2Bz8B2hPiLerN3Kwx%2B5Y5tm2j5tfa3ZzWCfHEdLA%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('전국'); /* */
queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0'); /* */


var url2 = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth';
var queryParams2 = '?' + encodeURIComponent('serviceKey') + '=6IG5R%2BT%2B0rr88bxlfAD9RMYHGV7RxrGRm1JdGXe8Bb%2BlncG%2Bz8B2hPiLerN3Kwx%2B5Y5tm2j5tfa3ZzWCfHEdLA%3D%3D'; /* Service Key*/
queryParams2 += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
queryParams2 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams2 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams2 += '&' + encodeURIComponent('searchDate') + '=' + encodeURIComponent(MyDateString); /* */
queryParams2 += '&' + encodeURIComponent('InformCode') + '=' + encodeURIComponent('PM10'); /* */


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// schedule.scheduleJob("20 * * * *", function () {
    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);
        // textwrite1.txt 파일에 동기적으로 쓰기
        fs.writeFileSync('info_air.json', body, 'utf8');
        fs.writeFileSync('update.txt', uuidv4(), 'utf8');
        console.log('공기질 정보 성공');
        console.log(__dirname);
        request({
            url: url2 + queryParams2,
            method: 'GET'
        }, function (error, response, body) {
            console.log(url2 + queryParams2);
            //console.log('Status', response.statusCode);
            //console.log('Headers', JSON.stringify(response.headers));
            console.log('Reponse received', body);
            // textwrite1.txt 파일에 동기적으로 쓰기
            fs.writeFileSync('info_air_forecast.json', body, 'utf8');
            fs.writeFileSync('update.txt', uuidv4(), 'utf8');
            console.log('공기질 예측 정보 성공');
            console.log(__dirname);
            if(shell.exec('./gitpush.sh').code !== 0)  {
                shell.echo('error');
                shell.exit(1);
            } else {
                console.log('done');
            }
        });
    });
// });