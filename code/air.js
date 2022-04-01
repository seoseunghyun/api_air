document.addEventListener('deviceready', function(){
    // window.plugins.toast.showShortBottom('Beta v0.0.1');
}, false);


document.getElementById("desc_donate").innerHTML = 'Welcome to Air<br />광고 보고 개발자 응원하기 (클릭)';
document.getElementById("btn_menu_today").innerHTML = '<i class="fa-solid fa-location-pin"></i>&nbsp;오늘';
document.getElementById("desc_donate").addEventListener("click",function(){
    document.getElementById("desc_donate").innerHTML = 'Welcome to Air<br />응원 감사합니다';
    setTimeout(function(){
        AdMob = false;
    },1000)
    
    removeAllListeners(document.getElementById("desc_donate"),"click")
})

const removeAllListeners = (targetNode, event) => {
    // remove listeners from the matching nodes
    _eventHandlers[event]
      .filter(({ node }) => node === targetNode)
      .forEach(({ node, handler, capture }) => node.removeEventListener(event, handler, capture))
  
    // update _eventHandlers global
    _eventHandlers[event] = _eventHandlers[event].filter(
      ({ node }) => node !== targetNode,
    )
  }