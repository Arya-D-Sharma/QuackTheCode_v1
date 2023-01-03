document.addEventListener("DOMContentLoaded", () => {
    
    var cipherAlphabet = "abcdefghijklmnopqrstuvwxyz";
    var cipherCapAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var solution = "dunsinanehill";

    var statement1 = "To the distinguished Brinam Wood,";
    var statement2 = "While your force of nineteen geese encamp at Dunsinane Hill, tell them to cut an apple from the trees to use them as weapons.";
    var statement3 = "If all goes well and we are not beset by oranges, the attack is likely to be a success.";
    var statement4 = "We dearly hope that your attack on The Hamlet Wood goes planned.";
    var statement5 = "Good Luck."

    var refState = 1;

    var encrypted = "";

    var SpaceSelected = 1;
    var Squares = 120;
    var correct = false;
    var answer = "";
    var finalAnswer = "";

    let time = 0;

    /*
    Original message

    Dear Birnam Wood,
    While your force of nineteen geese encamp at Dunsinane Hill, tell them to cut an apple from the trees to use them as weapons.
    If all goes well and we are not beset by oranges, the attack is likely to be a success. 
    We dearly hope that your attack on The Hamlet Wood goes planned.
    Good Luck.

    Cipher: Caesar [19]
    Special rules: Vowels change to the next vowel. That is, a --> e, e --> i ...
    */

    createPuzzle();
    updateTileColor();

    encrypt(statement1);
    encrypt(statement2);
    encrypt(statement3);
    encrypt(statement4);
    encrypt(statement5);

    setInterval(updateCounter, 1000);

    document.addEventListener("keydown", function(event) {

            if (event.defaultPrevented) {
            return;
            }

            else if (event.keyCode >= 48 && event.keyCode <= 90) { 
                updateTile(event.key);
            }

            else if (event.key == "ArrowLeft") {
                if (SpaceSelected > 1) {
                        SpaceSelected--;
                    }    
            }

            else if (event.key == "ArrowRight") {
                if (SpaceSelected < Squares) {
                        SpaceSelected++;
                    }    
            }
             
            else if (event.key == "Backspace") {
                if (document.getElementById(String(SpaceSelected)).textContent == "" && SpaceSelected > 1) {
                        SpaceSelected--;
                        document.getElementById(String(SpaceSelected)).textContent = "";
                    }

                else {
                    document.getElementById(String(SpaceSelected)).textContent = "";
                }              
            }

            else if (event.keyCode == 32 || event.key == "Enter") {
                if (SpaceSelected < Squares - 12) {
                    SpaceSelected = Math.ceil(SpaceSelected /12) * 12 + 1;
                }              
            }
            
            else if (event.key == "Delete") {
                clearAll();
            }

            updateTileColor();
        });
         
    function createPuzzle() {

        for (let i = 0; i < Squares; i++) {
            let typeSpace = document.createElement("div");
            typeSpace.classList.add("square");
            typeSpace.setAttribute("id", i + 1);
            document.getElementById("puzzle").appendChild(typeSpace);
        }
    }

    function updateTile(passed) {

        document.getElementById(String(SpaceSelected)).textContent = passed;
        
        if (SpaceSelected != Squares) {
            SpaceSelected++;
        }
    }


    function updateTileColor () {
               
        for (let j = 1; j <= Squares; j++) {
            document.getElementById(String(j)).style.backgroundColor = "white";
        }

        document.getElementById(String(SpaceSelected)).style.backgroundColor = "grey";
    }

    function closeWindow() {
        if (confirm("Do you wish to close the game? All progress will be lost.")) {
            close();
        }
    }

    function clearAll() {
        for(let k = 1; k <= Squares; k++){
            document.getElementById(String(k)).textContent = "";
        }
        SpaceSelected = 1;
    }

    function calcFinalSolution() {
        for (let l = 1; l <= Squares; l++) {
            answer += document.getElementById(String(l)).textContent;
        }

        for(let m = 0; m < answer.length; m++) {
            if (answer.substring(m, m+1) != " ") {
                finalAnswer += answer.substring(m, m+1);
            }
        }

        finalAnswer = finalAnswer.toLowerCase();
        alert(finalAnswer);
    }

    function checkAnswer () {
        if (finalAnswer == solution) {
            alert("Correct");
        }
    }

    function updateCounter() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds: seconds;

        document.getElementById("counter").innerHTML = `${minutes}:${seconds}`;
        time++;
    }

    function encrypt (message) {
        for (let a = 0; a < message.length; a++) {

            if (message.substring(a, a+1) == "A") {
                encrypted += "E";
            }

            else if (message.substring(a, a+1) == "E") {
                encrypted += "I";
            }

            else if (message.substring(a, a+1) == "I") {
                encrypted += "O";
            }

            else if (message.substring(a, a+1) == "O") {
                encrypted += "U";
            }

            else if (message.substring(a, a+1) == "U") {
                encrypted += "A";
            }

            else if (message.substring(a, a+1) == "a") {
                encrypted += "e";
            }

            else if (message.substring(a, a+1) == "e") {
                encrypted += "i";
            }

            else if (message.substring(a, a+1) == "i") {
                encrypted += "o";
            }

            else if (message.substring(a, a+1) == "o") {
                encrypted += "u";
            }

            else if (message.substring(a, a+1) == "u") {
                encrypted += "a";
            }

            else if (message.substring(a, a+1) == " " || message.substring(a, a+1) == "," || message.substring(a, a+1) == ".") {
                encrypted += message.substring(a, a+1);
            }

            else {
                
                if (message.substring(a, a+1) == message.substring(a, a+1).toUpperCase()) {
                    for (let b = 0; b < cipherCapAlphabet.length; b++) {
                        if (message.substring(a, a+1) == cipherCapAlphabet.substring(b, b+1)) {
                            encrypted += cipherCapAlphabet.substring((b+19)%26, ((b+19)%26)+1); 
                        }
                    }
                }

                else {
                    for (let c = 0; c < cipherAlphabet.length; c++) {                        
                        if (message.substring(a, a+1) == cipherAlphabet.substring(c, c+1)) {
                            encrypted += cipherAlphabet.substring((c+19)%26, ((c+19)%26)+1); 
                        }
                    }
                }                
            }
        }
        
        document.getElementById("Statement" + String(refState)).innerHTML = encrypted;
        refState += 1;
        encrypted = "";
    }
});