var request = require('request');
const shell = require('shelljs');
const schedule = require('node-schedule');
shell.cd(__dirname);
var fs = require('fs');
const { setTimeout } = require('long-timeout');
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
    
        // request({
        //     url: url3 + queryParams3,
        //     method: 'GET'
        // }, function (error, response, body3) {
        //     var _body = JSON.parse(body3);
        //     _body.response.body.sidoList = {
        //         '경기남부' : ['경기남부', '과천시', '광명시', '광주시', '군포시', '김포시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시','안양시', '여주시', '오산시', '용인시', '의왕시', '이천시', '평택시' ,'하남시', '화성시', '양평군'],
        //         '경기북부' : ['경기북부' ,'고양시', '구리시', '남양주' ,'동두천', '양주시', '가평', '연천'],
        //         '전남' : ['전남', '목포시', '무안군', '신안군', '영암군', '해남군', '진도군', '강진군', '장흥군', '완도군', '순천시', '여수시', '광양시', '구례군', '곡성군', '고흥군', '보성군', '나주시', '화순군', '담양군', '장성군', '함평군', '영광군'],
        //         '전북' : ['전북', '전주', '완산구', '덕진구', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
        //         '경남' : ['경남', '부산', '마산', '울산', '동래', '창녕', '사천', '하동', '거창', '고성', '통영', '함양', '합천', '의령', '함안', '산청', '진주', '김해', '밀양', '양산', '남해'],
        //         '경북' : ['경북', '대구', '달성','경산', '영천', '경주', '영일', '포항','영덕', '영양','청송', '안동', '의성', '군위', '왜관', '김천', '상주', '예천', '내성', '문경', '성주', '고령', '청도', '선상', '울도'],
        //         '충남' : ['충남', '천안', '공주', '보령', '아산', '서산', '논산', '계룡', '당진', '금산', '부야군', '서천', '청양', '홍성', '예산군', '태안'],
        //         '충북' : ['충북', '청주', '충주', '제천', '전망', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
        //         '영동' : ['영동', '강릉', '삼청', '동해', '태백', '속초', '양양','고성군', '통천군'],
        //         '영서' : ['영서', '철원', '화천군', '양구군', '인제군', '춘천', '홍천군', '횡성군', '원주시' ,'평창', '영월', '정선', '이천군', '평강군', '김화군', '회양군'],
        //         '서울' : ['서울'],
        //         '제주' : ['제주'],
        //         '광주' : ['광주'],
        //         '울산' : ['울산'],
        //         '대구' : ['대구'],
        //         '부산' : ['부산'],
        //         '세종' : ['세종'],
        //         '대전' : ['대전'],
        //         '인천' : ['인천']
        //     }
        //     fs.writeFileSync('info_center.json', JSON.stringify(_body), 'utf8');
        //     console.log('공기질 센터 정보 성공');
        // });
        setTimeout(function(){

            request({
                url: url + queryParams,
                method: 'GET'
            }, function (error, response, body) {
                var _body = JSON.parse(body);
                for(var i in _body.response.body.items) {
                    for(var j in _body.response.body.items[i]) {
                        var chkList = ['so2Grade', 'coFlag' ,'pm25Flag','pm10Flag', 'o3Grade', 'no2Flag', 'no2Grade', 'o3Grade', 'o3Flag', 'pm25Grade' ,'so2Flag', 'coGrade', 'pm10Grade'];
                        if(chkList.indexOf(j) !== -1) {
                            // console.log("***")
                            delete _body.response.body.items[i][j];
                        }
                        if(j == 'dataTime') {
                            console.log("-----")
                            console.log(_body.response.body.items[i][j])
                            // _body.response.body.items[i][j] = " " + _body.response.body.items[i][j].split(" ")[1];
                        }
                    }

                }
                fs.writeFileSync('info_air.json', JSON.stringify(_body), 'utf8');
                console.log('공기질 정보 성공');
            });
        },10)
        // setTimeout(function(){

        //     request({
        //         url: url2 + queryParams2,
        //         method: 'GET'
        //     }, function (error, response, body2) {
        //         fs.writeFileSync('info_air_forecast.json', body2, 'utf8');
        //         fs.writeFileSync('update.txt', uuidv4(), 'utf8');
        //         console.log('공기질 예측 정보 성공');
        //         // console.log(__dirname);
        //     });
        // },4000);
        setTimeout(function(){

            if(shell.exec('./gitpush.sh').code !== 0)  {
                shell.echo('error');
                shell.exit(1);
            } else {
                console.log('done');
            }
        },5000)
// });