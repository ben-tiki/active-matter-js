// --------------------------------- STATUS -----------------------------------
// show a card on the top right corner of the canvas with the status of the simulation
// displays: number of birds, bird size, velocity, interaction radius, and noise
function showStatus() {
  if (show_status) {
    document.getElementById("number-birds-display").innerHTML = "Number of Birds: " + number_birds;
    document.getElementById("bird-size-display").innerHTML = "Bird Size: " + bird_size;
    document.getElementById("bird-velocity-display").innerHTML = "Bird Velocity: " + velocity.toFixed(1);
    document.getElementById("interaction-radius-display").innerHTML = "Interaction Radius: " + interaction_radius;
    document.getElementById("bird-noise-display").innerHTML = "Noise: " + noise.toFixed(2);
  }
}

// --------------------------------- FOCUS ----------------------------------
// draw an identifier arond focused bird and connect via straight lines to its neighbors
function drawFocus() {
  if (show_focus) {
    // draw a circle around the focused bird
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(x_positions[focus_bird], y_positions[focus_bird], interaction_radius, 0, 2 * PI);
    ctx.strokeStyle = "#FFFF00";
    ctx.stroke();

    // draw a line from the focused bird to each of its neighbors (from the center of the bird, to the center of the neighbor)
    for (var b = 0; b < number_birds; b++) {
      var neighbor = false;
      var distance = sqrt(pow(x_positions[b] - x_positions[focus_bird], 2) + pow(y_positions[b] - y_positions[focus_bird], 2));
      if (distance < interaction_radius) {
        neighbor = true;
      }

      if (neighbor) {
        ctx.beginPath();
        ctx.moveTo(x_positions[focus_bird], y_positions[focus_bird]);
        ctx.lineTo(x_positions[b], y_positions[b]);
        ctx.strokeStyle = "#FFFF00";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

// include the bird number, position, velocity, angle, amount of neighbors, and quadrant
function showFocus() {
  if (show_focus) {
    var focusBird = document.getElementById("focus-bird-display");
    focusBird.innerHTML = "Bird " + focus_bird;

    // depending of the color option, color focusBird
    switch (color_option) {
      case "time":
        focusBird.style.color = "hsl(" + (time_elapsed * 360) / 5000 + ", 100%, 50%)";
        break;
      case "random":
        focusBird.style.color = bird_colors[focus_bird];
        break;
      case "direction":
        focusBird.style.color = "hsl(" + (theta[focus_bird] * 360) / (2 * PI) + ", 100%, 50%)";
        break;
      default:
        focusBird.style.color = "white";
    }

    document.getElementById("bird-position-display").innerHTML = "Position: (" + x_positions[focus_bird].toFixed(0) + ", " + y_positions[focus_bird].toFixed(0) + ")";
    document.getElementById("bird-angle-display").innerHTML = "Angle: " + theta[focus_bird].toFixed(2);
    document.getElementById("bird-neighbors-display").innerHTML = "Neighbors: " + neighbor_array[focus_bird];
    document.getElementById("bird-quadrant-display").innerHTML = "Quadrant: " + getQuadrant(focus_bird);
  }
}
