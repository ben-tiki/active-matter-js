// show a menu on the top left corner of the canvas with the key commands
function showMenu() {
    if (show_menu) {
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";

        ctx.fillText("Active Matter Simulation", 10, 30);
        ctx.fillText("_______________________________", 10, 30);
        ctx.fillText("Press 'p' to pause", 10, 60);
        ctx.fillText("Press 'r' to reset", 10, 90);
        ctx.fillText("Press 's' to save", 10, 120);
        ctx.fillText("Press 'i' to show/hide interaction radius", 10, 150);
        ctx.fillText("Press 'a' to add a new bird", 10, 180);
        ctx.fillText("Press 'd' to delete the last bird", 10, 210);
        ctx.fillText("Press '+' to speed up", 10, 240);
        ctx.fillText("Press '-' to slow down", 10, 270);
        ctx.fillText("Press 'h' to show/hide this help panel", 10, 300);
    }
}

// show a card on the top right corner of the canvas with the status of the simulation
function showStatus() {

    if (show_status) {
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";

        ctx.fillText("Status", canvas.width - 250, 30);
        ctx.fillText("____________________", canvas.width - 250, 30);
        ctx.fillText("Number of birds: " + number_birds, canvas.width - 250, 60);
        ctx.fillText("Bird Size: " + bird_size, canvas.width - 250, 90);
        ctx.fillText("Velocity: " + velocity.toFixed(2), canvas.width - 250, 120);
        ctx.fillText("Interaction radius: " + interaction_radius.toFixed(2), canvas.width - 250, 150);

    }

}

function showFocus(neighbor_count) {
    
        if (focus) {
            
            // draw a circle around the focused bird
            ctx.beginPath();
            ctx.arc(x_positions[focus_bird], y_positions[focus_bird], interaction_radius, 0, 2 * Math.PI);
            ctx.strokeStyle = "#FFFF00";
            ctx.stroke();

            // draw a line from the focused bird to each of its neighbors (from the center of the bird, to the center of the neighbor)
            for (var b = 0; b < number_birds; b++) {
                var neighbor = false;
                var distance = Math.sqrt(Math.pow(x_positions[b] - x_positions[focus_bird], 2) + Math.pow(y_positions[b] - y_positions[focus_bird], 2));
                if (distance < interaction_radius) {
                    neighbor = true;
                }
                if (neighbor) {
                    ctx.beginPath();
                    ctx.moveTo(x_positions[focus_bird], y_positions[focus_bird]);
                    ctx.lineTo(x_positions[b], y_positions[b]);
                    ctx.strokeStyle = "#FFFF00";
                    ctx.stroke();
                }
            }

            // draw a panel with the status of the focused bird (at bottom right corner)
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";

            // include the bird number, position, velocity, and angle, and amount of neighbors
            ctx.fillText("Bird " + focus_bird, canvas.width - 250, canvas.height - 150);
            ctx.fillText("____________________", canvas.width - 250, canvas.height - 150);
            ctx.fillText("Position: (" + x_positions[focus_bird].toFixed(2) + ", " + y_positions[focus_bird].toFixed(2) + ")", canvas.width - 250, canvas.height - 120);
            // status (alive or dead)
            // if (alive[focus_bird]) {
            //     ctx.fillText("Status: Alive", canvas.width - 250, canvas.height - 90);
            // } else {
            //     ctx.fillText("Status: Dead", canvas.width - 250, canvas.height - 90);
            // }
            ctx.fillText("Status: Alive", canvas.width - 250, canvas.height - 90)
            ctx.fillText("Angle: " + theta[focus_bird].toFixed(2), canvas.width - 250, canvas.height - 60);
            ctx.fillText("Neighbors: " + neighbor_count, canvas.width - 250, canvas.height - 30);


           
    
        }
    
    }



