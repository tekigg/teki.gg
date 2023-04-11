// tiles
const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 80 : 60;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();

// Wrap every letter in a span
var textWrappers = document.querySelectorAll('.ml16');
textWrappers.forEach(function(textWrapper) {
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  setTimeout(function(){ 
    anime.timeline({loop: false})
      .add({
        targets: '.ml16 .letter',
        translateY: [-300,0],
        opacity:[0, 1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 40 * i
      });
  }, 1000);
});

// coooooordssssssssss ---------------------------------------

// Select the <p> element with ID "coords"
const coords = document.getElementById('coords');

// Add a mousemove event listener to the document
document.addEventListener('mousemove', function(e) {
  // Get the mouse position relative to the viewport
  const x = e.clientX;
  const y = e.clientY;

  // Convert the mouse position to geographic coordinates
  const lat = convertToDMS(y, 'N', 'S');
  const lng = convertToDMS(x, 'E', 'W');

  // Update the content of the <p> element with the geographic coordinates
  coords.textContent = lat + ' ' + lng;
});

// Helper function to convert a number to degrees, minutes, and seconds
function convertToDMS(num, posSymbol, negSymbol) {
  const absNum = Math.abs(num);
  const degrees = Math.floor(absNum);
  const minutes = Math.floor((absNum - degrees) * 60);
  const seconds = Math.round(((absNum - degrees - minutes / 60) * 3600) * 10) / 10;
  const symbol = num >= 0 ? posSymbol : negSymbol;
  return degrees + '°' + minutes + '′' + seconds + '″' + symbol;
}

// TERMINAL CODDEESSS

const letters = "ABCDEFGHIJ0123456789!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~ ";

let interval = null;
let animationDone = true;

function animateText(target, oldText, newText) {
  let iteration = 0;
  animationDone = false;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    target.innerText = target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return oldText[index];
        }
        if(index >= oldText.length && index < iteration + newText.length) {
          return newText[index - oldText.length];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");
    
    if(iteration >= oldText.length + newText.length){ 
      clearInterval(interval);
      animationDone = true;
    }
    
    iteration += 1 / 1.5;
  }, 10);
}

const terminalText = document.querySelector(".terminal-text");

// Get the current date and time in the GMT+3 timezone
const now = new Date();
const options = { timeZone: "Europe/Moscow" };
const curDate = now.toLocaleDateString("en-US", options);
const curTime = now.toLocaleTimeString("en-US", options);

// Create the initial text string
const oldText = `CONNECTION OPERATIONAL 00 // [\nCURDATE: ${curDate}\nCURTIME: ${curTime}\nCURACTV: BUSY - STUDYING\n]`;
const newText = `New text\nAnother line of new text`;

animateText(terminalText, oldText, newText);

terminalText.onmouseover = event => {
  if (!animationDone) {
    return;
  }
  
  animateText(event.target, oldText, newText);
}
