#!/usr/bin/env node

const args = process.argv.slice(2) // Get CLI arguments

if (args[0] === "hello") {
  console.log("Hello, world!");
} else if (args[0] === "add") {
  const a = Number(args[1]);
  const b = Number(args[2]);
  console.log(`Result: ${a + b}`);
} else {
  console.log("Usage:");
  console.log("  mycli hello");
  console.log("  mycli add 2 3");
}
