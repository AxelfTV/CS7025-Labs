document.addEventListener("DOMContentLoaded", main);
let body;
let color1 = Math.floor(Math.random()*16777215);
let color2 = Math.floor(Math.random()*16777215);
let button;
let image;
function main(){
    body = document.body;
    button = document.getElementById("colors");
    button.addEventListener("click", OnClickColor);
    image = document.createElement("img");
    document.body.append(image);

    setInterval(tick, 100);
}
//isjfbgasfng
function tick(){
    let d = new Date();
    /*body.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    
    let colorInterp = (Math.sin(d.getTime()/500000)+1)/2;
    let finalColor = Math.round((colorInterp*color1 + (1 - colorInterp) * color2)).toString(16);
    console.log("#" + finalColor)
    //body.style.backgroundColor = "#" + finalColor;
    */
    hue = Math.round(((d.getTime()/15)%360)).toString();
    body.style.backgroundColor = 'hsl(' + hue + ' 45% 60%)';
}
function OnClickColor(){
    let apiCall = "https://dog.ceo/api/breeds/image/random"
    fetch(apiCall)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            image.src = data.message;
        })
}
