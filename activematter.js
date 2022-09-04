// -------------------------- CANVAS ------------------------------
// load the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// makes the canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// add event listener for canvas resizing
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// -------------------------- MATH --------------------------------
// math functions
var cos = Math.cos,
    sin = Math.sin;
atan2 = Math.atan2;

function sum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
        return sum;
    }
}

// -------------------------- COLOR -------------------------------
// creates an rgb color based on input values
function rgb(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ["rgb(", r, ",", g, ",", b, ")"].join("");
}

// --------------------------- MAIN --------------------------------
// simulation parameters
var velocity = 2.5,
    noise = 0.5,
    box_size = canvas.width,
    interaction_radius = box_size / 50,
    number_birds = 500,
    bird_size = 2;

// take track of time elapsed
var time_elapsed = 0;

// bird positions
x_positions = Array.from({ length: number_birds }, () => Math.random() * box_size);
y_positions = Array.from({ length: number_birds }, () => Math.random() * box_size);

//  bird velocities
theta = Array.from({ length: number_birds }, () => Math.random() * Math.PI * 2);
var vector_x = theta.map(x => cos(x) * velocity)
var vector_y = theta.map(x => sin(x) * velocity)

// simulation main loop
function main() {

    // apply forces to each bird
    x_positions = x_positions.map((x, b) => x + vector_x[b]);
    y_positions = y_positions.map((y, b) => y + vector_y[b]);

    // make birds appear on the other side of the screen when they reach the edge
    x_positions = x_positions.map(x => {

        if (x > box_size) { return x - box_size; }
        else if (x < 0) { return x + box_size; }
        else { return x; }
    }
    );

    y_positions = y_positions.map(y => {

        if (y > box_size) { return y - box_size; }
        else if (y < 0) { return y + box_size; }
        else { return y; }
    }
    );

    // draw the birds
    var mean_theta = theta;
    for (var b = 0; b < number_birds; b++) {

        // calculate x and y distances between each bird and every other bird
        var x_distances = x_positions.map(x => (x - x_positions[b]) ** 2);
        var y_distances = y_positions.map(y => (y - y_positions[b]) ** 2);

        // get the distance between each bird and every other bird (x + y)
        var distance = x_distances.map((x, i) => (x + y_distances[i]));

        // check if each bird is within interaction radius of any other bird
        distance = distance.map(d => d == 0 ? interaction_radius ** 2 : d);

        // if bird at index b is within interaction radius other birds, true else false
        var neighbors = distance.map((d) => d < interaction_radius ** 2 ? true : false);

        // calculate theta for each bird (if neighbor)
        var sx = 0;
        var sy = 0;
        for (var i = 0; i < number_birds; i++) {
            if (neighbors[i]) {
                sx += cos(theta[i]);
                sy += sin(theta[i]);

            }
        }

        mean_theta[b] = atan2(sy, sx);
    }

    // add random movement to each bird
    theta = mean_theta.map(x => x + noise * (Math.random() - 0.5));

    // update the vectors for each bird
    vector_x = theta.map(x => cos(x) * velocity);
    vector_y = theta.map(x => sin(x) * velocity);

    // plot the birds on the canvas
    for (var b = 0; b < number_birds; b++) {

        ctx.beginPath();
        ctx.arc(x_positions[b], y_positions[b], bird_size, 0, 2 * Math.PI);

        ctx.fillStyle = rgb(
            Math.floor(100 * (1 - (x_positions[b] / canvas.width))),
            Math.floor(200 * (1 - (y_positions[b] / canvas.height))),
            Math.floor(250 * (1 - (x_positions[b] / canvas.width)))

        );
        ctx.fill();
        ctx.closePath();
    }

    time_elapsed += 1;

}

// -------------------------- ANIMATION ----------------------------
setInterval(function () {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < 1; index++) {

        // execute the main loop
        main();

    }

}, 10);
