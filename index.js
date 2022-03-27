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



var url3 = 'http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList';
var queryParams3 = '?' + encodeURIComponent('serviceKey') + '=6IG5R%2BT%2B0rr88bxlfAD9RMYHGV7RxrGRm1JdGXe8Bb%2BlncG%2Bz8B2hPiLerN3Kwx%2B5Y5tm2j5tfa3ZzWCfHEdLA%3D%3D'; /* Service Key*/
queryParams3 += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
queryParams3 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams3 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams3 += '&' + encodeURIComponent('addr') + '=' + encodeURIComponent(''); /* */
queryParams3 += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(''); /* */

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// schedule.scheduleJob("20 * * * *", function () {
    
        request({
            url: url3 + queryParams3,
            method: 'GET'
        }, function (error, response, body3) {
            var _body = JSON.parse(body3);
            _body.response.body.sidoList = {
                '경기남부' : ['경기남부', '과천시', '광명시', '광주시', '군포시', '김포시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시','안양시', '여주시', '오산시', '용인시', '의왕시', '이천시', '평택시' ,'하남시', '화성시', '양평군'],
                '경기북부' : ['경기북부' ,'고양시', '구리시', '남양주' ,'동두천', '양주시', '가평', '연천'],
                '전남' : ['전남', '광주'],
                '전북' : ['전북', '전주'],
                '경남' : ['경남'],
                '경북' : ['경북'],
                '충남' : ['충남'],
                '충북' : ['충북'],
                '영동' : ['영동'],
                '영서' : ['영서'],
                '서울' : ['서울'],
                '제주' : ['제주'],
                '광주' : ['광주'],
                '울산' : ['울산'],
                '대구' : ['대구'],
                '부산' : ['부산'],
                '세종' : ['세종'],
                '대전' : ['대전'],
                '인천' : ['인천']
            }
            fs.writeFileSync('info_center.json', JSON.stringify(_body), 'utf8');
            console.log('공기질 센터 정보 성공');
        });
        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            fs.writeFileSync('info_air.json', body, 'utf8');
            console.log('공기질 정보 성공');
        });
        request({
            url: url2 + queryParams2,
            method: 'GET'
        }, function (error, response, body2) {
            fs.writeFileSync('info_air_forecast.json', body2, 'utf8');
            fs.writeFileSync('update.txt', uuidv4(), 'utf8');
            console.log('공기질 예측 정보 성공');
            // console.log(__dirname);
        });
        setTimeout(function(){

            if(shell.exec('./gitpush.sh').code !== 0)  {
                shell.echo('error');
                shell.exit(1);
            } else {
                console.log('done');
            }
        },5000)
// });