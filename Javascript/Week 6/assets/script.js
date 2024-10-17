let dogs = [
{
    path:"dog1.jpg",
    width:"10%"
},
{
    path:"dog2.jpg",
    width:"25%"
},
{
    path:"dog3.jpg",
    width:"50%"
},
{
    path:"dog4.jpg",
    width:"75%"
}
]

let currentImage = 0;







function CreateStudent(name, studentNo, age){
    return {
        name:name,
        studentNo:studentNo,
        age:age
    }
}
function DisplayStudent(student){
    let studentInfo = document.createElement("div");
    let h2 = document.createElement("h2");
    studentInfo.append(h2)
    h2.textContent = student.name;

    let list = document.createElement("ul");
    let number = document.createElement("li");
    number.textContent = student.studentNo;
    list.append(number);
    let age = document.createElement("li");
    age.textContent = student.age;
    list.append(age);
    studentInfo.append(list);


    document.body.append(studentInfo);
}


document.addEventListener("DOMContentLoaded", main);
function main(){
    ChangeImage();
    
    setInterval(ChangeImage, 500);
}
function ChangeImage(){
    console.log(currentImage);
    document.body.style.backgroundImage = `url(assets/img/${dogs[currentImage].path})`;
    document.body.style.backgroundSize = dogs[currentImage].width;
    if(currentImage >= dogs.length-1) currentImage = 0;
    else currentImage++;
}