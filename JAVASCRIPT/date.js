//date

const now= new Date()
console.log(now)//give utc
console.log(now.toString())//give indian standard time
console.log(now.toLocaleString())//give local time and day,date
console.log(now.toDateString())//give local date and day only
console.log(now.toUTCString())//give world time

//get keyword Gives all in current situation
console.log(now.getDate())
console.log(now.getDay()) //1 Monday,7Sunday
console.log(now.getMonth())//month starts from 0th index
console.log(now.getFullYear())
console.log(now.getTime())
console.log(now.getSeconds())
console.log(now.getHours())
console.log(now.getMinutes())


//we can store our date
const k= new Date(2026,1,21,11,14,2,125)// year month date hour minutes second miliseconds
console.log(k)
console.log(k.toString())

const b=Date.now()//give date time in miliseconds
console.log(b) //prints time in miliseconds
const h=new Date(0)
console.log(h.toString())
console.log(h.toLocaleDateString())
console.log(typeof b)