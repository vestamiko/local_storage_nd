const API_KEY = 
let usersTerm = document.getElementById("usersTermInput").value;
let page = document.getElementById("pageInput").value;

fetch
(`https://api.unsplash.com/photos/random?client_id=${API_KEY}&query=${usersTerm}&page=${page}`);

