/*JIN MINGDA 4BI A.S.2022/23*/

let titlescr = document.getElementById("titlescr");
let setupscr = document.getElementById("setupscr");
let game = document.getElementById("gameproper");

let fwidth = document.getElementById("fwidth");
let fheight = document.getElementById("fheight");

let btnaddw = document.getElementById("addw");
let btnsubw = document.getElementById("subw");
let btnaddh = document.getElementById("addh");
let btnsubh = document.getElementById("subh");

let field = document.getElementsByTagName("tbody")[0];
let result = document.getElementById("result");
let riddlebox = document.getElementById("riddle");
let opts = document.getElementsByClassName("riddleopt");

let cells = 0;
let treasure = false;
let riddles = 0;
let deathtraps = 0;
let empties = 0;

let found = false;

document.getElementById("start").addEventListener("click", () => {
    titlescr.style.display = "none";
    setupscr.style.display = "grid";
});

document.getElementById("ctn").addEventListener("click", startGame);
document.getElementById("retry").addEventListener("click", startGame);
document.getElementById("back").addEventListener("click", reset);

btnaddw.addEventListener("click", addWidth);
btnsubw.addEventListener("click", removeWidth);
btnaddh.addEventListener("click", addHeight);
btnsubh.addEventListener("click", removeHeight);

reset();

function reset() {
    titlescr.style.display = "grid";
    setupscr.style.display = "none";
    game.style.display = "none";
	riddlebox.style.display = "none";
    fwidth.value = 6;
    fheight.value = 6;
    cells = 0;
    treasure = false;
    riddles = 0;
    deathtraps = 0;
	empties = 0;
	found = false;
    field.innerHTML = "";
	result.textContent = "";
    btnaddw.hidden = false;
    btnsubw.hidden = true;
    btnaddh.hidden = false;
    btnsubh.hidden = true;
	opts[0].removeEventListener("click", rightAnswer);
	opts[0].removeEventListener("click", wrongAnswer);
	opts[1].removeEventListener("click", rightAnswer);
	opts[1].removeEventListener("click", wrongAnswer);
	opts[2].removeEventListener("click", rightAnswer);
	opts[2].removeEventListener("click", wrongAnswer);
	opts[3].removeEventListener("click", rightAnswer);
	opts[3].removeEventListener("click", wrongAnswer);
}

function startGame() {
    titlescr.style.display = "none";
    setupscr.style.display = "none";
    game.style.display = "grid";
    riddlebox.style.display = "none";
    cells = 0;
    treasure = false;
    riddles = 0;
    deathtraps = 0;
	empties = 0;
	found = false;
    field.innerHTML = "";
	result.textContent = "";
    opts[0].removeEventListener("click", rightAnswer);
	opts[0].removeEventListener("click", wrongAnswer);
	opts[1].removeEventListener("click", rightAnswer);
	opts[1].removeEventListener("click", wrongAnswer);
	opts[2].removeEventListener("click", rightAnswer);
	opts[2].removeEventListener("click", wrongAnswer);
	opts[3].removeEventListener("click", rightAnswer);
	opts[3].removeEventListener("click", wrongAnswer);
    generateField();
}

function generateField() {
    cells = fwidth.value * fheight.value; 
    riddles = Math.ceil(cells / 25);
    deathtraps = Math.floor(cells / 7);
	empties = cells - 1 - riddles - deathtraps;
    for(let i = 0; i < fheight.value; i++)
        field.innerHTML += "<tr></tr>";
    let frows = document.getElementsByTagName("tr");
	for(let item of frows) {
		for(let i = 0; i < fwidth.value; i++) {
			let type = Math.floor(Math.random() * 2);
			if(type == 0) {
				do {
					type = Math.floor(Math.random() * 35);
				} while((type == 0 && treasure == true) || (type >= 1 && type <= 2 && riddles == 0) || (type >= 3 && type <= 10 && deathtraps == 0) || (type >= 11 && empties == 0));
				if(type == 0) {
					item.innerHTML += "<td class=\"land\"><input type=\"button\" class=\"treasure\" name=\"tile\" /></td>";
					treasure = true;
				} else if(type >= 1 && type <= 2) {
					item.innerHTML += "<td class=\"land\"><input type=\"button\" class=\"triddle\" name=\"tile\" /></td>";
					riddles--;
				} else if(type >= 3 && type <= 10) {
					item.innerHTML += "<td class=\"land\"><input type=\"button\" class=\"tdeath\" name=\"tile\" /></td>";
					deathtraps--;
				} else {
					item.innerHTML += "<td class=\"land\"><input type=\"button\" class=\"empty\" name=\"tile\" /></td>";
					empties--;
				}
			} else {
				do {
					type = Math.floor(Math.random() * 35);
				} while((type == 0 && treasure == true) || (type >= 1 && type <= 2 && riddles == 0) || (type >= 3 && type <= 10 && deathtraps == 0) || (type >= 11 && empties == 0));
				if(type == 0) {
					item.innerHTML += "<td class=\"sea\"><input type=\"button\" class=\"treasure\" name=\"tile\" /></td>";
					treasure = true;
				} else if(type >= 1 && type <= 2) {
					item.innerHTML += "<td class=\"sea\"><input type=\"button\" class=\"triddle\" name=\"tile\" /></td>";
					riddles--;
				} else if(type >= 3 && type <= 10) {
					item.innerHTML += "<td class=\"sea\"><input type=\"button\" class=\"tdeath\" name=\"tile\" /></td>";
					deathtraps--;
				} else {
					item.innerHTML += "<td class=\"sea\"><input type=\"button\" class=\"empty\" name=\"tile\" /></td>";
					empties--;
				}
			}
		}
	}
    document.getElementsByTagName("table")[0].style.aspectRatio = fwidth.value + " / " + fheight.value;
	let tdempty = document.getElementsByClassName("empty");
	let tdtreasure = document.getElementsByClassName("treasure")[0];
	let tdriddle = document.getElementsByClassName("triddle");
	let tddeath = document.getElementsByClassName("tdeath");
	for(let item of tdempty)
		item.addEventListener("click", emptyTile);
	for(let item of tddeath)
		item.addEventListener("click", deathTrap);
	for(let item of tdriddle)
		item.addEventListener("click", riddleTrap);
	tdtreasure.addEventListener("click", treasureChest);
}

