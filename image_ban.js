var imageBan = function() {
  var targetArea = document.getElementsByClassName("client_main_container")[0];

  targetArea.addEventListener("DOMSubtreeModified", function(e) {
    var senderTitle = targetArea.querySelector("#im_title")
  
    if (senderTitle)
      console.warn("cout << got header: ", senderTitle.innerText);
  
    if (senderTitle && senderTitle.innerText === 'trung.do') {
      console.warn('cout << hit victim!');
      targetArea.querySelectorAll(".c-message__content").forEach( function(message) {
        message.querySelectorAll("img").forEach( function(image){
          image.style.opacity = "0";
          console.warn('cout << blocked: ', image.src);
        })
      })
    }
  }, false);
}

if (window.location.href.includes("aavn-fintech.slack.com")) {
  console.warn('cout << triggered!');
  imageBan();
} else {
  console.log('cout << out of black-list!');
}
