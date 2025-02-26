let rollButton;
let resultText = "Press Roll to get a Regalia!";
let rolling = false;
let rollTime = 0;
let finalResult = "";
const rollDuration = 2000;
let images = [];
let objects = [];
let bgMusic;

const regaliaChances = [
  { name: "Useless Regalia", chance: 1 / 6 },
  { name: "Basic Regalia", chance: 1 / 15 },
  { name: "Useful Regalia", chance: 1 / 40 },
  { name: "Good Regalia", chance: 1 / 75 },
  { name: "Amazing Regalia", chance: 1 / 150 },
  { name: "No Regalia", chance: 1 - (1 / 6 + 1 / 15 + 1 / 40 + 1 / 75 + 1 / 150) }
];

function preload() {
  images.push(loadImage("artworks-vog58LBUoWgkjgPZ-6Ru4Hg-t500x500.jpg"));
  images.push(loadImage("knorp.png"));
  images.push(loadImage("luna.png"));
  images.push(loadImage("elias.png"));
  bgMusic = loadSound("wii.mp3");
}

function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER, CENTER);
  textSize(50);
  rollButton = createButton("Roll");
  rollButton.position(width / 2 - 50, height - 100);
  rollButton.mousePressed(startRolling);
  bgMusic.loop();
  
  for (let i = 0; i < images.length; i++) {
    objects.push({
      x: random(width - 100),
      y: height - 150,
      speedX: random(3, 6) * (random() > 0.5 ? 1 : -1),
      speedY: random(-6, -3)
    });
  }
}

function draw() {
  background(10);
  drawRainbowText("Made by Dafik", width / 2, 50);
  fill(255);
  textSize(70);
  
  if (rolling) {
    let randomIndex = floor(random(regaliaChances.length));
    resultText = regaliaChances[randomIndex].name;
    fill(random(100, 255), random(100, 255), random(100, 255));
    textSize(random(50, 80));
  } else {
    textSize(100);
    fill(255, 215, 0);
  }
  
  text(resultText, width / 2, height / 2);
  drawRollingEffect();
  moveAndBounceObjects();
}

function startRolling() {
  if (!rolling) {
    rolling = true;
    rollTime = millis();
    setTimeout(() => {
      rolling = false;
      finalResult = getRegalia();
      resultText = finalResult;
    }, rollDuration);
  }
}

function getRegalia() {
  let roll = random();
  let accumulatedChance = 0;
  
  for (let i = regaliaChances.length - 1; i >= 0; i--) {
    accumulatedChance += regaliaChances[i].chance;
    if (roll < accumulatedChance) {
      return regaliaChances[i].name;
    }
  }
  return "No Regalia"; 
}

function drawRollingEffect() {
  if (rolling) {
    for (let i = 0; i < 10; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(10, 50);
      fill(random(100, 255), random(100, 255), random(100, 255), 150);
      ellipse(x, y, size, size);
    }
  }
}

function moveAndBounceObjects() {
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    if (images[i]) {
      image(images[i], obj.x, obj.y, 100, 100);
    }
    
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    
    if (obj.x <= 0 || obj.x >= width - 100) {
      obj.speedX *= -1;
    }
    
    if (obj.y >= height - 150) {
      obj.speedY = -random(5, 10);
    }
    obj.speedY += 0.3;
  }
}

function drawRainbowText(textString, x, y) {
  let colors = [
    color(255, 0, 0), color(255, 165, 0), color(255, 255, 0),
    color(0, 255, 0), color(0, 0, 255), color(75, 0, 130), color(148, 0, 211)
  ];
  
  let textSizeVar = 70;
  textSize(textSizeVar);
  let spacing = textSizeVar * 0.7;
  let startX = x - (textString.length * spacing) / 2;
  
  for (let i = 0; i < textString.length; i++) {
    fill(colors[i % colors.length]);
    text(textString[i], startX + i * spacing, y);
  }
}
