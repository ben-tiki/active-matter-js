// CANVAS
// ----------------------------------------
const canvasElement = document.getElementById("animation-canvas");
const canvasCtx = canvasElement.getContext("2d");

// Makes the canvas fullscreen
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

// Add event listener for canvas resizing
window.addEventListener("resize", function () {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    boundingBoxWidth = canvasElement.width;
    boundingBoxHeight = canvasElement.height;
});

// INITIALIZE 
// ----------------------------------------
const boidVelocity = 2.5;
const boidMovementNoise = 0.5;
let boundingBoxWidth = canvasElement.width;
let boundingBoxHeight = canvasElement.height;
const boidInteractionRadius = boundingBoxWidth / 50;
const boidNumber = 500;
const boidSize = 4;
const boidColor = "#C40000";

// Initialize the boids
const boids = Array.from({ length: boidNumber }, () => {
    const directionAngle = Math.random() * Math.PI * 2;

    return {
        position: {
            x: Math.random() * boundingBoxWidth,
            y: Math.random() * boundingBoxHeight
        },
        velocity: {
            x: Math.cos(directionAngle) * boidVelocity,
            y: Math.sin(directionAngle) * boidVelocity
        }
    };
});

// MAIN LOOP
// ----------------------------------------
function main() {

    // Clear the canvas from last frame
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    boids.forEach((boid, i) => {

        // Apply forces
        boid.position.x += boid.velocity.x;
        boid.position.y += boid.velocity.y;

        // Wrap around the bounding box
        if (boid.position.x > boundingBoxWidth) {
            boid.position.x = 1;
        } 
        if (boid.position.x < 0) {
            boid.position.x = boundingBoxWidth - 1;
        }
        
        if (boid.position.y > boundingBoxHeight) {
            boid.position.y = 1;
        } 
        if (boid.position.y < 0) {
            boid.position.y = boundingBoxHeight - 1;
        }

        // Find the mean direction of the other boids
        let neighbourCount = 0;
        let meanDirectionAngle = 0;
        boids.forEach((otherBoid, j) => {
            if (i !== j) {
                const distance = Math.sqrt(
                    (boid.position.x - otherBoid.position.x) ** 2 +
                    (boid.position.y - otherBoid.position.y) ** 2
                );

                if (distance < boidInteractionRadius) {
                    meanDirectionAngle += Math.atan2(
                        otherBoid.velocity.y,
                        otherBoid.velocity.x
                    );
                    neighbourCount += 1;
                }
            }
        });

        if (neighbourCount > 0) {
            meanDirectionAngle /= neighbourCount;
        }

        // Add random movement
        meanDirectionAngle += boidMovementNoise * (Math.random() - 0.5);

        // Update the velocity vector
        boid.velocity.x = Math.cos(meanDirectionAngle) * boidVelocity;
        boid.velocity.y = Math.sin(meanDirectionAngle) * boidVelocity;

        // Compute direction of the boid
        const directionAngle = Math.atan2(boid.velocity.y, boid.velocity.x);

        // Draw the boids as triangles
        const trianglePoints = [
            {
                x: boid.position.x + boidSize * 2 * Math.cos(directionAngle),
                y: boid.position.y + boidSize * 2 *  Math.sin(directionAngle)
            },
            {
                x: boid.position.x + boidSize * Math.cos(directionAngle + 2 / 3 * Math.PI),
                y: boid.position.y + boidSize * Math.sin(directionAngle + 2 / 3 * Math.PI)
            },
            {
                x: boid.position.x + boidSize * Math.cos(directionAngle - 2 / 3 * Math.PI),
                y: boid.position.y + boidSize * Math.sin(directionAngle - 2 / 3 * Math.PI)
            }
        ];

        canvasCtx.beginPath();
        canvasCtx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
        canvasCtx.lineTo(trianglePoints[1].x, trianglePoints[1].y);
        canvasCtx.lineTo(trianglePoints[2].x, trianglePoints[2].y);
        canvasCtx.closePath();
        canvasCtx.fillStyle = boidColor;
        canvasCtx.fill();
    });

    window.requestAnimationFrame(main);
};

// ANIMATION LOOP
// ----------------------------------------
window.requestAnimationFrame(main);
