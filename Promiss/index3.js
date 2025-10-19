console.log("program started");
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("executed with succeess");
  }, 3000);
});
console.log(p);
console.log("program in progress...");
p.then((val) => {
  console.log(val)
  const p2= new Promise((resolve , reject) => {
    setTimeout(() => {
        console.log("step 2 completed")
    })
  },3000)
})
