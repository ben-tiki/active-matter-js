// set the sliders values to the defined values in the simulation
document.getElementById("boids-number").value = number_birds;
document.getElementById("boids-velocity").value = velocity;
document.getElementById("boids-interaction-radius").value = interaction_radius;
document.getElementById("boids-noise").value = noise;
document.getElementById("boids-size").value = bird_size;

// populate the menu information with the current values
document.getElementById("boids-number-value").innerHTML = number_birds;
document.getElementById("boids-velocity-value").innerHTML = velocity;
document.getElementById("boids-interaction-radius-value").innerHTML = interaction_radius;
document.getElementById("boids-noise-value").innerHTML = noise;
document.getElementById("boids-size-value").innerHTML = bird_size;

// sync number_birds with boids-number range
document.getElementById("boids-number").addEventListener("input", function () {
  number_birds = parseInt(this.value);
  document.getElementById("boids-number-value").innerHTML = number_birds;
});

// sync velocity with boids-velocity range
document.getElementById("boids-velocity").addEventListener("input", function () {
  velocity = parseInt(this.value);
  document.getElementById("boids-velocity-value").innerHTML = velocity;
});

document.getElementById("boids-interaction-radius").addEventListener("input", function () {
  interaction_radius = parseInt(this.value);
  document.getElementById("boids-interaction-radius-value").innerHTML = interaction_radius;
});

// sync noise with boids-noise range
document.getElementById("boids-noise").addEventListener("input", function () {
  noise = parseInt(this.value);
  document.getElementById("boids-noise-value").innerHTML = noise;
});

// sync bird_size with boids-size range
document.getElementById("boids-size").addEventListener("input", function () {
  bird_size = parseInt(this.value);
  document.getElementById("boids-size-value").innerHTML = bird_size;
});
