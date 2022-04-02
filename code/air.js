document.addEventListener('deviceready', function(){
    var _dom = document.querySelector(".details_forecast_card.second .details_forecast_item");
    _dom.addEventListener("touchstart",function(e){
        window.alertClose = true;
        document.getElementById("alert_close").style.display = 'block';
    
        clearTimeout(window.clickTimer)
        window.clickTimer = setTimeout(function(){
            clearTimeout(window.clickTimer);
            window.clickTimer = null;
        },150)
    });
    _dom.addEventListener("touchend",function(e){
        if(!!window.clickTimer) {
            clearTimeout(window.clickTimer);
            document.getElementById("alert_wrapper").classList.add("show");
            document.getElementById("alert_title").innerHTML = "- 예보 -";
            document.getElementById("alert_contents").innerHTML = _dom.innerHTML;
    
        }
    })
}, false);
