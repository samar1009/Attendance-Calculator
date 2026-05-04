//function 

function add(a,b){
    sum=a+b
    console.log(sum)
}
add(3,4)
function hie(){
    console.log("Hie brotha wsaap")
    return 0
}
hie()

//rest operator
function addnum(...a)//this simply add the arguments or entered value into array 
{let summ=0
for(val of a){
    summ+=val
}
console.log(summ)
}
addnum(10,40,50,60,100)//here these arguments are stored in array and in function we used for of loop to add the arguments 
addnum(300,400,777)


//function stored in variable
let h=function ad(a,b){ return a+b}
console.log(h(10,10))// print varible and write arguments



//ARROW Function 
let addd= (num1,num2)=>{
return num1+num2
} 
console.log(addd(3,8))

let hi = (numq,numm)=> numq+numm //here if we have one line of code then we dont have need to use curly bracket
console.log(hi(7,4))//11

let g= num=>num*num //this function have 1 agrument an one operation so we dont have to use bracket
console.log(g(4))//16

//but if we do with object
let kk= ()=>({name:"Samar ",age:19}) // here if we dont use round bkt then it will take that as normal function where we have to use return but if we use round bracket then it will automatically understand that to return inside data
console.log(kk())


// //IMEDIATLY INVOKED FUNCTION  (fun name{opration};)();
// //in this function we call it imediatly
// function m(){
//     console.log("AyE YOO BoSSSS")
// }() 
// //this runs imediatly





////CALL BACK FUNCTION 
function con1(){
    console.log("Hi I am Samar")
}
function con(callback){
    console.log("What's your name ?")
callback()//con1 will execute first and then niche wali string
console.log("Where are you from ?")
}
con(con1)//here ye will run first and yo will after that 
