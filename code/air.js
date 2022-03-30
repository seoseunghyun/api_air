document.addEventListener('deviceready', function(){
    // window.plugins.toast.showShortBottom('Beta v0.0.1');
}, false);


document.getElementById("desc_donate").innerHTML = 'Welcome to Air<br />광고 보고 개발자 응원하기 (클릭)';
// document.getElementById("btn_menu_today").innerHTML = '<i class="fa-solid fa-location-pin"></i>&nbsp;내 주변';

setTimeout(function(){
    document.getElementById("location_string").innerHTML = `서울특별시 서초구 우면동`;
    document.getElementById("location_center").innerHTML = `과천동 측정소`
    document.getElementById("location_center_time").innerHTML =  `(20시 00분 측정)`
    document.body.classList.remove("level2")
    document.body.classList.remove("level3")
    document.body.classList.remove("level4")

    document.body.classList.remove("level5")
    document.body.classList.remove("level6")
    document.body.classList.remove("level7")
    document.body.classList.remove("level8")
    document.body.classList.remove("loading")
    document.body.classList.add('level1');
    document.body.classList.remove("loading")
    document.body.classList.add("getted")
    document.querySelector(".details_forecast_item.day1 span").innerHTML = "보통"
    document.querySelector(".details_forecast_item.day2 span").innerHTML = "최고"
    document.querySelector(".details_forecast_item.day3 span").innerHTML = "좋음"
    document.querySelector(".data_value_str[attr='pm10Value']").innerText = ("최고");
    document.querySelector(".data_value_str[attr='pm25Value']").innerText = ("최고");
    document.querySelector(".data_value_str[attr='pm10Value']").innerText = ("최고");
    document.querySelector(".data_value_str[attr='pm25Value']").innerText = ("최고");
    document.querySelector(".data_value[attr='pm10Value']").innerText = ("7");
    document.querySelector(".data_value[attr='pm25Value']").innerText = ("1");

},5000)