window.onresize = closeNav;
export function openNav() {
    document.getElementById("navigation_menu").style.width = "100%";
}
export function closeNav() {
    if (document.documentElement.clientWidth > 800){
        document.getElementById("overlay-content").style.width = "50%";
    } else{
        document.getElementById("navigation_menu").style.width = "0%";
    }
}