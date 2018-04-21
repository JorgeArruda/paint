function svgAresta(id, x1, y1, x2, y2) {
    if (typeof (id) != 'string')
        return;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("id", id);
    line.setAttribute("x1", x1 + 6);
    line.setAttribute("y1", y1 + 6);
    line.setAttribute("x2", x2 + 6);
    line.setAttribute("y2", y2 + 6);
    line.setAttribute("stroke", "#000000");
    line.setAttribute("stroke-width", 2);
    line.setAttribute("onclick", "click(evt);");
    return line;
}

function svgPolygon(id, vertices) {
    console.log("svgPolygon(id, vertices)", id, vertices);
    if (typeof (id) != 'string')
        return;
    var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle.setAttribute("id", id);
    var vertex = "";
    for (var index = 0; index < vertices.length; index++) 
        vertex = vertex + (vertices[index][0]) + "," + (vertices[index][1]) + "  ";
    

    triangle.setAttribute("points", vertex);

    // Borda
    triangle.setAttribute("fill", data.color);
    triangle.setAttribute("fill-opacity", "1");
    // Preenchimento
    triangle.setAttribute("stroke", data.color);
    triangle.setAttribute("stroke-opacity", "1");

    triangle.setAttribute("onclick", "click(evt);");
    return triangle;
}

function svgSelect(id, vertices) {
    console.log("svgPolygon(id, vertices)", id, vertices);
    if (typeof (id) != 'string')
        return;
    var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    triangle.setAttribute("id", id);
    var vertex = "";
    for (var index = 0; index < vertices.length; index++) {
        vertex = vertex + (vertices[index][0]) + "," + (vertices[index][1]) + "  ";
    }

    triangle.setAttribute("points", vertex);

    // Preenchimento
    triangle.setAttribute("fill", data.color);
    triangle.setAttribute("fill-opacity", "0.0");
    // Borda
    triangle.setAttribute("stroke", "black");
    triangle.setAttribute("stroke-opacity", "1");

    triangle.setAttribute("onclick", "click(evt);");
    return triangle;
}

function click(evt) {
    console.log("clickPolygon()", evt.target.id);
    if (data.drawing != "edit")
        return;
    var anim = findPolygon(evt.target.id);
    drawAnim(anim[0]);
}

function createVertex(id) {
    if (typeof (id) != 'string')
        return;
    var vertice = document.createElement('img');
    vertice.id = id;
    vertice.src = "image/vertice.svg";
    vertice.draggable = "true";
    vertice.ondragstart = dragstart_handler;
    vertice.ondragend = dragEnd;
    vertice.className = "vertice";
    return vertice;
}
function displayNone(id){
    document.getElementById(id).style.opacity = 0;
    document.getElementById(id).style.dispray = 'none';
}