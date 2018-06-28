const HEIGHT = 800;
const WIDTH = 800;
var side = 0;
var xOffset = 0;
var yOffset = 0;
var area = 0;
var randomShiftX1 = 0;
var randomShiftY1 = 0;
var randomShiftX2 = 0;
var randomShiftY2 = 0;
var randomShiftX3 = 0;
var randomShiftY3 = 0;
var shiftSize = 3;
var border = 50;
var mappedFade = 0;
var xSubdivisions = 16;
var ySubdivisions = 16;

function setup() {
    createCanvas(WIDTH + border, HEIGHT + border);
    background(241);
    scale()
}

function draw() {

    stroke(220);
    strokeJoin(ROUND);
    strokeCap(ROUND);
    // rect(border/2, border/2, WIDTH, HEIGHT);

    for (var xOff = border; xOff < WIDTH; xOff += (WIDTH/xSubdivisions)) {
        translate(WIDTH/xSubdivisions, 0);
        for (var yOff = border; yOff < HEIGHT; yOff += (HEIGHT/ySubdivisions)) {
            translate(0, HEIGHT/ySubdivisions);
            if (random(100) < ((xOff * 100 / WIDTH) - 10)) { continue; };
            side = Math.floor(random(1,5));

            if (xOff <= WIDTH/3) {
                switch(side) {
                    case 1:
                        // bottom left triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            xOff
                        )
                        break;
                    case 2:
                        // top right triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            xOff
                        )
                        break;
                    case 3:
                        // bottom right triangles
                        splitTriangle(
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            xOff
                        )
                        break;
                    case 4:
                        // top left triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            xOff
                        )
                        break;
                    default:
                        break;
                }
            }
            if (xOff > WIDTH/3 && xOff < WIDTH/2) {
                push();
                rotate(random(-1, 1)*PI/15);
                switch(side) {
                    case 1:
                        // bottom left triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    case 2:
                        // top right triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    case 3:
                        // bottom right triangles
                        splitTriangle(
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    case 4:
                        // top left triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    default:
                        break;
                }
            }
            if (xOff > WIDTH/2) {
                push();
                rotate(random()*PI/2);
                switch(side) {
                    case 1:
                        // bottom left triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    case 2:
                        // top right triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    case 3:
                        // bottom right triangles
                        splitTriangle(
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    case 4:
                        // top left triangles
                        splitTriangle(
                            random(0,5), random(0,5),
                            random(0,5), HEIGHT/ySubdivisions + random(0,5),
                            WIDTH/xSubdivisions + random(0,5), random(0,5),
                            xOff
                        )
                        pop();
                        break;
                    default:
                        break;
                }
            }
            i = 0;
        }
        translate(0, -HEIGHT + border);
    }

    noLoop();
}

function splitTriangle(x1, y1, x2, y2, x3, y3, fade) {
    area = Math.abs((x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2);

    // good contrast on this fade pattern
    mappedFade = map(fade, 50, WIDTH, 21, 241)
    fill(color(mappedFade, 150));
    stroke(255 - mappedFade + randomGaussian(0, 20));

    // randomShiftX1 = random(-shiftSize, shiftSize);
    // randomShiftY1 = random(-shiftSize, shiftSize);
    // randomShiftX2 = random(-shiftSize, shiftSize);
    // randomShiftY2 = random(-shiftSize, shiftSize);
    // randomShiftX3 = random(-shiftSize, shiftSize);
    // randomShiftY3 = random(-shiftSize, shiftSize);

    randomShiftX1 = randomGaussian(0, shiftSize);
    randomShiftY1 = randomGaussian(0, shiftSize);
    randomShiftX2 = randomGaussian(0, shiftSize);
    randomShiftY2 = randomGaussian(0, shiftSize);
    randomShiftX3 = randomGaussian(0, shiftSize);
    randomShiftY3 = randomGaussian(0, shiftSize);

    if (area > 200) {
        triangle(
            x1 + randomShiftX1, y1 + randomShiftY1,
            x2 + randomShiftX2, y2 + randomShiftY2,
            x3 + randomShiftX3, y3 + randomShiftY3
        );
        side = Math.floor(random(1,4));
        switch(side) {
            case 1:
                splitTriangle(x1, y1, x2, y2, (x2+x3)/2, (y2+y3)/2);
                splitTriangle(x1, y1, (x2+x3)/2, (y2+y3)/2, x3, y3);
                break;
            case 2:
                splitTriangle(x1, y1, x2, y2, (x1+x3)/2, (y1+y3)/2);
                splitTriangle((x1+x3)/2, (y1+y3)/2, x2, y2, x3, y3);
                break;
            case 3:
                splitTriangle((x1+x2)/2, (y1+y2)/2, x2, y2, x3, y3);
                splitTriangle(x1, y1, (x1+x2)/2, (y1+y2)/2, x3, y3);
                break;
            default:
                break;
        }
    }
}
