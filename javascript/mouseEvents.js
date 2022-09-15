// --------------------------- TOP MENU  --------------------------------
const topMenu = document.getElementById("top-menu");
setTimeout(() => {
  topMenu.style.visibility = "hidden";
  document.documentElement.style.cursor = "none";
}, 6000);

canvas.addEventListener("mousemove", function () {
  topMenu.style.visibility = "visible";
  document.documentElement.style.cursor = "auto";
});

// --------------------------- MODALS --------------------------------

document.getElementById("focus-icon").addEventListener("click", function () {
  show_focus = !show_focus;
  if (show_focus) {
    document.getElementById("focus-modal").style.visibility = "visible";
  } else {
    document.getElementById("focus-modal").style.visibility = "hidden";
  }
});

document.getElementById("status-icon").addEventListener("click", function () {
  show_status = !show_status;
  if (show_status) {
    document.getElementById("status-modal").style.visibility = "visible";
  } else {
    document.getElementById("status-modal").style.visibility = "hidden";
  }
});

document.getElementById("options-icon").addEventListener("click", function () {
  show_menu = !show_menu;
  if (show_menu) {
    document.getElementById("options-modal").style.visibility = "visible";
  } else {
    document.getElementById("options-modal").style.visibility = "hidden";
  }
});

// document.getElementById("boids-bounce").addEventListener("click", function () {
//   if(wall_collision){
//     wall_collision = false;
//   }else{
//     wall_collision = true;
//   }
// });

// document.getElementById("boids-travel").addEventListener("click", function () {
//   if(!wall_collision){
//     wall_collision = true;
//   }else{
//     wall_collision = false;
//   }
// });




// -------------------------- FUNCTIONALITIES ----------------------
// add new bird on mouse coordinates on click
canvas.addEventListener("mousedown", function (e) {

  switch (paused){
    case true:
      paused = false;
      requestAnimationFrame(main);
      document.getElementById("pause-info").style.visibility = "hidden";
      break;

    case false:
      x_positions.push(e.clientX);
      y_positions.push(e.clientY);
      theta.push(Math.random() * PI * 2);
      vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
      vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
      number_birds += 1;

      // if random color is true, add a random color to the array
      if (random_colors == true) {
        bird_colors.push(createRandomColor());
      }
      break;
  }
});
