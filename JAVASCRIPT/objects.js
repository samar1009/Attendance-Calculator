user={
    name: "Samar",
    rollno: 21,
    age: 18,
amount:4000,
"Home Address":"VPO Teuri Una HP"
}
console.log(user["name"])
console.log(user.age)
console.log(user["Home Address"])
//update
user.amount=7000
console.log(user)
user.drug="Opium"
console.log(user)
//delete
delete user.drug
console.log(user)

user2=user
user2.name="SAMAR"//primitive same memory 
console.log(user)
console.log(Object.keys(user))
console.log(Object.values(user))
console.log(Object.entries(user))//print's key value pair in array


//loop for print
for(keys in user){
    console.log(keys)//print's only keys
}
for(keys in user){
    console.log(user[keys])//print's only values
}
for(keys in user){
    console.log(keys,user[keys])
}

//destructuring of object
const {name,rollno}=user
console.log(name,rollno)

//for of loop
const j=Object.keys(user)//it converts all keys into array
console.log(j)
for(keys of j){
    console.log(keys)
}
//this keyword : used in only in that object instead of writing objects name  
obj={name:"Brayn",
    age:21,
    get:function(){
        console.log(`this is ${this.name}`)
        return 20 
}}
const k=obj.get()
console.log(k)

//making of independent copy : Shallow copy
p={name:"Samar",
    rollno:21,
    address:{
        city:"Una",state:"HP"
    }
}
pp={...p}
pp.name="Sam"
console.log(p)//not any change in obj1  this is because we make pp a independent copy
console.log(pp)//it will change samar to sam
//catch 
pp.address.city="Amb"
console.log(p)//but change in obj1 coz this is nested and nest obj in objects share same memory so they change simultaneously


//another obj where we can make key string and symbol
let sym=Symbol("id")//give unique value
objk={name:"Kunal",
0:"Joy",
90:"Morr",
[sym]:"Hello Bro"
}
console.log(objk["0"]) 
console.log(objk[sym])








