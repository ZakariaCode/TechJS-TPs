console.log("program started");
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("rejected");
  }, 2000);
  setTimeout(() => {
    resolve("executed with succeess");
  }, 3000);
});

console.log(p);

console.log("program in progress...");

p.then(() => {
  console.log(p);
});
