# Active Matter Simulation
This projects creates Boids or "Bird-like" objects moving on the canvas, simulatating the flocking behaviour of birds.

### Rules: 

 1. Birds start at a random position on the canvas.
 2. Each bird has a random initial x_vector and y_vector (defining the direction it will move)
 3. If a bird is within the interaction radius of another it is considered a "neighbor"
 4. If neighbor, the bird will allign its movement with other birds
 5. Each bird has a random "noise" in their movement
 
https://user-images.githubusercontent.com/101474762/187568340-0e1ef3d4-2b64-4599-b40a-96d29c8ca485.mov

### Parameters: 
1. velocity (speed in which the birds traverse the canvas)
2. noise (random movement of each bird. If 0 the birds will move on a straight line)
3. box_size (universe in which the birds will move)
4. interaction_radius (distance in which another bird is considered a neighbor)
5. number_birds (amount of birds to populate the simulation)
6. bird_size (size of the bird on the canvas. Doesent affect the simulation)
