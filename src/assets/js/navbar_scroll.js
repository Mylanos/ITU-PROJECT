function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    document.getElementById("header").style.height = "90px";
    document.getElementById("mainLogo").style.maxHeight = "2cm";
    document.getElementById("horizontalLine").style.marginTop = "0.9cm";
    document.getElementById("horizontalLine").style.height = "40px";
    document.getElementById("mainMenu").style.paddingTop = "0.6cm";
    document.getElementById("reservationButton").style.marginTop = "0.4cm";
  } else {
    document.getElementById("reservationButton").style.marginTop = "0.3cm";
    document.getElementById("mainMenu").style.paddingTop = "1.7cm";
    document.getElementById("horizontalLine").style.height = "60px";
    document.getElementById("horizontalLine").style.marginTop = "1.7cm";
    document.getElementById("mainLogo").style.maxHeight = "3.8cm";  
    document.getElementById("header").style.height = "165px";
  }
}