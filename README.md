<h1>Jimmy's Silly Little Games</h1>
Shit I made back in my highschool 4th year's computer science class. Compiled and uploaded here for convenience.
View the tutorials and instructions for each of games below.
<hr />
<h1>Hangman</h1>
Number of players: 2+

Classic game of Hangman. The players should be divided into 2 groups, the guesser(s) and the wordsmith(s).

The guesser should look away from the screen, whilst the wordsmith enters a word containing 2-16 characters (only the 26 conventional letters from the English alphabet will be allowed) inside the provided box. This word will be the word that the guesser has to guess.
The wordsmith, after entering the word to be guessed, should click the confirm the button to enter the next stage of the game.

At this point the guesser is allowed to look at the screen again, and the game of Hangman begins. The guesser is shown the amount of letters the word contains by the way of empty lines. There is also a keyboard containing the 26 letters of the alphabet, and the guesser has to click a letter, which they think might be contained in the word, from the keyboard shown on the screen.

Once a letter has been clicked, it will be greyed out and have its background  colored green or red depending on if the guessed letter is contained in the word or not. If the guessed letter is contained in the word, its background on the keyboard will be colored green and all of its occurences inside the word will be shown. If the guessed letter is not contained in the word, its background on the keyboard will be colored red and a stroke of the Hangman will be drawn.

The game ends if the guesser inputs wrong letters for a total of 8 times, at which point the Hangman is fully drawn and the wordsmith is victorious, or if they successfully guessed the word without drawing the full Hangman, at which point the guesser is victorious.

The game can be restarted after it ends.
<hr />
<h1>Treasure Hunt</h1>
The title screen and the buttons are in Italian because I can't be bothered to redraw them. Find translations below.
There is NO skill involved, it's all luck and dopamine rush. Play at your own risk.

Number of players: 1

Avoid deathly traps, solve riddles and find the treasure.

"Caccia al Tesoro" literally translates to "Hunt for the treasure". The main title screen has just the title image and a button "Inizia", translating to "Start".

After pressing "Inizia", you will be shown the pre-game settings screen. Here you will decide how big the game board will be. The game board must contain a 
minimum of 36 cells (6x6, 3x12, 12x3) and a maximum of 144 (12x12). Once you've decided the size of the game board, press "Conferma", which translates to "Confirm", to start the game proper.

A board of the size determied in the previous screen will be shown, along with two (2) buttons below the game board. "Ricomincia" translates to "Restart" and "Indietro" translates to "Back". "Ricomincia" will re-generate the game board with the already established settings and "Indietro" will go back to the pre-game settings screen. The actual game involves clicking on the various cells in attempt to find the treasure chest.

There are four (4) possible outcomes for clicking on a cell:
<ul>
    <li>Dud: nothing happens, the game continues. It is illustrated by a big red cross.</li>
    <li>Trap: the game ends immediately in your loss. It is illustrated by a primed bomb.</li>
    <li>Riddle: you have to answer correctly to a riddle, choosing from four (4) different answers. By submitting the correct answer, at most two (2) of the remaining hidden traps will be revealed; otherwise the game immediately ends in your loss. It is illustrated by a rolled-up sheet of parchment.</li>
    <li>Treasure: the game ends immediately in your win. It is illustrated by an opened chest containing gold.</li>
</ul>

The formula to determine the amount of each outcome to generate is as follows:
<ul>
    <li>Dud: these are generated last. All cells which are not a Trap, a Riddle or the Treasure will be duds.</li>
    <li>Trap: number of traps = total number of cells / 7, always rounding down.</li>
    <li>Riddle: number of riddles = total number of cells / 25, always rounding up.</li>
    <li>Treasure: there will be always one (1) Treasure per game.</li>
</ul>