console.log("program started");
const p = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        resolve("executed with succeess");
    },3000);
});
p.then(()=>{console.log("Program complete")});
console.log(p);
console.log("program in progress...");
