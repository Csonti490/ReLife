
var nev = faj = kaszt = kepesseg = targy="-Jelenleg nincsen-";
var penzed = 0;
var regitest = true;

window.onload = WriteSzoveg();
function WriteSzoveg(){
    var kiir = document.querySelectorAll(".kiiras");
    kiir[0].innerHTML = nev;
}

// Játék
function Game1(tortenetIndex) {
    if(tortenetIndex === 'theend'){
        const startDiv = document.getElementById("start");
        startDiv.classList.remove("d-none");
        const tortenetek = document.querySelectorAll('.tortenet');
        tortenetek.forEach(t => t.classList.add('d-none'));
    }else{
        const startDiv = document.getElementById("start");
        startDiv.classList.add("d-none");
    
        // Először rejtjük el az összes történetet
        const tortenetek = document.querySelectorAll('.tortenet');
        tortenetek.forEach(t => t.classList.add('d-none'));

        // Megjelenítjük a kiválasztott történetet
        const currentTortenet = tortenetek[tortenetIndex];
        currentTortenet.classList.remove('d-none');
        const currentValasz = document.querySelectorAll('.valasz');
        currentValasz.forEach(t => t.classList.add('d-none'));

        // Kiválasztjuk a szöveg elemet, és megjelenítjük
        const szovegElement = currentTortenet.querySelector('.szoveg');
        szovegElement.classList.remove('d-none');
        const szoveg = szovegElement.innerHTML;//*
        szovegElement.innerHTML = ""; // Ürítjük a szöveget//*

        let index = 0;

        function typeCharacter() {
            if (index < szoveg.length) {
                // Ellenőrizzük, hogy a következő karakterek egy HTML elem kezdetét jelentik-e
                if (szoveg.charAt(index) === '<') {
                    // Megkeressük a zárójelet
                    const endIndex = szoveg.indexOf('>', index);
                    if (endIndex !== -1) {
                        // Kivágjuk az egész HTML elemet
                        const htmlTag = szoveg.substring(index, endIndex + 1);
                        szovegElement.innerHTML += htmlTag; // Hozzáadjuk a HTML elemet
                        index = endIndex + 1; // Ugrás a következő karakterre
                        setTimeout(typeCharacter, 1); // Késleltetett hívás
                        return; // Visszatérés, hogy ne folytassa a karakterek írását
                    }
                }
                
                // Normál karakter hozzáadása
                szovegElement.innerHTML += szoveg.charAt(index);
                index++;
                setTimeout(typeCharacter, 1); // 1 ms késleltetés
            } else {
                // Ha vége a szöveg írásának, megjelenítjük a választ
                const valaszDiv = currentTortenet.querySelector('.valasz');
                valaszDiv.classList.remove('d-none');
            }
        }

        typeCharacter();
    }
}

function ChangeValtozo(){
    nev = document.getElementById("nev").value;
    WriteSzoveg();
}
