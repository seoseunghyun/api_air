document.addEventListener('deviceready', function(){
    // window.plugins.toast.showShortBottom('Beta v0.0.1');
    $(".details_forecast_item").on('touchstart',function(){
        window.alertMsg("예보",$(this).html())
    })
}, false);