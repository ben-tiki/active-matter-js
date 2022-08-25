// -------------------------- CANVAS ------------------------------
// contextualize the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// add event listener for canvas resizing
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// -------------------------- MATH --------------------------------
// math shorthand functions
var cos = Math.cos,
    sin = Math.sin;
    atan2 = Math.atan2;

// helper functions
function sum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
        return sum;
    }
}

// -------------------------- BIRD COLOR -----------------------------
// creates random color
function rgb(r, g, b){
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ["rgb(",r,",",g,",",b,")"].join("");
  }

// --------------------------- MAIN --------------------------------
// simulation parameters
var velocity = 3, 
    fluctuation = 0.5,  
    box_size = canvas.width,    
    interaction_radius = box_size / 50,          
    number_birds = 500,
    bird_size = 2;


// take track of time elapsed
var time_elapsed = 0;

// bird positions
x_positions = Array.from({length: number_birds}, () => Math.random() * box_size);
y_positions = Array.from({length: number_birds}, () => Math.random() * box_size);

//  bird velocities
theta = Array.from({length: number_birds}, () => Math.random() * Math.PI * 2);
var vector_x = theta.map(x => cos(x) * velocity)
var vector_y = theta.map(x => sin(x) * velocity)

// simulation main loop
function main() {

    x_positions = x_positions.map((x, b) => x + vector_x[b]);
    y_positions = y_positions.map((y, b) => y + vector_y[b]);

    x_positions = x_positions.map(x => {
        if (x > box_size) {
            return x - box_size;
        } else if (x < 0) {
            return x + box_size;
        } else {
            return x;
        }
    } );


    y_positions = y_positions.map(y => {
        if (y > box_size) {
            return y - box_size;
        } else if (y < 0) {
            return y + box_size;
        } else {
            return y;
        }
    } );

    var mean_theta = theta;
    for (var b = 0; b < number_birds; b++) {

        var x_distances = x_positions.map(x => (x - x_positions[b])**2);
        var y_distances = y_positions.map(y => (y - y_positions[b])**2);

        var distance = x_distances.map((x, i) => (x + y_distances[i]));

        distance = distance.map(d => d == 0 ? interaction_radius**2 : d);

        var neighbors = distance.map((d) => d < interaction_radius**2 ? true : false);

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

    theta = mean_theta.map(x => x + fluctuation*(Math.random()-0.5));

    vector_x = theta.map(x => cos(x) * velocity);
    vector_y = theta.map(x => sin(x) * velocity);
    

    for (var b = 0; b < number_birds; b++) {
        
        ctx.beginPath();
        ctx.arc(x_positions[b], y_positions[b], bird_size, 0, 2 * Math.PI);

        ctx.fillStyle = rgb(
            Math.floor(255 * (1 - (x_positions[b]  - time_elapsed / canvas.width))),
            Math.floor(255 * (1 - (y_positions[b] / canvas.height))),
            Math.floor(255 * (1 - (x_positions[b] / canvas.width)))

          );

        ctx.fill();
        ctx.closePath();
    }

    time_elapsed += 1;
            
    }


setInterval(function() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < 1; index++) {
    
    main();
    
    }

  }, 10);
         