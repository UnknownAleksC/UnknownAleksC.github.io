/* --------------------------------------------------- Model ------------------------------------------------------------*/

const mainDiv = document.getElementById('app');
const progressDiv = document.getElementById('progressBar')
let terjeText = 'Terje Er Ute å Kjører En Tirsdag Ettermiddag.';
let terjeCarPic = 'Terje_Car.gif';
let bokbilde;
let terjeIq = 50;
let iqBarIndex = 0;
let bookName;
/* Minus or plus values for the progressbar, and calls(shows) the progressbar */
let bookIqMinus = 10;
let bookIqPlus = 10;
let benjaminIq = 15;
let benjaminSignaturIq = 20;
showProgress();

/* --------------------------------------------------- View ------------------------------------------------------------*/

updateView();
function updateView() {
    let html = /* HTML */`
    <img src="imgs/${terjeCarPic}"/> <br>
    <h2>${terjeText}</h2>
    `
    mainDiv.innerHTML = html;
    if (terjeText === 'Terje Er Ute å Kjører En Tirsdag Ettermiddag.') {
        setTimeout(((terjeText = 'Oi, hva er dette?', terjeCarPic = 'Terje_Car_Stop.png'), updateView), 3000);
    } else {
        terjeText = 'Terje Er Ute å Kjører En Tirsdag Ettermiddag.';
        terjeCarPic = 'Terje_Car.gif';
        setTimeout((selectOccurance), 3000);
    }
}

/* To change the progressbar values you call the function "updateProgress(bookIqPlus, 'plus')" or updateProgress(bookIqMinus, 'minus') */
function showProgress() {
    let html = /* HTML */`
    <div class="iqProgress">
        <div class="iqBar">100-IQ</div>
    </div>
    `
    progressDiv.innerHTML = html;
}
/* Temp buttons for testing progress bar */
/*   */

// benjamin();
function benjamin() {
    let num = Math.floor(Math.random() * 4);
    let copyText = [
        { person: 'Linn', text: 'Hvert femte minutt med koding fortjener en time med pomodoro' },
        { person: 'Marie', text: 'Hver femte linje med kode fortjener to timer med pomodoro' },
        { person: 'Eskil', text: 'Hvert femtende minutt med koding fortjener tre timer med pomodoro' },
        { person: 'Benjamin', text: 'Benjamin' }
    ]
    let coolHtml = /* HTML */`
    <div class="container">
    <h3 class="centered">"Terje, nå har du glemt å skrive i loggen (igjen)!" </h3>
    <img class="char" src="imgs/Benjamin.png"> <br/>
    <div class="container">
    <h3 class="centered" > "På tide å stjele ${copyText[num].person} sin logg!" </h3>
    <img class="char" src="imgs/Terje_Neutral.png"/>
    </div>
    <img class="char" src="imgs/copy_${copyText[num].person}.png"/> <img class="logg" src="imgs/${copyText[num].person}_logg.png"><br/>
    <input id="loggInput" type="text" size="72"> <button onclick="submitAnswer('${copyText[num].text}')">Lag logg</button> <br/>
    `
    mainDiv.innerHTML = coolHtml;
}

function bookPopup() {
    let num = Math.floor(Math.random() * 4);
    if (num === 0) {
        bokbilde = 'BookGood_1.png';
        bookName = 'Koding I Javascript?';
    }
    else if (num === 1) {
        bokbilde = 'BookGood_2.png';
        bookName = 'Stephen Hawking Ja! Smart Fyr,';
    }
    else if (num === 2) {
        bokbilde = 'BookBad_1.png';
        bookName = 'Twilight?';
    }
    else {
        bokbilde = 'BookBad_2.png';
        bookName = 'Lord Of The Rings?';
    }
    let html = /* HTML */`
    <img class="char" src="imgs/Terje_Neutral.png"/> <br>
    <h2>En Bok i Veikanten?</h2>
    <h2>${bookName} Fin Bok, Burde Jeg Lese Denne?</h2>
    <div><img class="char" src="imgs/${bokbilde}"/></div><br>

    <button class="bookButtons" onclick="plukkeoppBok(bokbilde)">Plukk opp boken</button>
    <button class="bookButtons" onclick="laBokLigge(bokbilde)">La boken ligge</button>
    `
    mainDiv.innerHTML = html;
}

/* If Terje has no IQ this will show */
function minIq() {
    let html = /* HTML */`
    <h1>Det er ingen IQ i en person som glemmer logg! - Benjamin 1947</h1>
    <h2>Du gikk tom for IQ, les en bok og prøv igjen.</h2>
    `;
    progressDiv.style.display = 'none';
    mainDiv.innerHTML = html;
}

