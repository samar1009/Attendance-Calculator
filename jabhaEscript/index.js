let h=document.getElementById("para")
console.log(h)
let i=document.getElementsByClassName("kk")
console.log(i) 
let j=document.getElementsByTagName("span")
console.log(j)
let k=document.querySelector("span")//it will give first element of that id/class/tag
console.dir(k)
let l=document.querySelectorAll(".kk")
console.log(l)
console.log(h.innerText)//this prints text in para id by using innerText with variable
h.innerText="Here the text changes by innertext"//here we changed text with innerText
console.log(k.innerHTML)//prints text with tag
let m=document.querySelectorAll("span")
console.log(m.innerHTML)
let n=document.querySelector("#bl")
n.innerHTML="<div>This is new div in older div after using innerHTML</div>"
let o=document.querySelector("#on1")
o.innerText = o.innerText + " and adding 2" ;
let p=document.querySelectorAll(".box")
p[0].innerText="Changed to New with querySelector and innertext manipulator"
p[1].innerText="Changed again"
p[2].innerText="Changed Again!!!!!!"

