// -------------------------- MATH --------------------------------
// math functions and constants
const { cos, sin, atan2, sqrt, PI, random, floor, pow } = Math;

function sum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
        return sum;
    }
}

// -------------------------- COLOR -------------------------------
// creates an rgb color based on input numerical values
function rgb(r, g, b) {
    r = floor(r);
    g = floor(g);
    b = floor(b);
    return ["rgb(", r, ",", g, ",", b, ")"].join("");
}

// color dictionary for the birds (depending on neighbors)
var neighborColors = {
    0: rgb(120, 0, 0),
    1: rgb(160, 0, 14),
	2: rgb(195, 0, 16),
	3: rgb(209, 0, 31),
	4: rgb(222, 10, 38),
	5: rgb(240, 30, 44),
	6: rgb(254, 44, 44),
	7: rgb(265, 68, 74),
	8: rgb(238, 107, 107),
	9: rgb(246, 150, 152),
	10: rgb(255, 203, 209),
    11: rgb(240, 240, 240),
    12: rgb(255, 255, 255),
};

// create a random color (all spectrum)
function createRandomColor() {
    let r = floor(random() * 255);
    let g = floor(random() * 255);
    let b = floor(random() * 255);
    return rgb(r, g, b);
}

// create an array (n) of random colors
function createRandomColors(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
        array.push(createRandomColor());
    }
    return array;
}

// ---------------------------- HELPERS ----------------------------
// apply separation to the birds
function separateBirds(b, x_positions, y_positions) {
    for(var i = 0; i < number_birds; i++) {
        if (i != b) {
            var distance = sqrt((x_positions[b] - x_positions[i]) ** 2 + (y_positions[b] - y_positions[i]) ** 2);
            if (distance < separation) {
                // push the bird away from the neighbor
                x_positions[b] += (x_positions[b] - x_positions[i]) / distance;
                y_positions[b] += (y_positions[b] - y_positions[i]) / distance;
            }
        }
    }
}

// check for wall collisions and make the bird bounce
function travelSide(b, x_positions, y_positions) {
     // make birds appear on the other side of the screen when they reach the edge
     if (x_positions[b] > canvas.width) { x_positions[b] =  x_positions[b] - canvas.width; }
     else if (x_positions[b] < 0) { x_positions[b] =  x_positions[b] + canvas.width; }     
     
     if (y_positions[b] > canvas.height) { y_positions[b] =  y_positions[b] - canvas.height; }
     else if (y_positions[b] < 0) { y_positions[b] =  y_positions[b] + canvas.height; }
}

function collideWall(b, x_positions, y_positions) {
    // check for wall collisions and make the bird bounce
    // bird sould (1) bounce off the wall and (2) change direction
    if (x_positions[b] > canvas.width) {
        x_positions[b] = canvas.width / 1.1;
        vector_x[b] = -vector_x[b];
    }
    else if (x_positions[b] < 0) {
        x_positions[b] = 0;
        vector_x[b] = -vector_x[b];
    }
    if (y_positions[b] > canvas.height) {
        y_positions[b] = canvas.height;
        vector_y[b] = -vector_y[b];
    }
    else if (y_positions[b] < 0) {
        y_positions[b] = 0;
        vector_y[b] = -vector_y[b];
    }
    
 


}


function followMouse(b) {
  canvas.addEventListener("mousclick", function (event) {

    for(var i = 0; i < number_birds; i++) {
    
    // get the mouse position
    mouse_x = event.clientX;
    mouse_y = event.clientY;

    var dx = mouse_x - x_positions[i];
    var dy = mouse_y - y_positions[i];

    theta[i] = atan2(dy, dx);
    vector_x[i] = velocity * cos(theta[i]);
    vector_y[i] = velocity * sin(theta[i]);

    }

  });
}

function getQuadrant(focus_bird) {
    if (x_positions[focus_bird] > canvas.width / 2) {
        if (y_positions[focus_bird] > canvas.height / 2) {
        return 4;
        } else {
        return 1;
        }
    } else {
        if (y_positions[focus_bird] > canvas.height / 2) {
        return 3;
        } else {
        return 2;
        }
    }
}

// ---------------------------- SPAWN OPTIONS --------------------------------
// spawn options
function spawnRandom() {
    for (var i = 0; i < number_birds; i++) {
        x_positions[i] = random() * canvas.width;
        y_positions[i] = random() * canvas.height;
    }
}

function spawnCircle() {
    for (var i = 0; i < number_birds; i++) {
        x_positions[i] = canvas.width / 2 + 200 * cos(i * 2 * PI / number_birds);
        y_positions[i] = canvas.height / 2 + 200 * sin(i * 2 * PI / number_birds);
    }
}

function spawnSinWave() {
    for(var i = 0; i < number_birds; i++) {
    x_positions[i] = i * 10;
    y_positions[i] = canvas.width / 4 + 100 * sin(x_positions[i] / 100);
}
}

function spawnGrid() {
    var x = 0,
        y = 0,
        x_increment = canvas.width / sqrt(number_birds),
        y_increment = canvas.height / sqrt(number_birds);
        
    for(var i = 0; i < number_birds; i++) {
        x_positions[i] = x;
        y_positions[i] = y;
        x += x_increment;
        if (x > canvas.width) {
            x = 0;
            y += y_increment;
        }
    }
}


function spawnOval() {
    var phi = (1 + sqrt(5)) / 2;
    var das = 0;
    for(var i = 0; i < number_birds; i++) {
        das += 2 * PI / phi;
        x_positions[i] = canvas.width / 2 + (canvas.width / 2 - 100) * cos(das);
        y_positions[i] = canvas.height / 2 + (canvas.height / 2 - 100) * sin(das);
    }
}

// spawn as a traditional cartoon heart
function spawnRhomboid() {
    var das = 0;
    for(var i = 0; i < number_birds; i++) {
        das += 2 * PI / 1.618;
        x_positions[i] = canvas.width / 2 + (canvas.width / 2 - 100) * cos(das) * cos(das) * cos(das);
        y_positions[i] = canvas.height / 2 + (canvas.height / 2 - 100) * sin(das) * sin(das) * sin(das);
    }
}


// spawn a rt-a sin(t) spirograph
function spawnSpirograph(){

    // use the formula x = (R+r)cos(t) - rcos((R+r)t/r)
    // and y = (R+r)sin(t) - rsin((R+r)t/r)
    // where R is the radius of the outer circle
    // and r is the radius of the inner circle
    // and t is the angle of the inner circle

    // set the radius of the outer circle
    const R = 1000;
    // set the radius of the inner circle
    const r = 50;
    // set the angle of the inner circle
    var t = 0;
    n = number_birds;

    for(var i = 0; i < n; i++) {
        x_positions[i] = (R+r) * cos(t) - r * cos((R+r) * t/r);
        y_positions[i] = (R+r) * sin(t) - r * sin((R+r) * t/r);
        t += 2 * PI / n;
    }


}


const spawn_options_dict = {
    "Random": spawnRandom,
    "Circle": spawnCircle,
    "Sin Wave": spawnSinWave,
    "Grid": spawnGrid,
    "Oval": spawnOval,
    "Rhomboid": spawnRhomboid,
    "Spirograph": spawnSpirograph,
};


