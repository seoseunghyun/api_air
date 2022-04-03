document.addEventListener('deviceready', function(){
    document.querySelector("i.fa-solid.fa-person-cane").parentElement.classList.add("alert")
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
            document.getElementById("alert_title").innerHTML = "오늘 예보";
            document.getElementById("alert_contents").innerHTML = _dom.innerHTML;
    
        }
    })
    window.go_donate_ad = function(){
        if(!initAdmobInterstitial) {
            if(AdMob) {
                AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );
                window.plugins.toast.showShortBottom('응원 감사합니다.');
                initAdmobInterstitial = true;
            }
        }
        if(initAdmobInterstitial) {
            if(AdMob) AdMob.showInterstitial();
         }
        
    }
}, false);
