function canvasDrawPoint(canvas, points, color) {
    console.log("drawPoint() inicio", points);
    if (points.length < 1)
        return;
    var contexto = canvas.getContext("2d");
    contexto.fillStyle = color;
    contexto.fillRect(points[0][0] - 15, points[0][1] - 20, 3, 3);
}

function canvasDrawRect(canvas, points, color) {
    console.log("drawRect() inicio", points);
    if (points.length < 2 || !canvas)
        return;
    var contexto = canvas.getContext("2d");
    contexto.strokeStyle = color;
    contexto.lineWidth = 1;
    contexto.lineCap = 'square';
    contexto.beginPath();
    contexto.moveTo(points[0][1] - 15, points[0][2] - 18);
    contexto.lineTo(points[1][1] - 15, points[1][2] - 18);
    contexto.stroke();
    contexto.closePath();
}

function canvasDrawPolygon(canvas, points, color) {
    console.log("drawPoligonos() inicio", points);
    if (points.length < 3)
        return;
    var contexto = canvas.getContext("2d");

    contexto.beginPath();
    contexto.moveTo(points[0][0] - 15, points[0][1] - 20);
    for (let index = 1; index < points.length; index++) {
        contexto.lineTo(points[index][0] - 15, points[index][1] - 20);
    }
    contexto.closePath();
    contexto.strokeStyle = color;
    contexto.lineWidth = 1;
    contexto.lineCap = 'square';
    contexto.stroke();
    contexto.fillStyle = color;
    contexto.fill();
}

function canvas_draw() {
    for (let index = 0; index < data.anim.length; index++) {
        const element = data.anim[index];
        if (element.type == 'line') {
            canvasDrawRect(data.canvas, element.vertices, element.color);
        }
    }
}