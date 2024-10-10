
class contact {
    constructor(firstName, address, phoneNumber){
        this.firstName = firstName
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    GetInfo(){
        return "Name: " + this.firstName + ", Address: " + this.address + ", Phone Number: " + this.phoneNumber;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function changeAddress(p1, newAddress){
    p1.address = newAddress;
}
function incrementScore(){
    score += 1;
}
function printScore(){
    console.log("Score:", score.toString());
}
function checkScoreEven(){
    if(score % 2 == 0){
        console.log("Score is Even!");
    }
    else{
        console.log("Score is Odd!")
    }
}

let person = new contact("mary","5 Nassau Street", "081234125");

console.log(person.GetInfo());

changeAddress(person, "homeless");

console.log(person.GetInfo(0));

let personArray = [new contact("Jacob", "13 Grand Canal Street", "083457543"), 
    new contact("Mark", "14 Grand Canal Street", "087354632"), 
    new contact("Samantha", "15 Grand Canal Street", "085223456"), 
    new contact("George", "16 Grand Canal Street", "083436212"), 
    new contact("Oscar", "17 Grand Canal Street", "084674677"), 
]
console.log(personArray[1].GetInfo(), personArray[2].GetInfo())

let score = 0
for(let i = 0; i < getRandomInt(50); i++){
    incrementScore();
}


printScore();
checkScoreEven();