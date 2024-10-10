document.addEventListener("DOMContentLoaded", main);
let body;
let color1 = Math.floor(Math.random()*16777215);
let color2 = Math.floor(Math.random()*16777215);
let button;
let image;
let quoteText;
function main(){
    body = document.body;
    button = document.getElementById("colors");
    button.addEventListener("click", onClickColor);
    image = document.createElement("img");
    quoteText = document.getElementById("kanye");
    document.body.append(image);

    updateElements();
    
    setInterval(tick, 100);
}

function tick(){
    let d = new Date();
    
    hue = Math.round(((d.getTime()/15)%360)).toString();
    body.style.backgroundColor = 'hsl(' + hue + ' 45% 60%)';
  
}
function onClickColor(){
    updateElements();
}
function updateElements(){
    let apiCall = "https://dog.ceo/api/breeds/image/random"
    fetch(apiCall)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            image.src = data.message;

        })
        let apiCall2 = "https://api.kanye.rest/";
        fetch(apiCall2)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                quoteText.textContent = data.quote;
    
            })
}
