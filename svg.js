function svgAresta(id, x1, y1, x2, y2) {
    if (typeof (id) != 'string')
        return;
    var svgns = "http://www.w3.org/2000/svg";
    var line = document.createElementNS(svgns, "line");
    line.setAttribute("id", id);
    line.setAttribute("className", "svg");
    line.setAttribute("x1", x1 + 6);
    line.setAttribute("y1", y1 + 6);
    line.setAttribute("x2", x2 + 6);
    line.setAttribute("y2", y2 + 6);
    line.setAttribute("stroke", "#000000");
    line.setAttribute("stroke-width", 2);
    //line.setAttribute("stroke-dasharray", "5 4");
    //line.setAttribute("onmouseover", "focus(evt);");
    //line.setAttribute("onmouseout", "outFocus(evt);");
    line.setAttribute("onclick", "click(evt);");
    return line;
}

function svgPolygon(id, vertices) {
    console.log("svgPolygon(id, vertices)",id, vertices);
    if (typeof (id) != 'string')
        return;
    var svgns = "http://www.w3.org/2000/svg";
    var triangle = document.createElementNS(svgns, "polygon");
    triangle.setAttribute("id", id);
    var vertice = "";
    for (var index = 0; index < vertices.length; index++) {
        vertice = vertice + (vertices[index][0] + 5) + "," + (vertices[index][1] + 5) + "  ";
    }

    triangle.setAttribute("points", vertice);

    // Borda
    triangle.setAttribute("fill", data.color);
    triangle.setAttribute("fill-opacity", "1");
    // Preenchimento
    triangle.setAttribute("stroke", data.color);
    triangle.setAttribute("stroke-opacity", "1");

    //triangle.setAttribute("stroke-dasharray", "5 4");

    //triangle.setAttribute("className", "svg");
    //triangle.setAttribute("onmouseover", "focus(evt);");
    triangle.setAttribute("onclick", "click(evt);");
    triangle.setAttribute("z-index", "3");
    return triangle;
}

function svgSelect(id, vertices) {
    console.log("svgPolygon(id, vertices)",id, vertices);
    if (typeof (id) != 'string')
        return;
    var svgns = "http://www.w3.org/2000/svg";
    var triangle = document.createElementNS(svgns, "polygon");
    triangle.setAttribute("id", id);
    var vertice = "";
    for (var index = 0; index < vertices.length; index++) {
        vertice = vertice + (vertices[index][0] + 5) + "," + (vertices[index][1] + 5) + "  ";
    }

    triangle.setAttribute("points", vertice);

    // Preenchimento
    triangle.setAttribute("fill", data.color);
    triangle.setAttribute("fill-opacity", "0.0");
    // Borda
    triangle.setAttribute("stroke", "black");
    triangle.setAttribute("stroke-opacity", "1");

    //triangle.setAttribute("stroke-dasharray", "5 4");

    //triangle.setAttribute("className", "svg");
    //triangle.setAttribute("onmouseover", "focus(evt);");
    triangle.setAttribute("onclick", "click(evt);");
    triangle.setAttribute("z-index", "3");
    return triangle;
}

function focus(evt) {
    console.log("focus");
    //evt.target.setAttribute("opacity", "1.0");
}

function click(evt) {
    console.log("clickPolygon()", evt.target.id);
    if (data.drawing != "edit")
        return;
    var anim = findPolygon(evt.target.id);
    drawAnim(anim[0]);
    //evt.target.setAttribute("opacity", "0.4");
}