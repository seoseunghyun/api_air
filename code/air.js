document.addEventListener('deviceready', function(){
    // window.plugins.toast.showShortBottom('Beta v0.0.1');
}, false);


document.getElementById("desc_donate").innerHTML = 'Welcome to Air<br />광고 보고 개발자 응원하기 (클릭)';
// document.getElementById("btn_menu_today").innerHTML = '<i class="fa-solid fa-location-pin"></i>&nbsp;내 주변';

setTimeout(function(){
    document.getElementById("location_string").innerHTML = `서울특별시 서초구 우면동`;
    document.getElementById("location_center").innerHTML = `과천동 측정소`
    document.getElementById("location_center_time").innerHTML =  `(10시 00분 측정)`
    document.body.classList.add('level1');
    document.body.classList.remove("loading")
    document.body.classList.add("getted")
    document.querySelector(".details_forecast_item.day1 span").innerHTML = "정보 없음"
    document.querySelector(".details_forecast_item.day2 span").innerHTML = "정보 없음"
    document.querySelector(".details_forecast_item.day3 span").innerHTML = "정보 없음"
    document.querySelector(".data_value_str[attr='pm10Value']").innerText = (8);
    document.querySelector(".data_value_str[attr='pm25Value']").innerText = (1);

},5000)