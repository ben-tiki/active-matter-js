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

// color dictionary
var colors = {
    1: rgb(160, 0, 14),
	2: rgb(195, 0, 16),
	3: rgb(209, 0, 31),
	4: rgb(222, 10, 38),
	5: rgb(240, 30, 44),
	6: rgb(254, 44, 44),
	7: rgb(265, 68, 74),
	8: rgb(238, 107, 107),
	9: rgb(246, 150, 152),
	10:rgb(255, 203, 209),
    11:rgb(240, 240, 240),
    12:rgb(255, 255, 255),

};

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

        if (y > box_size) { return y - canvas.height; }
        else if (y < 0) { return y + canvas.height; }
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

        // calculate theta for each bird (if neibghbor)
        var sx = 0;
        for (var i = 0; i < number_birds; i++) {
            if (neighbors[i]) {
                sx += cos(theta[i]);

            }
        }

        var sy = 0;
        for (var i = 0; i < number_birds; i++) {
            if (neighbors[i]) {
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
    var neighbor_count = {};
    for (var b = 0; b < number_birds; b++) {

        // get the final distance between each bird and every other bird (x + y)
        var final_x_distances = x_positions.map(x => (x - x_positions[b]) ** 2);
        var final_y_distances = y_positions.map(y => (y - y_positions[b]) ** 2);
        var final_distance = final_x_distances.map((x, i) => (x + final_y_distances[i]));
        final_distance = final_distance.map((d) => d < interaction_radius ** 2 ? 1 : 0);

        // for each element in the dictionary, add 1 to the value if the bird is within interaction radius of any other bird
        for (var i = 0; i < number_birds; i++) {
            if (final_distance[i]) {
                if (neighbor_count[i] == undefined) {
                    neighbor_count[i] = 1;
                } else {
                    neighbor_count[i] += 1;
                }
            }}

        ctx.beginPath();
        ctx.arc(x_positions[b], y_positions[b], bird_size, 0, 2 * Math.PI);

        // map the number of neighbors to a color
        ctx.fillStyle = colors[neighbor_count[b]];

        ctx.fill();
        ctx.closePath();
    }

    time_elapsed += 1;

}
// -------------------------- FUNCTIONALITIES ----------------------
// add new bird on mouse coordinates on click
canvas.addEventListener("click", function (e) {
    x_positions.push(e.clientX);
    y_positions.push(e.clientY);
    theta.push(Math.random() * Math.PI * 2);
    vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
    vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
    number_birds += 1;
});

// make birds avoid mouse position on mousemove
canvas.addEventListener("mousemove", function (e) {
    var mouse_x = e.clientX;
    var mouse_y = e.clientY;
    var mouse_distances_x = x_positions.map(x => (x - mouse_x) ** 2);
    var mouse_distances_y = y_positions.map(y => (y - mouse_y) ** 2);
    var mouse_distance = mouse_distances_x.map((x, i) => (x + mouse_distances_y[i]));
    var mouse_neighbors = mouse_distance.map((d) => d < interaction_radius ** 2 ? true : false);

    // if bird is within interaction radius of mouse, make it avoid mouse
    for (var b = 0; b < number_birds; b++) {
        if (mouse_neighbors[b]) {

            // if mouse is coming from the right, substract from vector_x
            if (mouse_x > x_positions[b]) {
                vector_x[b] -= cos(theta[b]) * velocity;
            }

            // if mouse is coming from the left, add to vector_x
            else if (mouse_x < x_positions[b]) {
                vector_x[b] +=  cos(theta[b]) * velocity;
            }

            // if mouse is coming from the top, substract from vector_y
            if (mouse_y > y_positions[b]) {
                vector_y[b] -= sin(theta[b]) * velocity;
            }

            // if mouse is coming from the bottom, add to vector_y
            else if (mouse_y < y_positions[b]) {
                vector_y[b] += sin(theta[b]) * velocity;
            }
        }
    }
})

// -------------------------- ANIMATION ----------------------------
setInterval(function () {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < 1; index++) {

        // execute the main loop
        main();

    }

}, 10);
