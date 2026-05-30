let osc, playing, freq, amp;

let waveform = 'sawtooth';
let [width, height] = [1080/2, 1920/2]

function setup() {
  let cnv = createCanvas(width, height);

  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator(waveform);

  // Use degrees as units for angles
  angleMode(RADIANS);  
}

let diameter = width * 0.9;
let radius = diameter / 2;

function draw() {
  background(220)
  
  circle(width/2, height/2, diameter);
  /*textAlign(CENTER, CENTER);*/

  let angle = (HALF_PI - frameCount * 0.01) % TWO_PI;
  let perimeter = TWO_PI * radius

  let pos = {
    x: width/2 + cos(angle)*radius, 
    y: height/2 - sin(angle)*radius
  }

  init_size = textSize()
  textSize(16);
  text('XXX', pos.x-5, pos.y+5);
  textSize(init_size);
   
  let debug_data = [
    "perimter:" + str(perimeter),
    "angle:" + str(-1*angle),
    "walked:" + str(-1*angle*radius),
    "%walk:" + str((-1*angle*radius)/perimeter),
  ]

  percent_walked = (-1*angle*radius)/perimeter

  for (let index = 0; index < debug_data.length; index++) {
    text(debug_data[index], 20, index*20+60);
  }

  osc.freq((percent_walked * 440) + 220);

  if(frameCount%20 == 0){
    playOscillator();
  }
/*
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  //amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  //text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(percent_walked);
    //osc.amp(amp);
  }
    */
/*
  let angle = frameCount * 0.5;
  rotate(angle);

  // Draw a rectangle at coordinates (50, 0).
  rect(100, 100, 40, 20);
  */
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  osc.start();
  osc.amp(0.5, 0.1);
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.3);
  playing = false;
}
