function svgAresta(id, x1, y1, x2, y2) {
    console.log("sgvAresta", id, x1, y1, x2, y2);
    if (typeof (id) != 'string')
        return;
    var svgns = "http://www.w3.org/2000/svg";
    var line = document.createElementNS(svgns, "line");
    line.setAttribute("id", id);
    line.setAttribute("x1", x1 + 6);
    line.setAttribute("y1", y1 + 6);
    line.setAttribute("x2", x2 + 6);
    line.setAttribute("y2", y2 + 6);
    line.setAttribute("stroke", "#000000");
    line.setAttribute("stroke-width", 2);
    //line.setAttribute("stroke-dasharray", "5 4");

    return line;
}

function svgPolygon(id, vertices) {
    console.log("svgPolygon", vertices);
    if (typeof (id) != 'string')
        return;
    var svgns = "http://www.w3.org/2000/svg";
    var triangle = document.createElementNS(svgns, "polygon");
    triangle.setAttribute("id", id);
    var vertice = "";
    for (let index = 0; index < vertices.length; index++) {
        vertice = vertice + (vertices[index][0]+5) + "," + (vertices[index][1]+5)+"  ";
    }

    triangle.setAttribute("points", vertice);

    // Borda
    triangle.setAttribute("fill", data.color);
    triangle.setAttribute("fill-opacity", "1");
    // Preenchimento
    triangle.setAttribute("stroke", data.color);
    triangle.setAttribute("stroke-opacity", "1");
    
    //triangle.setAttribute("stroke-dasharray", "5 4");

    return triangle;
}