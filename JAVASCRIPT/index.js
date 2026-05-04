

console.log(1==true)
console.log(undefined==null)
for(i=10;i>=0;i--){
    console.log(i)
}
let c=2.5948
console.log(c.toFixed(3))

console.log(c.toPrecision(3));
let a= new Number(20) 
let b= new Number(20)
console.log(a==b)
f=40
j=60
k="40"
console.log(f===k)
console.log(Math.abs(-3.9))
console.log(Math.sqrt(10))
console.log(Math.ceil(4.3))
console.log(Math.floor(4.9))
console.log(Math.max(f,j))
console.log(Math.min(f,j))
console.log(Math.min(10,20,5,6,7,30))


//important
console.log(Math.random()) //gives random values from 0-1 in decimals
console.log(Math.random()*10+1) // form this we can generate from 0-9 values
console.log(Math.floor(Math.random()*10+1)) //from this we can generate from 1-10 values randomly without decimals
console.log(Math.floor(Math.random()*11)+15) //this is range from 15-25 we can randomly print any no. 
//Math.floor(Math.random()*(max-min+1))+min for minimum range to maximum range

//4 digit otp generation 1000-9999
console.log(Math.floor(Math.random()*9999-1000+1)+1000)


