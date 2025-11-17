#!/usr/bin/env node
import inquirer from "inquirer";


const respons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
const data = await respons.json();
const pokemons = data.results.map((pokem) => pokem.name);
console.log("CHOISIR VOTRE POKEMONE");
const userChoice = await inquirer.prompt({
  type: "list",
  name: "pokemon",
  choices: pokemons,
});
console.log("this user choice pokemon : ", userChoice["pokemon"]);



const computerChoice = pokemons[Math.floor(Math.random() * pokemons.length)];
console.log("this is computer choice pokemon : ", computerChoice);







async function userMove() {
  const responsMoves = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + userChoice["pokemon"]
  );
  const JsonMoves = await responsMoves.json();
  const dataMoves = JsonMoves.moves;

  const movesUser = dataMoves.slice(0, 5).map((mov) => ({
    name: mov.move.name,
    url: mov.move.url,
  }));

  const userMove = await inquirer.prompt({
    type: "list",
    name: "move",
    choices: movesUser.map((m) => ({
      name: m.name,
      value: { name: m.name, url: m.url },
    })),
  });

  console.log("this is user move ", userMove.move.name);
  return userMove.move.url;
}

async function computerMove() {
  const movesComputer = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + computerChoice
  );
  const JsonMovesComputer = await movesComputer.json();
  const dataMovesComputer = JsonMovesComputer.moves;
  const moveComputerChoice =
    dataMovesComputer[Math.floor(Math.random() * dataMovesComputer.length)];
  console.log("this is computer move: ", moveComputerChoice.move.name);
  return moveComputerChoice.move.url;
}




let computerPoint = 300;
let userPoint = 300;






console.log("------------------------------------------------------DEBAT START-----------------------------")
while (true) {
  // ==== Tour du joueur ====
   console.log("CHOISIR VOTRE MOVE");
  const urlUserMove = await userMove();
  const fetchUserAccuracy = await fetch(urlUserMove);
  const dataAccuracy = await fetchUserAccuracy.json();
  const userAccuracy = dataAccuracy.accuracy;
  console.log("User Accuracy:", userAccuracy);

  // Le joueur attaque l’ordinateur
  computerPoint -= userAccuracy;

  if (computerPoint <= 0) {
    console.log("Le joueur a gagné !");
    break;
  }

  // ==== Tour de l’ordinateur ====
  const urlComputerMove = await computerMove();
  const fetchCompAccuracy = await fetch(urlComputerMove);
  const dataCompAccuracy = await fetchCompAccuracy.json();
  const compAccuracy = dataCompAccuracy.accuracy;

  userPoint -= compAccuracy;


  // Vérifier si le joueur est KO
  if (userPoint <= 0) {
    console.log("L’ordinateur a gagné !");
    break;
  }

  // ==== Afficher l'état à chaque tour ====
  console.log(`--- Tour terminé ---`);
  console.log(`User: ${userPoint} | Computer: ${computerPoint}`);
}


