var request = require('request');
const shell = require('shelljs');
shell.cd(__dirname);
var fs = require('fs');

var url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=6IG5R%2BT%2B0rr88bxlfAD9RMYHGV7RxrGRm1JdGXe8Bb%2BlncG%2Bz8B2hPiLerN3Kwx%2B5Y5tm2j5tfa3ZzWCfHEdLA%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('전국'); /* */
queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
    // textwrite1.txt 파일에 동기적으로 쓰기
    fs.writeFileSync('info_air.json', body, 'utf8');
    console.log('공기질 정보 성공');
    console.log(__dirname);
    if(shell.exec('./gitpush.sh').code !== 0)  {
        shell.echo('error');
        shell.exit(1);
    } else {
        console.log('done');
    }
});
