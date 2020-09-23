function setup() {
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent("#canvasArea");

    socket = io.connect(window.location.href);
    socket.on("mouse", newDrawing);

    socket.on("clear", () => {
        background(BACKGROUND_COLOR);
    });

    $("#clearScreen").click(clearScreen);
    $("#brush").click(activateBrush);
    $("#eraser").click(activateEraser);
    $("#downloadImage").click(saveMyCanvas);

    // activate the brush mode
    activateBrush();
}

function drawOnCanvas(e) {
    const brushWidth = document.querySelector("#brushWidthRange").value;
    let color = null;

    if (e.srcElement.parentElement && (e.srcElement.parentElement.id === "canvasArea" && modes.brush)) {
        color = hexColor;
        stroke(hexColor);
        strokeWeight(brushWidth);
        line(mouseX, mouseY, pmouseX, pmouseY);
    } else if (e.srcElement.parentElement && (e.srcElement.parentElement.id === "canvasArea" && modes.eraser)) {
        color = BACKGROUND_COLOR;
        stroke(BACKGROUND_COLOR);
        strokeWeight(brushWidth);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    let data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        weight: brushWidth,
        color,
    };
    socket.emit("mouse", data);
}

function mouseDragged(e) {
    drawOnCanvas(e);
}

function mouseClicked(e) {
    drawOnCanvas(e);
}

function clearScreen() {
    background(BACKGROUND_COLOR);
    socket.emit("clear");
}

function activateBrush() {
    modes.brush = true;
    modes.eraser = false;

    $("#brush").addClass("active");
    $("#eraser").removeClass("active");
}

function activateEraser() {
    modes.brush = false;
    modes.eraser = true;

    $("#brush").removeClass("active");
    $("#eraser").addClass("active");
}

function newDrawing(data) {
    stroke(data.color);
    strokeWeight(data.weight);
    line(data.x, data.y, data.px, data.py);
}

function saveMyCanvas() {
    saveCanvas(canvas, "myCanvas", "png");
}
