// ----------------------- ANIMATION OPTIONS -----------------------
var paused = false,
    show_menu = false,
    show_status = false,
    show_focus = false,
    focus_bird = 0,
    random_colors = false,

    separation = 0,
    follow_mouse = true,
    wall_collision = false,
    start_position = "Grid",

    show_interaction_radius = false,
    trail_option = "soft",
    color_option = "time";

// --------------------------- MAIN --------------------------------
// simulation parameters
var velocity = 1.5,
    noise = 0.5,
    box_size = canvas.width,
    interaction_radius = 30,
    number_birds = 1500,
    bird_size = 1.5;

// take track of time elapsed
var time_elapsed = 0;

// initialize empty arrays
x_positions = [];
y_positions = [];
theta = [];
vector_x = [];
vector_y = [];

if (start_position in spawn_options_dict) {
  spawn_options_dict[start_position]();
}

for (let b = 0; b < number_birds; b++) {
  theta[b] = Math.random() * Math.PI * 2;
  vector_x[b] = Math.cos(theta[b]) * velocity;
  vector_y[b] = Math.sin(theta[b]) * velocity;
}

// // populate arrays with initial values
// for(var i = 0; i < number_birds; i++) {

//     // // bird positions
//     x_positions.push(random() * canvas.width);
//     y_positions.push(random() * canvas.height);

//     // bird directions
//     theta.push(random() * 2 * PI);
//     vector_x.push(velocity * cos(theta[i]));
//     vector_y.push(velocity * sin(theta[i]));

// }



// // position the birds as a circle
// for(var i = 0; i < number_birds; i++) {

//     x_positions[i] = canvas.width / 2 + 100 * cos(i * 2 * PI / number_birds);
//     y_positions[i] = canvas.height / 2 + 100 * sin(i * 2 * PI / number_birds);

// }
color_array = [];

  // create an array of random colors of length number_birds
  for (var i = 0; i < number_birds; i++) {
    color_array.push("hsl(" + random() * 360 + ", 100%, 50%)");
}
// simulation main loop
function main() {
  // ----------------------- PAUSE -------------------------------
  if (paused) {
    return;
  }

  // ----------------------- TRAIL -------------------------------
  switch (trail_option) {
    case "soft":
      // clear the canvas with a low opacity (birds leave a soft trail)
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;

    case "hard":
      // dont clear the canvas (birds leave a hard trail)
      break;

    default:
      // clear the canvas (normal animation)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // ----------------------- BIRDS -------------------------------
  // take track of amount of neighbors for each bird
  neighbor_array = [];
  is_neighbor_with = [];

  // create neighbor_dict which will store: the bird's index, the bird's amount of neighbors, and the index of the birds that are its neighbors
  neighbor_dict = {};

  for (var b = 0; b < number_birds; b++) {
    // apply forces to each bird
    x_positions[b] += vector_x[b];
    y_positions[b] += vector_y[b];

    // ------------------------- SEPARATION ------------------------
    // if birds are too close to each other, separate them gently (to avoid overlap)
    if (separation > 0) {
      separateBirds(b, x_positions, y_positions);
    }

    // ------------------------- WALL COLLISION --------------------
    // birds either travel through the walls or bounce off them
    switch (true) {
      case wall_collision:
        collideWall(b, x_positions, y_positions);
        break;
      default:
        travelSide(b, x_positions, y_positions);
    }
  }

  // --------------------- FOLLOW MOUSE --------------------------
  if (follow_mouse) {
    followMouse(b);
  }

  var mean_theta = theta;
  for (var b = 0; b < number_birds; b++) {
    // draw the birds
    sx = 0;
    sy = 0;
    neighbor_count = 0;

    for (var i = 0; i < number_birds; i++) {
      // calculate x and y distances between each bird and every other bird
      var distance = (x_positions[i] - x_positions[b]) ** 2 + (y_positions[i] - y_positions[b]) ** 2;

      // if the distance is less than the interaction radius, add the bird to the neighbors array
      // if the distance is 0 (the bird is itself), add it to the neighbors array
      if (distance < interaction_radius ** 2 && distance > 0) {
        neighbor = true;
      }

      // if the bird is not a neighbor, add a false to the neighbors array
      else {
        neighbor = false;
      }

      // calculate theta for each bird (if neighbor)
      if (neighbor == true) {
        sx += cos(theta[i]);
        sy += sin(theta[i]);
        neighbor_count += 1;


      }
      
    }

   

    //neighbor array
    neighbor_array[b] = neighbor_count;

    mean_theta[b] = atan2(sy, sx);

    // add random movement to each bird
    theta[b] = mean_theta[b] + (random() - 0.5) * noise;

    // update the vectors for each bird
    vector_x[b] = velocity * cos(theta[b]);
    vector_y[b] = velocity * sin(theta[b]);

    // draw the bird as a triangle
    ctx.beginPath();
    ctx.moveTo(x_positions[b] + bird_size * 2.5 * cos(theta[b]), y_positions[b] + bird_size * 2.5 * sin(theta[b]));
    ctx.lineTo(x_positions[b] + bird_size * cos(theta[b] + PI / 2), y_positions[b] + bird_size * sin(theta[b] + PI / 2));
    ctx.lineTo(x_positions[b] + bird_size * cos(theta[b] - PI / 2), y_positions[b] + bird_size * sin(theta[b] - PI / 2));

    // fill the bird with a color
    // swich between random colors and color based on neighbors, color based on direction, mouse, or position
    switch (color_option) {
        case "random":

            ctx.fillStyle = color_array[b];

            break;
        case "neighbors":
            ctx.fillStyle = "hsl(" + neighbor_count * 360 / number_birds + ", 100%, 50%)";
            break;
        case "direction":
            ctx.fillStyle = "hsl(" + theta[b] * 360 / (2 * PI) + ", 100%, 50%)";
            break;
        case "mouse":
            // tthe boids will be colored based on the distance from the mouse
           // add event listener to the canvas to get the mouse position
            // canvas.addEventListener("mousemove", function (event) {
                // var mouse_x = event.clientX;
                // var mouse_y = event.clientY;

              // the closer the mouse is to the bird, the more red it will be
                var mouse_distance = (canvas.width / 2 - x_positions[b]) ** 2 + (canvas.height/2 - y_positions[b]) ** 2;
                ctx.fillStyle = "hsl(" + mouse_distance * 36000 / (canvas.width ** 2 + canvas.height ** 2) + ", 100%, 50%)";



            // });
            
            break;
        case "position":
            ctx.fillStyle = "hsl(" + atan2(y_positions[b], x_positions[b]) * 360 / (2 * PI) + ", 100%, 50%)";
            break;
        case "time":
            ctx.fillStyle = "hsl(" + time_elapsed * 360 / 5000 + ", 100%, 50%)";
            break;
        
        default:
            ctx.fillStyle = "hsl(" + random() * 360 + ", 100%, 50%)";
    }
    ctx.fill();
    ctx.closePath();

    if (show_interaction_radius) {
      // show interaction radius as a dashed circle
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.arc(x_positions[b], y_positions[b], interaction_radius, 0, 2 * PI);
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.closePath();
    }
  }

  requestAnimationFrame(main);
  // showMenu();
  showStatus();
  drawFocus();
  showFocus();

  time_elapsed += 1;
}

// -------------------------- ANIMATION ----------------------------
requestAnimationFrame(main);