function addWidth() {
    (fwidth.value)++;
    if(btnaddw.hidden == false && fwidth.value == 12)
        btnaddw.hidden = true;
    if(btnsubw.hidden == true);
        btnsubw.hidden = false;
    if(btnsubh.hidden == true && (fheight.value - 1) * fwidth.value >= 36)
        btnsubh.hidden = false;
}

function removeWidth() {
    (fwidth.value)--;
    if(btnsubw.hidden == false && (fwidth.value - 1) * fheight.value < 36)
        btnsubw.hidden = true;
    if(btnaddw.hidden == true)
        btnaddw.hidden = false;
    if(btnsubh.hidden == false && (fheight.value - 1) * fwidth.value < 36)
        btnsubh.hidden = true;
}

function addHeight() {
    (fheight.value)++;
    if(btnaddh.hidden == false && fheight.value == 12)
        btnaddh.hidden = true;
    if(btnsubh.hidden == true);
        btnsubh.hidden = false;
    if(btnsubw.hidden == true && (fwidth.value - 1) * fheight.value >= 36)
        btnsubw.hidden = false;
}

function removeHeight() {
    (fheight.value)--;
    if(btnsubh.hidden == false && (fheight.value - 1) * fwidth.value < 36)
        btnsubh.hidden = true;
    if(btnaddh.hidden == true)
        btnaddh.hidden = false;
    if(btnsubw.hidden == false && (fwidth.value - 1) * fheight.value < 36)
        btnsubw.hidden = true;
}

function emptyTile() {
	this.disabled = true;
	this.style.backgroundImage = "url(\"images/empty.png\")";
}

function deathTrap() {
    this.disabled = true;
	this.style.backgroundImage = "url(\"images/bomb.png\")";
	end();
}

