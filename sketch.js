let area;
let colorFade;
let gaussFade;
const perlinIncrement = .005;
let perlinOffset = 0;
let randomShiftX1;
let randomShiftY1;
let randomShiftX2;
let randomShiftY2;
let randomShiftX3;
let randomShiftY3;
let side;
let xOffset;
let yOffset;

function setup() {
    createCanvas(800, 800);
    background(241);
}

function draw() {
  strokeJoin(ROUND);
  strokeCap(ROUND);

  noFill();
  stroke(151, 20);

  // Perlin noise texture in the left background
  for (let increment = 0; increment < 10; increment++) {
    for (let i = 0; i < 10; i++) {
      beginShape();
      for (let y = 0; y < height; y++) {
        let x = noise(perlinOffset)*width;
        vertex(x + i*10 - width/4, y);
        perlinOffset += perlinIncrement;
      }
      perlinOffset -= perlinIncrement*height;
      endShape();
      }
    perlinOffset += 10000;
  }

  stroke(151);
  fill(201);

  for (let xOff = 0; xOff < width; xOff += 50) {
    for (let yOff = 0; yOff < height; yOff += 50) {

      // As we move to the right, the likelihood that we skip an iteration increases.
      if ( random(100) < (xOff / width) * 100 ) { continue; };

      // Uniform distribution
      side = Math.floor(random(1,5));
      switch(side) {
        case 1:

          // bottom left triangles
          splitTriangle(
            xOff, yOff,
            xOff, yOff + 50,
            xOff + 50, yOff + 50,
            xOff
          );
          break;

        case 2:

          // top right triangles
          splitTriangle(
            xOff, yOff,
            xOff + 50, yOff,
            xOff + 50, yOff + 50,
            xOff
          );
          break;

        case 3:

          // bottom right triangles
          splitTriangle(
            xOff, yOff + 50,
            xOff + 50, yOff + 50,
            xOff + 50, yOff,
            xOff
          );
          break;

        case 4:

          // top left triangles
          splitTriangle(
            xOff, yOff,
            xOff, yOff + 50,
            xOff + 50, yOff,
            xOff
          );
          break;

        default:
          break;
      }
    }
  }

  // Gaussian texture in the right foreground
  stroke(221);
  for(let i = 0; i < 10; i++) {
    for (let y = 0; y < height; y++) {
      let x = randomGaussian(width*3/4, 100);
      line(x, y, x + Math.floor(random(5)), y);
    }
  }

  noLoop();
}

function splitTriangle(x1, y1, x2, y2, x3, y3, fade) {
  area = Math.abs((x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2);

  // Introduce color fade
  colorFade = map(fade, 0, width, 21, 241);
  fill(color(255-colorFade));
  stroke(color(colorFade));

  // Introduce shift
  gaussFade = map(fade, 0, width, 0, 5);
  randomShiftX1 = randomGaussian(0, gaussFade);
  randomShiftY1 = randomGaussian(0, gaussFade);
  randomShiftX2 = randomGaussian(0, gaussFade);
  randomShiftY2 = randomGaussian(0, gaussFade);
  randomShiftX3 = randomGaussian(0, gaussFade);
  randomShiftY3 = randomGaussian(0, gaussFade);

  if (area > 200) {
    triangle(
      x1 + randomShiftX1, y1 + randomShiftY1,
      x2 + randomShiftX2, y2 + randomShiftY2,
      x3 + randomShiftX3, y3 + randomShiftY3
    );
    side = Math.floor(random(1,4));
    switch(side) {
      case 1:
        splitTriangle(x1, y1, x2, y2, (x2+x3)/2, (y2+y3)/2, fade);
        splitTriangle(x1, y1, (x2+x3)/2, (y2+y3)/2, x3, y3, fade);
        break;
      case 2:
        splitTriangle(x1, y1, x2, y2, (x1+x3)/2, (y1+y3)/2, fade);
        splitTriangle((x1+x3)/2, (y1+y3)/2, x2, y2, x3, y3, fade);
        break;
      case 3:
        splitTriangle((x1+x2)/2, (y1+y2)/2, x2, y2, x3, y3, fade);
        splitTriangle(x1, y1, (x1+x2)/2, (y1+y2)/2, x3, y3, fade);
        break;
      default:
        break;
    }
  }
}
