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

// Text animation ---------------------------------

function animateText(topText, bottomText, outAnimationEnabled) {
  var textWrappers = document.querySelectorAll('.ml16');

  if (outAnimationEnabled) {
    anime.timeline({ loop: false })
      .add({
        targets: '.ml16 .letter',
        translateY: [0, 300],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1000,
        delay: (el, i) => 40 * i,
        complete: function () {
          setText(topText, bottomText);
          animateIn();
        }
      });
  } else {
    setText(topText, bottomText);
    animateIn();
  }

  function setText(topText, bottomText) {
    textWrappers[0].innerHTML = topText.replace(/\S/g, "<span class='letter'>$&</span>");
    textWrappers[1].innerHTML = bottomText.replace(/\S/g, "<span class='letter'>$&</span>");
  }

  function animateIn() {
    anime.timeline({ loop: false })
      .add({
        targets: '.ml16 .letter',
        translateY: [-300, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 40 * i
      });
  }
}
setTimeout(function () {
  animateText("o(*￣︶￣*)ブ↗", "HELLO, HELLO!", false)

}, 1000);



// coooooordssssssssss ---------------------------------------

const coords = document.getElementById('coords');

document.addEventListener('mousemove', function (e) {
  const x = e.clientX;
  const y = e.clientY;
  const lat = convertToDMS(y, 'N', 'S');
  const lng = convertToDMS(x, 'E', 'W');
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

// TERMINAL CODDEESSS -------------------------------

var IsTimeState = true

function getTimeInTimezone() {
  const date = new Date();
  const options = {
    timeZone: 'Asia/Baghdad',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return date.toLocaleString('en-US', options);
}

function randomizeText(newText) {
  const terminalText = document.querySelector('.terminal-text');
  const oldText = terminalText.innerText;
  const oldLetters = oldText.split('');
  const newLetters = newText.split('');
  const randomLetters = [];

  if (oldText !== newLetters.join('')) {
    for (let i = 0; i < newLetters.length; i++) {
      if (oldLetters[i] !== newLetters[i]) {
        randomLetters.push(i);
      }
    }
  } else {
    for (let i = 0; i < oldLetters.length; i++) {
      randomLetters.push(i);
    }
  }

  let j = 0;
  const intervalId = setInterval(() => {
    for (let k = 0; k < randomLetters.length; k++) {
      const index = randomLetters[k];
      oldLetters[index] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    terminalText.innerText = oldLetters.join('');

    j++;

    if (j === 10) {
      if (newLetters.length < oldLetters.length) {
        const excessCount = oldLetters.length - newLetters.length;
        const batchSize = Math.ceil(excessCount / 10);
        for (let k = 0; k < excessCount; k++) {
          if (k % batchSize === 0) {
            const index = randomLetters[k];
            oldLetters[index] = '';
          }
        }
      }

      for (let k = 0; k < randomLetters.length; k++) {
        const index = randomLetters[k];
        oldLetters[index] = newLetters[index];
      }

      terminalText.innerText = newLetters.join('');

      clearInterval(intervalId);
    }
  }, 50);
}

function updateTime() {
  const ping = document.querySelector('.ping');

  const now = new Date();

  const optionsDate = { timeZone: "Asia/Baghdad" };
  const optionsTime = { timeZone: "Asia/Baghdad", hour: 'numeric', minute: 'numeric' };

  const curDate = now.toLocaleDateString("en-US", optionsDate);
  const curTime = now.toLocaleTimeString("en-US", optionsTime);

  const activities = [
    { start: 3, end: 11, value: "ASLEEP - ZZZ", color: "yellow" },
    { start: 11, end: 17, value: "BUSY - STUDYING", color: "red" },
    { start: 17, end: 19, value: "FREE", color: "green" },
    { start: 19, end: 24, value: "BUSY - STUDYING", color: "red" },
    { start: 0, end: 3, value: "FREE", color: "green" }
  ];

  let curActv = "UNKNOWN";
  for (let i = 0; i < activities.length; i++) {
    const { start, end, value, color } = activities[i];
    const curHour = now.toLocaleTimeString("en-US", { hour: '2-digit', hour12: false });
    if (curHour >= start && curHour < end) {
      curActv = value;
      ping.load(`public-assets/animation/Ping-${color}.json`)
      break;
    }
  }

  const oldText = `CONNECTION OPERATIONAL 00 // [\nCURDATE: ${curDate}\nCURTIME: ${curTime}\nCURACTV: ${curActv}\n]\n\nCurrently listening to...`;
  randomizeText(oldText);
}

var LastMinute = ''

function updateTimeInTerminal() {
  const now = new Date();
  if (LastMinute !== now.getMinutes() && IsTimeState) {
    updateTime();
    LastMinute = now.getMinutes();
  } else {
    return;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(updateTimeInTerminal, 1000);

// copy discord id
function copyToClipboard(str) {
  const tempInput = document.createElement("input");
  tempInput.value = str;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// 3D effect
const pre = document.querySelector("#terminal");
document.addEventListener("mousemove", (e) => {
  rotateElement(e, pre);
});

function rotateElement(event, element) {
  const x = event.clientX;
  const y = event.clientY;
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;
  const offsetX = ((x - middleX) / middleX) * 10;
  const offsetY = ((y - middleY) / middleY) * 10;
  element.style.setProperty("--rotateX", offsetX + "deg");
  element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}

// button rotate
const button = document.getElementById('button');
const buttonDiscord = document.getElementById('discord');
const tooltip = document.getElementById('tooltip');
const terminalText = document.querySelector('.terminal-text');
const socials = document.getElementById('socials')
const discordID = "Teki#0001"
const style = window.getComputedStyle(terminalText);
const spotify = document.getElementById('spotify-player-container')

function animateIn() {
  IsTimeState = false
  fontSize = style.getPropertyValue("font-size").slice(0, -2);
  animateText("`(*>﹏<*)′↗", "ABOUT ME!", true)
  randomizeText(`Yahallo!~ I'm Teki! ૮ ˶ᵔ ᵕ ᵔ˶ ა\nA graphic designer, VFX artist, beginner developer and streamer!\nI'm more than open to talk about anything design, psychology, or gaming related! Don't be afraid to dm me!~`)
  spotify.style.opacity = "0%"
  spotify.style.marginTop = "-100px"
  spotify.style.visibility = "hidden"
  spotify.classList.remove('hoverPlayer');

  socials.style.opacity = "100%"
  socials.style.marginTop = "0px"
  socials.style.pointerEvents = "all"
  socials.style.cursor = "pointer"
  terminalText.style.transition = "1s"
  terminalText.style.fontSize = `${parseInt(fontSize) + 2}px`
}

function animateOut() {
  fontSize = style.getPropertyValue("font-size").slice(0, -2);
  animateText("o(*￣︶￣*)ブ↗", "HELLO, HELLO!", true)


  terminalText.style.fontSize = "15px"
  socials.style.opacity = "0%"
  socials.style.marginTop = "100px"
  IsTimeState = true;
  LastMinute = 0;
  updateTime();
  socials.style.pointerEvents = "none"
  socials.style.cursor = "none"
  terminalText.style.fontSize = `${parseInt(fontSize) - 2}px`
  spotify.style.opacity = "100%"
  spotify.style.marginTop = "0px"
  spotify.style.visibility = "visible"
  spotify.classList.add('hoverPlayer');
}

let isCooldownActive = false;
let isButtonActive = false;
let angle = 0;

function getAngle() {
  const transform = window.getComputedStyle(button).getPropertyValue("transform");
  const matrix = transform.match(/^matrix\((.+)\)$/);
  let angle = 0;
  if (matrix) {
    const matrixValues = matrix[1].split(',').map(parseFloat);
    angle = Math.round(Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI));
  }
  return angle
}

function animateButton(degrees) {
  anime({
    targets: button,
    rotate: degrees,
    duration: 1000,
    easing: 'linear',
    complete: function () {
      angle = degrees % 360;
      animateButton(angle + 360);
    }
  });
}

button.addEventListener('click', () => {
  if (!isCooldownActive) {
    isCooldownActive = true;

    const initialAngle = getAngle();
    button.style.opacity = "60%";
    isButtonActive ? (isButtonActive = false, animateOut()) : (isButtonActive = true, animateIn());
    animateButton(initialAngle + 360);
    setTimeout(() => {
      isCooldownActive = false;
      button.style.opacity = "100%";
    }, 3000);
  }
});

const tooltipTexts = ['COPIED!', 'DOUBLE COPY!', 'TRIPLE COPY!', 'DOMINATING!', 'RAMPAGE!', 'MEGA COPY!', 'UNSTOPPABLE!', 'WICKED SICK!', 'MONSTER COPY!', 'GODLIKE!!', 'BEYOND GODLIKE!!!!'];
let clicks = 0;
let timeoutId;

buttonDiscord.addEventListener('click', () => {
  copyToClipboard(discordID);
  tooltip.classList.remove('tooltip');
  tooltip.innerText = tooltipTexts[clicks % tooltipTexts.length];
  tooltip.offsetWidth;
  tooltip.classList.add('tooltip');
  clicks++;

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    clicks = 0;
  }, 2000);
});

// lottie animation trigger
let myPlayer = document.getElementById("mobile-support-player");
let mediaQuery = window.matchMedia("(max-width: 600px) or (max-height: 550px)");

mediaQuery.addListener(function () {
  if (mediaQuery.matches) {
    myPlayer.play();
  } else {
    myPlayer.stop();
  }
});

function updateSongAndArtist() {
  fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=iiiklox&api_key=e66a732fdbce384356a4fb2ea2dba5f8&format=json&limit=1", {
  })
    .then(response => response.json())
    .then(data => {
      const track = data.recenttracks.track[0];
      const isPaused = !track['@attr'] || !track['@attr'].nowplaying;
      const songName = track.name;
      if (!isPaused) {
        document.getElementById("spotify-player-container").href = `https://open.spotify.com/search/${songName}-${track.artist['#text']}`;
        document.getElementById("song").textContent = songName;
        document.getElementById("artist").textContent = track.artist['#text'];
        document.getElementById("cover").src = track.image[2]["#text"];
      } else {
        // show placeholder message
        document.getElementById("spotify-player-container").href = "https://spotify.com";
        document.getElementById("song").textContent = "Enjoying Silence";
        document.getElementById("artist").textContent = "By Themselves";
        document.getElementById("cover").src = "https://cdn.discordapp.com/emojis/911233187118723112.gif?size=128&quality=lossless";
      }
    })
    .catch(error => console.error(error));
}

updateSongAndArtist();

setInterval(updateSongAndArtist, 10000);