function riddleTrap() {
    this.disabled = true;
	this.style.backgroundImage = "url(\"images/riddle.png\")";
	riddlebox.style.display = "grid";
	let txt = document.getElementById("riddletxt");
	txt.innerHTML = "You found a magical parchment!<br />Answer correctly or you will lose your life!<br /><br />";
	switch(Math.floor(Math.random() * 8)) {
		case 0:
			txt.innerHTML += "What has roots as nobody sees,<br />Is taller than trees,<br />Up, up it goes,<br />And yet never grows?";
			opts[0].value = "Skyscraper";
			opts[0].addEventListener("click", wrongAnswer);
			opts[1].value = "Mountain";
			opts[1].addEventListener("click", rightAnswer);
			opts[2].value = "Leaves";
			opts[2].addEventListener("click", wrongAnswer);
			opts[3].value = "People";
			opts[3].addEventListener("click", wrongAnswer);
			break;
		case 1:
			txt.innerHTML += "Thirty white horses on a red hill,<br />First they champ,<br />Then they stamp,<br />Then they stand still.";
			opts[0].value = "Teeth";
			opts[0].addEventListener("click", rightAnswer);
			opts[1].value = "Hair";
			opts[1].addEventListener("click", wrongAnswer);
			opts[2].value = "Seasons";
			opts[2].addEventListener("click", wrongAnswer);
			opts[3].value = "Forest";
			opts[3].addEventListener("click", wrongAnswer);
			break;
		case 2:
			txt.innerHTML += "Voiceless it cries,<br />Wingless flutters,<br />Toothless bites,<br />Mouthless mutters.";
			opts[0].value = "Thoughts";
			opts[0].addEventListener("click", wrongAnswer);
			opts[1].value = "Wind";
			opts[1].addEventListener("click", rightAnswer);
			opts[2].value = "Rain";
			opts[2].addEventListener("click", wrongAnswer);
			opts[3].value = "Emotion";
			opts[3].addEventListener("click", wrongAnswer);
			break;
		case 3:
			txt.innerHTML += "It cannot be seen, cannot be felt,<br />Cannot be heard, cannot be smelt.<br />It lies behind stars and under hills,<br />And empty holes it fills.<br />It comes out first and follows after,<br />Ends life, kills laughter.";
			opts[0].value = "Dark";
			opts[0].addEventListener("click", rightAnswer);
			opts[1].value = "Shadow";
			opts[1].addEventListener("click", wrongAnswer);
			opts[2].value = "Air";
			opts[2].addEventListener("click", wrongAnswer);
			opts[3].value = "Silence";
			opts[3].addEventListener("click", wrongAnswer);
			break;
		case 4:
			txt.innerHTML += "A box without hinges, key, or lid,<br />Yet golden treasure inside is hid.";
			opts[0].value = "Fire";
			opts[0].addEventListener("click", wrongAnswer);
			opts[1].value = "Moon";
			opts[1].addEventListener("click", wrongAnswer);
			opts[2].value = "Egg";
			opts[2].addEventListener("click", rightAnswer);
			opts[3].value = "Sun";
			opts[3].addEventListener("click", wrongAnswer);
			break;
		case 5:
			txt.innerHTML += "Alive without breath,<br />As cold as death;<br />Never thirsty, ever drinking,<br />All in mail never clinking.";
			opts[0].value = "Rock";
			opts[0].addEventListener("click", wrongAnswer);
			opts[1].value = "Ocean";
			opts[1].addEventListener("click", wrongAnswer);
			opts[2].value = "Fish";
			opts[2].addEventListener("click", rightAnswer);
			opts[3].value = "Tree";
			opts[3].addEventListener("click", wrongAnswer);
			break;
		case 6:
			txt.innerHTML += "This thing all things devours;<br />Birds, beasts, trees, flowers;<br />Gnaws iron, bites steel;<br />Grinds hard stones to meal;<br />Slays king, ruins town,<br />And beats mountain down.";
			opts[0].value = "River";
			opts[0].addEventListener("click", wrongAnswer);
			opts[1].value = "Night";
			opts[1].addEventListener("click", wrongAnswer);
			opts[2].value = "Weather";
			opts[2].addEventListener("click", wrongAnswer);
			opts[3].value = "Time";
			opts[3].addEventListener("click", rightAnswer);
			break;
		case 7:
			txt.innerHTML += "What have I got in my pocket?";
			opts[0].value = "Handkerchief";
			opts[0].addEventListener("click", wrongAnswer);
			opts[1].value = "Nothing";
			opts[1].addEventListener("click", wrongAnswer);
			opts[2].value = "Smartphone";
			opts[2].addEventListener("click", wrongAnswer);
			opts[3].value = "Ring";
			opts[3].addEventListener("click", rightAnswer);
	}
}

function wrongAnswer() {
	riddlebox.style.display = "none";
	end();
}

function rightAnswer() {
	riddlebox.style.display = "none";
	opts[0].removeEventListener("click", rightAnswer);
	opts[0].removeEventListener("click", wrongAnswer);
	opts[1].removeEventListener("click", rightAnswer);
	opts[1].removeEventListener("click", wrongAnswer);
	opts[2].removeEventListener("click", rightAnswer);
	opts[2].removeEventListener("click", wrongAnswer);
	opts[3].removeEventListener("click", rightAnswer);
	opts[3].removeEventListener("click", wrongAnswer);
	
	let tddeath = document.getElementsByClassName("tdeath");
	let count = 0;
	
	for(item of tddeath) {
		if(item.disabled == true)
			count++;
	}
	
	let dis = 0;	
	while(count < tddeath.length && dis < 2) {
		let rng;
		do {
			rng = Math.floor(Math.random() * tddeath.length);
		} while(tddeath[rng].disabled == true);
		dis++;
		count++;
		tddeath[rng].disabled = true;
		tddeath[rng].style.backgroundImage = "url(\"images/bomb.png\")";
	}
}

function treasureChest() {
    this.disabled = true;
	this.style.backgroundImage = "url(\"images/chest.png\")";
	found = true;
	end();
}

function end() {
	let tiles =	document.getElementsByName("tile");
	for(let item of tiles)
		item.disabled = true;
	if(found == true) {
		result.textContent = "GAME OVER, YOU FOUND THE TREASURE!";
		result.style.color = "#e2e200";
		result.style.textShadow = "#261700 3px 3px 0px, #261700 -3px 3px 0px, #261700 -3px -3px 0px, #261700 3px -3px 0px";
	} else {
		result.textContent = "GAME OVER, YOU DIED!";
		result.style.color = "#c14141";
		result.style.textShadow = "#872d2d 3px 3px 0px, #872d2d -3px 3px 0px, #872d2d -3px -3px 0px, #872d2d 3px -3px 0px";
	}
}