function PrintCharXTimes(char, noOfTimes){
    let charString = "";
    for(let i = 0; i < noOfTimes; i++){
        charString = charString + char;
    }
    return charString
}
console.log(PrintCharXTimes("a",5));

function NumberOfCharInString(str, char){
    let amount = 0;
    let i;
    for(i in str){
        if(str[i] == char) amount +=1;
    }
    return amount;
}
console.log(NumberOfCharInString("Hellooooooo","o"));

function GetRandomInt(max){
    return Math.floor(Math.random() * max); 
}
function GetRandomSum(){
    let sum = 0;
    let r = GetRandomInt(10);
    while(r != 0){
        sum += r;
        r = GetRandomInt(10);
    }
    return sum;
}
console.log(GetRandomSum());

function GetBigRandomSum(){
    let sum = 0;
    let r;
    do{
        sum += GetRandomSum();
        r = GetRandomInt(10);
    }
    while(r != 0);
    return sum;
}
console.log(GetBigRandomSum());
