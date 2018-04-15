var data = {
    canvas: undefined,
    context: undefined,
    drawing: undefined,
    color: undefined,
    states: [],
    anim: []
};

var mouse = {
    clickX: [],
    clickY: [],
    paint: undefined,
    vertice: [],
    polygon: [],
    move: false,
    idVertice: 0
};

function createVertice(id) {
    if (typeof (id) != 'string')
        return;
    var vertice = document.createElement('img');
    vertice.id = id;
    vertice.src = "image/vertice.svg";
    vertice.draggable = "true";
    vertice.ondragstart = dragstart_handler;
    vertice.className = "vertice";
    return vertice;
}

function createPolygon(drawing) {
    console.log("createPolygon(drawing)", getNumVertice(data.drawing));
    if (drawing.numVertice == 2) {
        var points = drawing.vertices;
        return svgAresta("line" + data.anim.length, points[1][1], points[1][2], points[0][1], points[0][2]);
    }
    if (drawing.numVertice > 2) {
        var points = [];
        for (let index = 0; index < drawing.vertices.length; index++) {
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);   
        }
        return svgPolygon(data.drawing + data.anim.length, points);
    }
}

function updatePolygon(drawing, id) {
    if (drawing.numVertice == 2) {
        var points = drawing.vertices;
        var size = drawing.vertices.length;
        return svgAresta("line" + id, points[1][1], points[1][2], points[0][1], points[0][2]);
    }
    if (drawing.numVertice > 2) {
        var points = [];
        for (let index = 0; index < drawing.vertices.length; index++) {
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);   
        }
        return svgPolygon(data.drawing + id, points);
    }
}

function drawVertice(posX, posY) {
    var vertice = createVertice("vertice" + data.anim.length + mouse.vertice.length);
    mouse.vertice[mouse.vertice.length - 1][0] = vertice;

    console.log("vertice() - Create in", posX, posY);
    vertice.style.left = (posX) + "px";
    vertice.style.top = (posY) + "px";

    var element = document.getElementById("divCanvas");
    element.appendChild(vertice);

    if (mouse.vertice.length % getNumVertice(data.drawing) == 0) {
        data.anim.push(createDrawing(data.drawing, mouse.vertice, undefined));

        data.anim[data.anim.length - 1].svg = createPolygon(data.anim[data.anim.length - 1], data.anim.length);
        mouse.polygon.push(data.anim[data.anim.length - 1].svg);

        if (data.anim[data.anim.length - 1].svg != undefined) {
            var svg = document.getElementById("svg");
            svg.appendChild(data.anim[data.anim.length - 1].svg);
        }
        mouse.vertice = [];

    }

}

function createDrawing(operation, vertice, svg) {
    var drawing = {
        type: operation,
        vertices: vertice,
        svg: svg,
        numVertice: getNumVertice(operation)
    };

    return drawing;
}

function removeVertices() {
    var vertices = document.getElementsByClassName("vertice");
    if (vertices.length <= 0)
        return;
    for (var index = vertices.length - 1; index >= 0; index--) {
        console.log("Delete", index);
        vertices[index].parentNode.removeChild(vertices[index]);
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
    var ret = []
    for (let index = 0; index < data.anim.length; index++) {
        for (let vert = 0; vert < data.anim[index].vertices.length; vert++) {
            if (data.anim[index].vertices[vert][0].id == idVertice) {
                console.log("findVertice", data.anim[index]);
                ret.push(data.anim[index]);
                ret.push(index);
                ret.push(vert);
                return ret;
            }
        }
    }
}