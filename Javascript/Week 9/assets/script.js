$(document).ready(main);
let i = 0;
let p;
function main(){
    document.getElementById("button_1").onclick = buttonClick;
    p = document.getElementById("button_count");
    window.localStorage.setItem("count", `${i}`)
    p.textContent = window.localStorage.getItem("count");
    setCookie("test", "tval", 1);
    console.log(getCookie("test"));
}
function buttonClick(){
    console.log("click");
    i++;
    window.localStorage.setItem("count", `${i}`)
    p.textContent = window.localStorage.getItem("count");
}
function setCookie(key, value, time){
    const cookieDate = new Date();
    const expDate = time * 24 * 60 * 60 * 1000;
    cookieDate.setTime(cookieDate.getTime() + expDate);
    let expires = cookieDate.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}
function getCookie(cookieKey) {
    let name = cookieKey + "=";
    let myCookie = document.cookie.split(';');
    for(let i = 0; i < myCookie.length; i++) {
    let theCookie = myCookie[i];
    while (theCookie.charAt(0) == ' ') {
     theCookie = theCookie.substring(1);
    }
    if (theCookie.indexOf(name) == 0) {
    return theCookie.substring(name.length, theCookie.length);
    }
    }
    return "";
    }