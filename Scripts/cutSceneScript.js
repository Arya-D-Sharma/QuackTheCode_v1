document.addEventListener("DOMContentLoaded", () => {

    const solution = "till";
    var encrypted = "";

    const EnDictionary = {
        "a" : "e", "e" : "i", "i" : "o", "o" : "u", "u" : "a"
    };

    document.addEventListener("click", () => {
        document.getElementById("Panic").style.display = "none";
        encrypt();
        document.getElementById("encryptionCheck").innerHTML = `${encrypted}`;
    });
        
    function encrypt() {

        for (let i = 0; i < solution.length; i++) {
            encrypted += EnDictionary
        }
    }   
});