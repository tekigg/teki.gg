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
var textWrapper = document.querySelector('.ml16');
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
  });}, 1000);

