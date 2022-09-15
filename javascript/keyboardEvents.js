// -------------------------- FUNCTIONS -----------------------------
const pause = () => {
  if (paused == true) {
    paused = false;
    document.getElementById("pause-info").style.visibility = "hidden";
    requestAnimationFrame(main);
  } else if (paused == false) {
    paused = true;
    document.getElementById("pause-info").style.visibility = "visible";
  }
};

const reset = () => {
  time_elapsed = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // initialize x and y positions based on spawn option
  if (start_position in spawn_options_dict) {
    spawn_options_dict[start_position]();
  }

  for (let b = 0; b < number_birds; b++) {
    vector_x[b] = Math.cos(theta[b]) * velocity;
    vector_y[b] = Math.sin(theta[b]) * velocity;
  }
};

const addBird = () => {
  x_positions.push(Math.random() * canvas.width);
  y_positions.push(Math.random() * canvas.height);
  theta.push(Math.random() * PI * 2);
  vector_x.push(Math.cos(theta[theta.length - 1]) * velocity);
  vector_y.push(Math.sin(theta[theta.length - 1]) * velocity);
  number_birds += 1;
};

const removeBird = () => {
  if (number_birds > 0) {
    x_positions.pop();
    y_positions.pop();
    theta.pop();
    vector_x.pop();
    vector_y.pop();
    number_birds -= 1;
  }
};

const save = () => {
  var link = document.createElement("a");
  link.download = "canvas.png";
  link.href = canvas.toDataURL();
  link.click();
};

const speedUp = () => {
  velocity += 0.1;
  for (let b = 0; b < number_birds; b++) {
    vector_x[b] = Math.cos(theta[b]) * velocity;
    vector_y[b] = Math.sin(theta[b]) * velocity;
  }
};

const speedDown = () => {
  velocity -= 0.1;
  for (let b = 0; b < number_birds; b++) {
    vector_x[b] = Math.cos(theta[b]) * velocity;
    vector_y[b] = Math.sin(theta[b]) * velocity;
  }
};

const upNoise = () => {
  noise += 0.1;
};

const downNoise = () => {
  if (noise > 0) {
    noise -= 0.1;
  }
};

const upInteractionRadius = () => {
  interaction_radius += 1;
};

const downInteractionRadius = () => {
  if (interaction_radius > 0) {
    interaction_radius -= 1;
  }
};

const upSize = () => {
  bird_size += 0.5;
};

const downSize = () => {
  if (bird_size > 0) {
    bird_size -= 0.5;
  }
};

const showInteractionRadius = () => {
  show_interaction_radius = !show_interaction_radius;
};

const toggleOptions = () => {
  show_menu = !show_menu;
  if (show_menu == true) {
    document.getElementById("options-modal").style.visibility = "visible";
  }
  if (show_menu == false) {
    document.getElementById("options-modal").style.visibility = "hidden";
  }
};

const toggleStatus = () => {
  show_status = !show_status;
  if (show_status == true) {
    document.getElementById("status-modal").style.visibility = "visible";
  }
  if (show_status == false) {
    document.getElementById("status-modal").style.visibility = "hidden";
  }
};

const toggleFocusBird = () => {
  show_focus = !show_focus;

  if (show_focus == true) {
    document.getElementById("focus-modal").style.visibility = "visible";
  }
  if (show_focus == false) {
    document.getElementById("focus-modal").style.visibility = "hidden";
  }
};

const nextFocus = () => {
  if (focus_bird < number_birds - 1) {
    focus_bird += 1;
  } else if (focus_bird == number_birds - 1) {
    focus_bird = 0;
  }
};

const prevFocus = () => {
  if (focus_bird > 0) {
    focus_bird -= 1;
  } else if (focus_bird == 0) {
    focus_bird = number_birds - 1;
  }
};

const hideAll = () => {
  show_interaction_radius = false;
  show_menu = false;
  show_status = false;
  show_focus = false;
  document.getElementById("top-menu").style.visibility = "hidden";
  document.documentElement.style.cursor = "none";
};

// -------------------------- KEYBOARD ------------------------------
// keybindings
const keyBindings = {
  r: reset,
  a: addBird,
  d: removeBird,
  s: save,
  "+": speedUp,
  "-": speedDown,
  m: upNoise,
  n: downNoise,
  k: upInteractionRadius,
  j: downInteractionRadius,
  ArrowUp: upSize,
  ArrowDown: downSize,
  i: showInteractionRadius,
  o: toggleOptions,
  t: toggleStatus,
  f: toggleFocusBird,
  ArrowRight: nextFocus,
  ArrowLeft: prevFocus,
  p: pause,
  Escape: hideAll,
};

// keydown event listener
document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName in keyBindings) {
    keyBindings[keyName]();
  }
});