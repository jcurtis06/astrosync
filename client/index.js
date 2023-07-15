const socket = io("http://localhost:3000");

// Game Setup
function createGame() {
  const playerName = document.getElementById("playerName").value;
  const gameName = document.getElementById("gameName").value;
  socket.emit("createGame", playerName, gameName);
}

// Start Game
function startGame() {
  console.log("to be continued...");
}

// Event Handlers
socket.on("joinedGame", (code, username, players, isHost) => {
  document.getElementById("gameSetup").style.display = "none";

  document.getElementById("lobbyCode").innerHTML += " " + code;
  document.getElementById("username").innerHTML += " " + username;
  document.getElementById("playerList").innerHTML = `Players: ${players}`;

  if (isHost) document.getElementById("startGame").style.display = "block";

  document.getElementById("game").style.display = "block";
});

socket.on("playerJoined", (players) => {
  document.getElementById("playerList").innerHTML = `Players: ${players}`;
});
