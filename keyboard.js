// -------------------------- KEYBOARD -----------------------------
document.addEventListener("keydown", function (e) {

  // -------------------------- PAUSE ------------------------------
  // if spacebar is pressed pause the animation and a draw "paused"
  // if the spacebar is pressed again, resume the animation
  if (e.key == "p") {
    pause = !pause;
    if (pause) {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "50px Arial";

      var textString = "PAUSED",
        textWidth = ctx.measureText(textString).width;

      ctx.fillText(
        textString,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2
      );
    }
  }

  // ------------------------- RESET -----------------------------
  // if the "r" key is pressed, reset the animation
  if (e.key == "r") {
    pause = false;
    time_elapsed = 0;

    for (let b = 0; b < number_birds; b++) {
      x_positions[b] = Math.random() * canvas.width;
      y_positions[b] = Math.random() * canvas.height;
      theta[b] = Math.random() * PI * 2;
      vector_x[b] = Math.cos(theta[b]) * velocity;
      vector_y[b] = Math.sin(theta[b]) * velocity;
    }
  }

  // ------------------------- SAVE ------------------------------
  // if the "s" key is pressed, save the canvas as a png
  if (e.key == "s") {
    var link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  // ---------------- SHOW INTERACTION RADIUS --------------------
  // if the "i" key is pressed, show or hide the interaction radius
  if (e.key == "i") {
    show_interaction_radius = !show_interaction_radius;
  }

  // if the "a" key is pressed, add a new bird at a random position
  if (e.key == "a") {
    x_positions.push(Math.random() * canvas.width);
    y_positions.push(Math.random() * canvas.height);
    theta.push(Math.random() * PI * 2);
    vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
    vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
    number_birds += 1;
  }

  // ------------------------- DELETE -----------------------------
  // if the "d" key is pressed, delete the last bird
  if (e.key == "d") {
    x_positions.pop();
    y_positions.pop();
    theta.pop();
    vector_x.pop();
    vector_y.pop();
    number_birds -= 1;
  }

  // ------------------------- SPEED -----------------------------
  // if "+" is pressed, increase the speed of the birds
  if (e.key == "+") {
    velocity += 0.1;
    for (let b = 0; b < number_birds; b++) {
      vector_x[b] = Math.cos(theta[b]) * velocity;
      vector_y[b] = Math.sin(theta[b]) * velocity;
    }
  }

  // if "-" is pressed, decrease the speed of the birds
  if (e.key == "-") {
    velocity -= 0.1;
    for (let b = 0; b < number_birds; b++) {
      vector_x[b] = Math.cos(theta[b]) * velocity;
      vector_y[b] = Math.sin(theta[b]) * velocity;
    }
  }

  // ------------------------- MENU ------------------------------
  // if "m" is pressed, toggle the menu
  if (e.key == "h") {
    show_menu = !show_menu;
  }

  // ------------------------- STATUS -----------------------------
  // if "t" is pressed, toggle the status
    if (e.key == "t") {
        show_status = !show_status;
        }

  // --------------------- INTERACTION RADIUS ----------------------
  // if "j" is pressed, increase the interaction radius
    if (e.key == "k") {
        interaction_radius += 1;
        }

  // if "k" is pressed, decrease the interaction radius
    if (e.key == "j") {
        
        // interaction radius must be greater than 0
        if (interaction_radius > 0) {

            interaction_radius -= 1;
        }
        }

    // ------------------------ BIRD SIZE -------------------------
    // if "up arrow" is pressed, increase the bird size
    if (e.key == "ArrowUp") {
        bird_size += 1;
        }
    
    // if "down arrow" is pressed, decrease the bird size
    if (e.key == "ArrowDown") {
            
            // bird size must be greater than 0
            if (bird_size > 0) {
    
                bird_size -= 1;
            }
            }
    
    // --------------------------- FOCUS --------------------------
    // if "f" is pressed, toggle the focus
    if (e.key == "f") {
        focus = !focus;
        }

    // ------------------------ FOCUS BIRD ------------------------
    // if right arrow is pressed, increase the focus bird
    if (e.key == "ArrowRight") {

        // focus bird must be less than the number of birds
        if (focus_bird < number_birds - 1) {
            focus_bird += 1;
        }
        }

    // if left arrow is pressed, decrease the focus bird
    if (e.key == "ArrowLeft") {
            
            // focus bird must be greater than 0
            if (focus_bird > 0) {
                focus_bird -= 1;
            }

            // if focus bird is 0, set it to the last bird
            else {
                focus_bird = number_birds - 1;
            }
            }


});

// -------------------------- FUNCTIONALITIES ----------------------
// add new bird on mouse coordinates on click
canvas.addEventListener("click", function (e) {
    x_positions.push(e.clientX);
    y_positions.push(e.clientY);
    theta.push(Math.random() * PI * 2);
    vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
    vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
    number_birds += 1;
});