/* If Terje has 200 IQ this will show */
function maxIq() {
    let html = /* HTMl */`
    <h1 class='brain'>🧠</h1>
    <h2><em>Terje Ble Geni<em></h2>
    `;
    mainDiv.innerHTML = html;
}

/* --------------------------------------------------- CONTROLLER ------------------------------------------------------------*/

/* VELGER HVA SLAGS EVENT SOM SKAL SKJE */
// selectOccurance();
function selectOccurance() {
    let index = Math.random();
    let testEvent = [benjamin, bookPopup];
    if (index > 0.20) testEvent[1]();
    else if (index < 1) testEvent[0]();
}

/* funksjon for å plukke opp en bok */
function plukkeoppBok(bok) {
    // bookPopup();
    if (bok === 'BookGood_1.png' || bok === 'BookGood_2.png') {
        updateProgress(bookIqPlus, 'plus');
        // updateView();
    }
    else if (bok === 'BookBad_1.png' || bok === 'BookBad_2.png') {
        updateProgress(bookIqMinus, 'minus');
        // updateView();
    }
    if (terjeIq !== 200 || terjeIq !== 0) {
        updateView(); 
        console.log('testforupdate');
    }
}

function laBokLigge(bok) {
    if (bok === 'BookGood_1.png' || bok === 'BookGood_2.png') {
        updateProgress(bookIqMinus, 'minus');
        // updateView();
    }
    else if (bok === 'BookBad_1.png' || bok === 'BookBad_2.png') {
        updateProgress(bookIqPlus, 'plus');
        // updateView();
    }
    if (terjeIq !== 200 || terjeIq !== 0) {
        updateView(); 
        console.log('testforupdate');
    }
}

/* Sender deg resultat av loggen basert på det du har skrevet matchet eller ikke */
function submitAnswer(loggText) {
    let logginput = document.getElementById('loggInput');
    let userText = logginput.value;

    let html = /*HTML*/`
    <div class="container">
    <h3 class="centered"> ${checkAnswer(userText, loggText)}</h3>
    <img class="char" src="imgs/Benjamin.png"> <br/>
    </div>
    `
    mainDiv.innerHTML = html;
    if (terjeIq !== 200 || terjeIq !== 0) {
        setTimeout(updateView, 2500);
    }
}

/* Sjekker om du har skrevet riktig i loggen eller ikke */
function checkAnswer(userText, loggText) {
    let benjaminDialogue = '';
    if (userText === loggText + '.') {
        benjaminDialogue = 'Bra jobba Terje!';
        updateProgress(benjaminIq, 'plus');
    }
    else if (loggText === 'Benjamin' && userText === 'Benjamin') {
        benjaminDialogue = 'Dette er den beste loggen jeg noen gang har lest Terje.';
        updateProgress(benjaminSignaturIq, 'plus');
    }
    else if (userText === loggText) {
        benjaminDialogue = 'Nå glemte du punktum Terje ...';
        updateProgress(benjaminIq, 'minus');
    }
    else {
        benjaminDialogue = 'Dette ser ikke bra ut, du får prøve igjen i morgen.';
        updateProgress(benjaminIq, 'minus');
    }
    return benjaminDialogue;
}

/* IQ Progress bar */
function updateProgress(opertation, plusOrMinus) {
    if (iqBarIndex == 0) {
        let elem = document.getElementsByClassName("iqBar"); /* getElements lager et array, man må derfor ha elem[0] i dette tilfellet for å targette iqBar-en */
        let newWidthMinus = terjeIq - opertation;
        let newWidthPlus = terjeIq + opertation;

        /* Set interval laget en 'animasjon' isteden for at den fyller seg 'instant' */
        let id = setInterval(frame, 10);
        function frame() {
            if (terjeIq > 0 && terjeIq < 100) {
                if (plusOrMinus === 'minus') {
                    if (terjeIq <= newWidthMinus) {
                        clearInterval(id);
                        iqBarIndex = 0;
                    } else {
                        terjeIq--;
                        elem[0].style.width = terjeIq + "%";
                        elem[0].innerHTML = terjeIq * 2 + "-IQ";
                    }
                } else {
                    if (terjeIq >= newWidthPlus) {
                        clearInterval(id);
                        iqBarIndex = 0;
                    } else {
                        terjeIq++;
                        elem[0].style.width = terjeIq + "%";
                        elem[0].innerHTML = terjeIq * 2 + "-IQ";
                    }
                }
            } else {
                if (terjeIq === 100) { /* Om Terje har 100 IQ blir viewet "maxIq" called  */
                    clearInterval(id);
                    iqBarIndex = 1;
                    maxIq();
                } else if (terjeIq === 0) { /* Om Terje har 0 IQ  blir viewet "minIq" called */
                    clearInterval(id);
                    iqBarIndex = 1;
                    minIq();
                }
            }
        }
    }
}