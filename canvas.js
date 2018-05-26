function canvasDrawPoint(canvas, points, color, radius) {
    console.log("drawPoint() inicio", points);
    if (points.length < 1)
        return;
    var contexto = canvas.getContext("2d");
    // contexto.fillRect(points[0][0] - 15, points[0][1] - 20, 3, 3);
    contexto.beginPath();
    contexto.fillStyle = color;
    //contexto.strokeStyle = color;
    contexto.lineWidth = 1;
    contexto.arc(points[0][1] - 1, points[0][2] - 1, radius / 2, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
    //contexto.stroke();
    contexto.fill();
    contexto.closePath();
}

function canvasDrawRect(canvas, points, color) {
    console.log("drawRect() inicio", points);
    if (points.length < 2 || !canvas)
        return;
    var contexto = canvas.getContext("2d");
    contexto.strokeStyle = color;
    contexto.lineWidth = 2;
    contexto.lineCap = 'square';
    contexto.beginPath();
    contexto.moveTo(points[0][1], points[0][2]);
    contexto.lineTo(points[1][1], points[1][2]);
    contexto.stroke();
    contexto.closePath();
}

function canvasDrawPolygon(canvas, points, color, open=false) {
    console.log("drawPoligonos() inicio", points);
    if (points.length < 3)
        return;
    var contexto = canvas.getContext("2d");

    contexto.beginPath();
    contexto.moveTo(points[0][1], points[0][2]);
    for (let index = 1; index < points.length; index++)
        contexto.lineTo(points[index][1], points[index][2]);
    
    contexto.strokeStyle = color;
    contexto.stroke();
    contexto.closePath();
    contexto.lineWidth = 1;
    contexto.lineCap = 'square';
    
    if (!open){
        contexto.fillStyle = color;
        contexto.fill();
    }
}

function canvas_draw() {
    console.log('canvas_draw()');
    for (let index = 0; index < data.anim.length; index++) {
        const element = data.anim[index];
        if (element.type == 'point')
            canvasDrawPoint(data.canvas, element.vertices, element.color, element.width);
        if (element.type == 'line')
            canvasDrawRect(data.canvas, element.vertices, element.color);
        if (element.type == 'triangle' || element.type == 'rectangle' || element.type == 'closedPolygon')
            canvasDrawPolygon(data.canvas, element.vertices, element.color);
        if ( element.type == 'openPolygon')
            canvasDrawPolygon(data.canvas, element.vertices, element.color, true);
    }
}

function buttonSave(event) {
    canvas_draw();
    // console.log('buttonSave\n', data.svg.outerHTML);
    // var xml = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' + '<foreignObject width="100%" height="100%">' + '<div xmlns="http://www.w3.org/1999/xhtml>' + data.svg.outerHTML + '</div>' + '</foreignObject>' + '</svg>');
    // console.log('URL', xml);
    // var img = new Image();
    // img.src = "data:image/svg+xml," + xml;
    // data.context.drawImage(img, 0, 0);
}