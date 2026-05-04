//forEach: iterates each element in array

arr=[1,2,3,4,5]
sum=0
arr.forEach((number)=>console.log(number))//print each value in number
arr.forEach((number)=>sum+=number)
console.log(sum)


//filter: by using condition the element which satisfy the condition this make array of those
const ar=[1,4,5,6,7]
const sr = ar.filter((numb)=>numb>1)
console.log(sr)


//map: this modifies the values of array and create array of those items 
ma=[1,2,3,4,5,6]

const g=ma.map((num)=>num*2)
console.log(g)