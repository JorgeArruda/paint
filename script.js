function createPolygon(drawing) {
    console.log("createPolygon(drawing)", getNumVertice(data.drawing));
    if (drawing.numVertice == 2)
        return svgAresta("line_" + data.anim.length, drawing.vertices[1][1], drawing.vertices[1][2], drawing.vertices[0][1], drawing.vertices[0][2]);

    if (drawing.numVertice > 2) {
        var points = [];
        for (var index = 0; index < drawing.vertices.length; index++)
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);

        return svgPolygon(data.drawing + "_" + data.anim.length, points);
    }
}

function updatePolygon(drawing, id) {
    if (drawing.numVertice == 2)
        return svgAresta("line_" + id, drawing.vertices[1][1], drawing.vertices[1][2], drawing.vertices[0][1], drawing.vertices[0][2]);

    if (drawing.numVertice > 2) {
        var points = [];
        for (var index = 0; index < drawing.vertices.length; index++)
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);

        return svgPolygon(drawing.type + "_" + id, points);
    }
    if (drawing.type == "select") {
        var points = [];
        points.push([drawing.vertices[0][1], drawing.vertices[0][2]]);
        points.push([drawing.vertices[1][1], drawing.vertices[0][2]]);
        points.push([drawing.vertices[1][1], drawing.vertices[1][2]]);
        points.push([drawing.vertices[0][1], drawing.vertices[1][2]]);
        return svgSelect(drawing.type + "_" + id, points);
    }
}

function updateVertex(vertex, posX, posY) {
    vertex[0].style.left = (posX-5) + "px";
    vertex[0].style.top = (posY-5) + "px";
    vertex[1] = posX;
    vertex[2] = posY;
}

function drawVertice(posX, posY) {
    var vertice = createVertex("vertice_" + data.anim.length + "_" + (mouse.vertice.length + 1));
    mouse.vertice.push([vertice, posX, posY]);

    console.log("drawVertice() - Create in", posX, posY);
    vertice.style.left = (posX-5) + "px";
    vertice.style.top = (posY-5) + "px";

    document.getElementById("divCanvas").appendChild(vertice);

    // Check num of vertex and draw polygon/line
    if (mouse.vertice.length % getNumVertice(data.drawing) == 0) {
        data.anim.push(createDrawing(data.drawing, mouse.vertice, undefined));

        data.anim[data.anim.length - 1].svg = createPolygon(data.anim[data.anim.length - 1]);
        //mouse.polygon.push(data.anim[data.anim.length - 1].svg);

        if (data.anim[data.anim.length - 1].svg != undefined)
            document.getElementById("svg").appendChild(data.anim[data.anim.length - 1].svg);

        mouse.vertice = [];
    }
}

function removeVertices() {
    var vertices = document.getElementsByClassName("vertice");
    if (vertices.length <= 0)
        return;
    for (var index = vertices.length - 1; index >= 0; index--) {
        console.log("Delete", vertices[index]);
        vertices[index].parentNode.removeChild(vertices[index]);
    }
}

function removeSelects() {
    var vertices = document.getElementsByTagName("polygon");
    if (vertices.length <= 0)
        return;
    for (var index = vertices.length - 1; index >= 0; index--) {
        if (vertices[index].id.substring(0, 6) == "select") {
            console.log("Delete", vertices[index]);
            vertices[index].parentNode.removeChild(vertices[index]);
        }
    }
}

function getNumVertice(type) {
    if (type == "point")
        return 1;
    if (type == "line")
        return 2;
    if (type == "triangle")
        return 3;
    if (type == "rectangle")
        return 4;
    if (type == "star")
        return 5;
    if (type == "polygon")
        return 100;
}

function findVertice(idVertice) {
    var ret = [];
    for (var index = 0; index < data.anim.length; index++) {
        for (var vert = 0; vert < data.anim[index].vertices.length; vert++) {
            if (data.anim[index].vertices[vert][0].id == idVertice) {
                ret.push(data.anim[index]);
                ret.push(index);
                ret.push(vert);
                return ret;
            }
        }
    }
}

function findPolygon(idPolygon) {
    var ret = [];
    for (var index = 0; index < data.anim.length; index++) {
        if (data.anim[index].svg.id == idPolygon) {
            ret.push(data.anim[index]);
            ret.push(index);
            return ret;
        }
    }
}

function drawAnim(anim) {
    if (anim == undefined || anim == null)
        return;

    var svg = document.getElementById(anim.svg.id);
    if (svg == undefined || svg == null)
        data.svg.appendChild(anim.svg);

    for (var index = 0; index < anim.vertices.length; index++) {
        var vertice = document.getElementById(anim.vertices[index][0].id);
        if (vertice == undefined || vertice == null)
            document.getElementById("divCanvas").appendChild(anim.vertices[index][0]);
    }
}