# Active Matter Simulation
This project demonstrates a simulation of 'Boids' - bird-like objects - interacting on a canvas. Boids follow simple, yet interesting rules which create emergent flocking behaviour.

### Simulation Mechanics
 1. **Initial Setup**: Each Boid starts in a random position on the canvas, moving in a random direction.
 2. **Neighbour Detection**: If another Boid is within a certain interaction radius, it is considered a neighbour.
 3. **Alignment**: When a Boid identifies a neighbour, it adjusts its direction to align with the other Boids within its interaction radius.
 4. **Movement Noise**: Each Boid exhibits a random degree of 'noise' in its movement, preventing purely straight-line motion and adding some variability.
 5. **Wraparound**: Boids that reach the edge of the canvas will appear on the opposite edge, maintaining constant population within the visible space.
 
### Running the Simulation
https://user-images.githubusercontent.com/101474762/187568340-0e1ef3d4-2b64-4599-b40a-96d29c8ca485.mov

### Parameters: 
1. **Velocity**: Control the speed at which the Boids move across the canvas.
2. **Noise**: Adjust the degree of random movement of each Boid. Setting this to 0 will result in Boids moving in straight lines.
3. **Box Size**: Determine the size of the universe or the boundary in which the Boids move.
4. **Interaction Radius**: Set the distance at which another Boid is considered a neighbour, influencing alignment behaviour.
5. **Number of Boids**: Decide the total amount of Boids to populate the simulation.
6. **Boid Size**: Change the size of each Boid on the canvas. Note that this parameter is purely visual and does not affect the simulation mechanics.
