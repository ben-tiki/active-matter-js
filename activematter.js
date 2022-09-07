// -------------------------- MATH --------------------------------
// math functions and constants
var cos = Math.cos,
    sin = Math.sin,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,p
    PI = Math.PI;

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

// ----------------------- ANIMATION OPTIONS -----------------------
// animation options
var show_interaction_radius = false,
    paused = false,
    show_menu = true,
    show_status = false,
    focus = false,
    focus_bird = 0,
    predator_exists = false;

// --------------------------- MAIN --------------------------------
// simulation parameters
var velocity = 1.5,
    noise = 0.5,
    box_size = canvas.width,
    interaction_radius = 25,
    number_birds = 250,
    bird_size = 5;

// take track of time elapsed
var time_elapsed = 0;

// initialize empty arrays
x_positions = [];
y_positions = [];
theta = [];
vector_x = [];
vector_y = [];

for(var i = 0; i < number_birds; i++) {

    // bird positions
    x_positions.push(Math.random() * canvas.width);
    y_positions.push(Math.random() * canvas.height);

    // bird velocities
    theta.push(Math.random() * 2 * PI);
    vector_x.push(velocity * cos(theta[i]));
    vector_y.push(velocity * sin(theta[i]));

}

// simulation main loop
function main() {

    // clear the canvas(from the previous frame)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var b = 0; b < number_birds; b++) {

        // apply forces to each bird
        x_positions[b] += vector_x[b];
        y_positions[b] += vector_y[b];

        // make birds appear on the other side of the screen when they reach the edge
        if (x_positions[b] > canvas.width) { x_positions[b] =  x_positions[b] - canvas.width; }
        else if (x_positions[b]< 0) { x_positions[b] =  x_positions[b] + canvas.width; }     
        
        if (y_positions[b] > canvas.height) { y_positions[b] =  y_positions[b] - canvas.height; }
        else if (y_positions[b] < 0) { y_positions[b] =  y_positions[b] + canvas.height; }

    }

    var mean_theta = theta;
    for(var b = 0; b < number_birds; b++) {

        // draw the birds
        sx = 0;
        sy = 0;
        neighbor_count = 0;

        for (var i = 0; i < number_birds; i++) {

            // calculate x and y distances between each bird and every other bird
            var distance = ((x_positions[i] - x_positions[b]) ** 2) + ((y_positions[i] - y_positions[b]) ** 2);

            // if the distance is less than the interaction radius, add the bird to the neighbors array
            // if the distance is 0 (the bird is itself), add it to the neighbors array
            if ((distance < interaction_radius ** 2) && (distance > 0)) { neighbor = true; }

            // if the bird is not a neighbor, add a false to the neighbors array
            else {neighbor = false; }

            // calculate theta for each bird (if neighbor)
            if (neighbor == true) {
                sx += cos(theta[i]);
                sy += sin(theta[i]);
                neighbor_count += 1;
            }
            
        }

        mean_theta[b] = atan2(sy, sx);

        // add random movement to each bird
        theta[b] = mean_theta[b] + (Math.random() - 0.5) * noise;

        // update the vectors for each bird
        vector_x[b] = velocity * cos(theta[b]);
        vector_y[b] = velocity * sin(theta[b]);

        // draw the bird as a triangle
        ctx.beginPath();
        ctx.moveTo(x_positions[b] + bird_size * 2.5 * cos(theta[b]), y_positions[b] + bird_size * 2.5 * sin(theta[b]));
        ctx.lineTo(x_positions[b] + bird_size * cos(theta[b] + PI / 2), y_positions[b] + bird_size * sin(theta[b] + PI / 2));
        ctx.lineTo(x_positions[b] + bird_size * cos(theta[b] - PI / 2), y_positions[b] + bird_size * sin(theta[b] - PI / 2));

        // map the number of neighbors to a color
        ctx.fillStyle = colors[neighbor_count];
        ctx.fill();
        ctx.closePath();

        if(show_interaction_radius) {
            // show interaction radius as a dashed circle
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.arc(x_positions[b], y_positions[b], interaction_radius, 0, 2 * Math.PI);
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.closePath();
        }

    }
    
    requestAnimationFrame(main);
    showMenu();
    showStatus();
    showFocus(neighbor_count);
    // predator();
    
    time_elapsed += 1;

}

// // -------------------------- ANIMATION ----------------------------
// setInterval(function () {

//     // if pause is false, run the main loop
//     if (!pause) {
        
//         // clear the canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let index = 0; index < 1; index++) {
//             // execute the main loop
//             main();
//         }

//     }

// }, 10);
// requestAnimationFrame(main);
// request animationframe if pause is false
if (!paused) {
    requestAnimationFrame(main);
}

// if paused is false, run the main loop

