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

function svgClosedPolygon(id, vertices) {
    console.log("svgClosedPolygon(id, vertices)", id, vertices);
    if (typeof (id) != 'string')
        return;
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("id", id);
    var vertex = "";
    for (var index = 0; index < vertices.length; index++) 
        vertex = vertex + (vertices[index][0]) + "," + (vertices[index][1]) + "  ";
    

    polygon.setAttribute("points", vertex);

    // Borda
    polygon.setAttribute("fill", data.color);
    polygon.setAttribute("fill-opacity", "1");
    // Preenchimento
    polygon.setAttribute("stroke", data.color);
    polygon.setAttribute("stroke-opacity", "1");

    polygon.setAttribute("onclick", "click(evt);");
    return polygon;
}

function svgOpenPolygon(id, vertices) {
    console.log("svgOpenPolygon(id, vertices)", id, vertices);
    if (typeof (id) != 'string')
        return;
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polygon.setAttribute("id", id);
    var vertex = "";
    for (var index = 0; index < vertices.length; index++) 
        vertex = vertex + (vertices[index][0]) + "," + (vertices[index][1]) + "  ";
    

    polygon.setAttribute("points", vertex);

    // Borda
    polygon.setAttribute("fill", "none");
    //polygon.setAttribute("fill-opacity", "1");
    // Preenchimento
    polygon.setAttribute("stroke", data.color);
    polygon.setAttribute("stroke-opacity", "1");

    polygon.setAttribute("onclick", "click(evt);");
    return polygon;
}

function svgSelect(id, vertices) {
    console.log("svgSelect(id, vertices)", id, vertices);
    if (typeof (id) != 'string')
        return;
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("id", id);
    var vertex = "";
    for (var index = 0; index < vertices.length; index++) {
        vertex = vertex + (vertices[index][0]) + "," + (vertices[index][1]) + "  ";
    }

    polygon.setAttribute("points", vertex);

    // Preenchimento
    polygon.setAttribute("fill", data.color);
    polygon.setAttribute("fill-opacity", "0.0");
    // Borda
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("stroke-opacity", "1");

    polygon.setAttribute("onclick", "click(evt);");
    return polygon;
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