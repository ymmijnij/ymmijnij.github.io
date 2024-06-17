/*Le due div delle due diverse fasi di gioco*/
let phase1 = document.getElementById("phase1");
let phase2 = document.getElementById("phase2");

/*Tag <span> usato per visualizzare il messaggio di errore*/
let error = document.getElementById("error");

/*L'array contenente tutti i button delle lettere della seconda fase*/
let keyboard = document.getElementsByClassName("letter");

/*<div> usato per visualizzare la parola nella seconda fase del gioco*/
let display = document.getElementById("display");

/*<span> usato per visualizzare il messaggio di termine partita*/
let endmsg = document.getElementById("endmsg");

/*Array contenente i diversi caratteri della parola inserita, non è una stringa*/
let letters = [];

/*Array che contenerà le eventuali lettere indovinate nella seconda fase di gioco*/
let guess = [];

/*Possibilità di sbaglio disponibili*/
let lives = 7;

/*Button per ricominciare*/
let retry = document.getElementsByClassName("retry");
for(let item of retry)
    item.addEventListener("click", reset);

/*La funzione reset è anche usata come l'inizializzazione*/
reset();

/*Button di conferma nella prima fase di gioco*/
document.getElementById("send").addEventListener("click", () => {
    letters = document.getElementById("word").value.trim().split("");
    /*Uso un classico ciclo for invece del for..of perché con for..of non si salvano
    le modifiche all'array*/
    for(let i = 0; i < letters.length; i++)
        letters[i] = letters[i].toUpperCase();
    
    /*Validazione della parola*/
    let valid = true;
    let i = 0;
    if(letters.length < 2 || letters.length > 16)
        valid = false;
    else {
        while(i < letters.length && valid == true) {
            if(letters[i] < "A" || letters[i] > "Z")
                valid = false;
            i++;
        }    
    }
    
    if(valid == true) {
        /*Impostando lo stile "display" del div a "none" lo nasconde assieme a tutti i suoi figli*/
        phase1.style.display = "none";
        phase2.style.display = "grid";
        
        /*Gestisco la prima lettera fuori dal ciclo for per evitare di inserire uno spazio in più*/
        display.innerHTML = "<u>&nbsp</u>";
        for(let i = 1; i < letters.length; i++)
            display.innerHTML += "&nbsp<u>&nbsp</u>"
        
        for(let item of keyboard) {
            if(letters.includes(item.value))
                item.addEventListener("click", rightguess);
            else
                item.addEventListener("click", wrongguess);
        }
            
    } else {
        error.textContent = "Error: the word must be between 2-16 characters long and must only contain the 26 letters of the English alphabet."
    }
});

/*Reimposto tutto per preparare a un'eventuale successiva partita*/
function reset() {
    letters = [];
    guess = [];
    lives = 7;
    phase1.style.display = "grid";
    phase2.style.display = "none";
    
    error.textContent = "";
    document.getElementById("word").value = "";
    
    for(let item of keyboard) {
        item.disabled = false;
        item.hidden = false;
        item.style.backgroundColor = "white";
        item.removeEventListener("click", rightguess);
        item.removeEventListener("click", wrongguess);
    }
    document.getElementById("hangman").src = "images/0.png";
    retry[1].hidden = true;
    endmsg.textContent = "";
}

/*Funzione applicata all'EventListener dei button delle lettere contenute nella parola*/
function rightguess() {
    this.disabled = true;
    this.style.backgroundColor = "#ccffcc";
    let c = 0;
    if(letters[0] === guess[0] || letters[0] === this.value) {
        display.innerHTML = "<u>" + letters[0] + "</u>"
        guess[0] = letters[0];
        c++;
    } else
        display.innerHTML = "<u>&nbsp</u>"
    for(let i = 1; i < letters.length; i++) {
        if(letters[i] === guess[i] || letters[i] === this.value) {
            display.innerHTML += "&nbsp<u>" + letters[i] + "</u>";
            guess[i] = letters[i];
            c++;
        }
        else
            display.innerHTML += "&nbsp<u>&nbsp</u>";
    }
    if(c == letters.length)
        end();
}

/*Funzione applicata all'EventListener dei button delle lettere assenti dalla parola*/
function wrongguess() {
    this.disabled = true;
    this.style.backgroundColor = "#ffcccc";
    let img = document.getElementById("hangman");
    lives--;
    switch(lives) {
        case 6:
            img.src = "images/1.png";
            break;
        case 5:
            img.src = "images/2.png";
            break;
        case 4:
            img.src = "images/3.png";
            break;
        case 3:
            img.src = "images/4.png";
            break;
        case 2:
            img.src = "images/5.png";
            break;
        case 1:
            img.src = "images/6.png";
            break;
        case 0:
            img.src = "images/full.png";
            display.innerHTML = "<u>" + letters[0] + "</u>";
            for(let i = 1; i < letters.length; i++)
                display.innerHTML += "&nbsp<u>" + letters[i] + "</u>";
            end();
    }
}

/*Funzione che gestisce il termine della partita*/
function end() {
    for(let item of keyboard)
        item.hidden = true;
    retry[1].hidden = false;
    if(lives > 0)
        endmsg.textContent = "GUESSER WINS!";
    else
        endmsg.textContent = "WORDSMITH WINS!";
}