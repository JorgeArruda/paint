function createAresta(id, x1, y1, x2, y2) {
    console.log("createAresta", id, x1, y1, x2, y2);
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

function createTriangle(id, vertices) {
    console.log("createTriangle", vertices);
    if (typeof (id) != 'string')
        return;
    var svgns = "http://www.w3.org/2000/svg";
    var triangle = document.createElementNS(svgns, "polygon");
    triangle.setAttribute("id", id);
    var vertice1 = "" + (vertices[0][0]+5) + "," + (vertices[0][1]+5);
    var vertice2 = "" + (vertices[1][0]+5) + "," + (vertices[1][1]+5);
    var vertice3 = "" + (vertices[2][0]+5) + "," + (vertices[2][1]+5);

    triangle.setAttribute("points", "" + vertice1+" "+vertice2+" "+vertice3);

    // Borda
    triangle.setAttribute("fill", data.color);
    triangle.setAttribute("fill-opacity", "1");
    // Preenchimento
    triangle.setAttribute("stroke", data.color);
    triangle.setAttribute("stroke-opacity", "1");
    
    //triangle.setAttribute("stroke-dasharray", "5 4");

    return triangle;
}