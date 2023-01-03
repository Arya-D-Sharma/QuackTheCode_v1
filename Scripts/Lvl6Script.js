document.addEventListener("DOMContentLoaded", () => {
    
    var SpaceSelected = 1;
    var Squares = 400;

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

            else if (event.key == "Enter") {
                if (SpaceSelected < Squares - 20) {
                    SpaceSelected = Math.ceil(SpaceSelected /20) * 20 + 1;
                }              
            }
            
            else if (event.key == "Delete") {
                clearAll();
            }

            else if (event.keyCode == 32) {
                if (SpaceSelected < Squares) {
                    SpaceSelected += 1;
                }
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

    function clearAll() {
        for(let k = 1; k <= Squares; k++){
            document.getElementById(String(k)).textContent = "";
        }
        SpaceSelected = 1;
    }


    function updateCounter() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds: seconds;

        document.getElementById("counter").innerHTML = `${minutes}:${seconds}`;
        time++;
    }

    
});