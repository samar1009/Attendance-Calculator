let k=[10,20,30,40,20]
console.log(k)
k.push(90) //add what ever you want  at end
console.log(k)
k.push("Samar")
console.log(k)
console.log(k.length) //gives length
k.pop()//removes last element
console.log(k)
k.unshift("Samar")//add at the starting index
console.log(k)


//use
let b=[]
for(let i=1;i<=100;i++){
b.push(i)
}
console.log(b)
for(let i=0;i<k.length;i++){
    console.log(k[i])
}

//for of loop for array
for( val of k){
    console.log(val)
} //prints all value of array

arr=[10,20,30]
console.log(arr)
arr2=arr
arr2.push(50)
console.log(arr)//50 will be in first array to coz the share there memory and store data memory by refrence
arr.pop()
console.log(arr2) //it will remove the last element from both arrays coz shared memory

arr=[50,60,70]
console.log(arr)//value will be changed

//but if make array a constant then it will not do any change like
const pa=[90,60,30]
// pa=[70,40,10] this will not printed
console.log(pa)

//but we can change values of constant array
pa[1]=80
console.log(pa)
pa.push(50)
console.log(pa)



const n=[1,2,3,4,5,6]
console.log(n.slice(0,3))//prints starting and ending index but ending index will not be taken
//for removal
n.splice(3,2)
console.log(n)// remove element from 3rd index upto we have written number of element here 4 and 5 will removed and leftover array will be printed
a1=[1,2,3]
a2=[4,5,6]
// a1.push(a2) // but this make nested array 
// console.log(a1)
//to combine both array into one use concat but we have to store it in another array
a3=a1.concat(a2)
console.log(a3)
 
//another way to write elements of array indiviually
a4=[...a1,...a2]
console.log(a4)
console.log(a1.toString())//convert array into string
console.log(a1.join(" "))//convert array into string but you can use whatever you want to diffrentiate
vb=["Ram","Sham","Manaan","Ram"]
console.log(vb.indexOf("Ram"))//give index of entered item & if same multiple items are there then it will give of 1st
console.log(vb.lastIndexOf("Ram")) 
console.log(vb.includes("Manaan")) // give true or false
console.log(vb.sort()) //works on ascii table A will come first and a will after that
console.log(vb.reverse())
const ni=[101,30,40,90,80]
console.log(ni.sort())//this will check only charcterwise from ascii table to 1 from 101 and 3 from 30 like this



//multiple array
u=[1,2,3,[4,5,6],7,8]
console.log(u[3][2])//6
u=[1,2,3,[4,5,6,[8,10,12],9],7,8]
console.log(u[3][3][2])//12
//this seems to be complicated so make the whole array into 1 array by using flat
const i=u.flat()//opens 1 array
console.log(i)
const y=u.flat(2)//opens 2 array
console.log(y)


//Learnings
//why array in JS show it object : Coz array in js can store diffrent datatype which only object can
//array can store string and numbers which vary there memory size which is not an action of array
//So array in JS show object data type which store every value 
const g=[1,2,3,4,"SaMaR"]
console.log(g["4"]) //We use this method in object but This is also used here
g.name="RiShAbH" 
console.log(g)//key value pair also stored in array


//desturing array
const ji=[12,3,4,90,87]
const [first,second]=ji//here you can write what ever you have for eg instead of fst and scnd you can J K any thing
console.log(first,second)