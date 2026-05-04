console.log("","sk","sk")
let l="string is easy"
console.log(l.length)
console.log(l[4])
l[4]="N" //not possible coz immutable
console.log(l)

console.log(l.toUpperCase())
 //if we have to use these methods we can direct use like this or taking it into variable
//  not in writing first and then printing
let c="Hi my name is Samar"
console.log(c.toLowerCase())

console.log(c.indexOf("name"))
console.log(c.includes("my")) //give true or false
console.log(c.slice(1,5))//starting and ending index but ending index is not included
console.log(c.slice(3))//including 3rd index whole string is printed
console.log(c.replace("name","NAME"))//jiske and jis se
let v="big pig dig"
console.log(v.replaceAll("ig","IG")) //this replace all 
let n="  Samar  "
let m="  Samar Choudhary"
console.log(n.trim()) //remove extra spaces from starting and ending
console.log(m.trim())
let r="Rohit,Mohit,Showhit,Prohit,Chohit"
console.log(r.split(",")) //split from there where we have written and convert whole into array
let R="Rohit Mohit Showhit Prohit Chohit"
console.log(R.split(" "))
console.log(R.split("t"))

