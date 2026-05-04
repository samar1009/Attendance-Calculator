let e= document.querySelector("div")
let f=e.getAttribute("id")
console.log(f)
//or can write like this dirctly
let g=document.querySelector("p")
console.log(g.getAttribute("name"))

//set attribute
let h=document.querySelector("div")
console.log(h.setAttribute("id","sprite"))

//style
let i=document.querySelector("#sq")
i.style.backgroundColor="red"
i.style.textAlign="center"
i.style.height="200px"

//create element 

let button=document.createElement("button")
button.innerText="Click Me"
// console.log(button)
let div=document.querySelector("#sq")
//inserting by diffrent methods

//append : adds at the end 
div.append(button)


let but=document.createElement("button")
but.innerText="Click me"
but.style.backgroundColor="red"
but.style.color="white"
let j=document.querySelector("#q")
j.prepend(but)
