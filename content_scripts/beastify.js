(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  function insertBeast(beastURL) {
    //removeExistingBeasts();
    runvar = true;
    //let beastImage = document.createElement("div");
    //beastImage.innerHTML = "HELLO";
    //document.body.appendChild(beastImage);
  }


  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }


  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast("as");
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });

})();
