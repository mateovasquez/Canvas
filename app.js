const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

// Sets the canvas size and the drawing line style
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100; 

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Draw function
function draw(e){
    if (!isDrawing) return; //Stop de function if isn't moused
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // Start from
    ctx.moveTo(lastX, lastY);
    // Go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // Change the stroke style with the hue variable
    hue++;
    if (hue >= 360){
        hue = 0;
    }
    //Makes the line witdh alternate between 100 and 1
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    if (direction == true){
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

//Restart the origin to the current coordinates when the mouse is down
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

//Execute the drawing function when moving the mouse
canvas.addEventListener('mousemove', draw);

// Don't draw if the mouse is up or is out of the canvas
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);