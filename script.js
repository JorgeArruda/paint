function createPolygon(drawing, raio_point=1) {
    console.log("createPolygon(", drawing.type, ")", drawing);
    var points = [];
    if (drawing.type == "point") {
        return svgCircle(data.drawing + "_" + data.anim.length, raio_point, drawing.vertices[0][1], drawing.vertices[0][2]);
    }

    if (drawing.type == "openPolygon") {
        for (var index = 0; index < drawing.vertices.length; index++)
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);

        return svgOpenPolygon(data.drawing + "_" + data.anim.length, points);
    }

    if (drawing.numVertice == 2)
        return svgLine("line_" + data.anim.length, drawing.vertices[1][1], drawing.vertices[1][2], drawing.vertices[0][1], drawing.vertices[0][2]);

    if (drawing.numVertice > 2 || drawing.type == "closedPolygon") {
        for (var index = 0; index < drawing.vertices.length; index++)
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);

        return svgClosedPolygon(data.drawing + "_" + data.anim.length, points);
    }
}

function updatePolygon(drawing, id, raio_point=1) {
    var points = [];

    if (drawing.type == "point") {
        return svgCircle(drawing.type + "_" + id, drawing.width/2, drawing.vertices[0][1], drawing.vertices[0][2], drawing.color);
    }

    if (drawing.type == "openPolygon") {
        for (var index = 0; index < drawing.vertices.length; index++)
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);

        return svgOpenPolygon(data.drawing + "_" + id, points, drawing.color);
    }

    if (drawing.numVertice == 2)
        return svgLine("line_" + id, drawing.vertices[1][1], drawing.vertices[1][2], drawing.vertices[0][1], drawing.vertices[0][2], drawing.color);

    if (drawing.numVertice > 2 || drawing.type == "closedPolygon") {
        for (var index = 0; index < drawing.vertices.length; index++)
            points.push([drawing.vertices[index][1], drawing.vertices[index][2]]);

        return svgClosedPolygon(drawing.type + "_" + id, points, drawing.color);
    }
    if (drawing.type == "select") {
        points.push([drawing.vertices[0][1], drawing.vertices[0][2]]);
        points.push([drawing.vertices[1][1], drawing.vertices[0][2]]);
        points.push([drawing.vertices[1][1], drawing.vertices[1][2]]);
        points.push([drawing.vertices[0][1], drawing.vertices[1][2]]);
        return svgSelect(drawing.type + "_" + id, points);
    }
}

function updateVertex(vertex, posX, posY) {
    vertex[0].style.left = (posX - 5) + "px";
    vertex[0].style.top = (posY - 5) + "px";
    vertex[1] = posX;
    vertex[2] = posY;

    return vertex;
}

function drawVertice(posX, posY) {
    data.anim_focus = undefined;
    var vertice = createVertex("vertice_" + data.anim.length + "_" + (mouse.vertice.length + 1));
    mouse.vertice.push([vertice, posX, posY]);
    if (mouse.vertice.length == 1 && data.drawing != "polygon" && data.drawing != "openPolygon" && data.drawing != "closedPolygon") {
        removeVertices();
    }

    console.log("drawVertice() - Create in", posX, posY);
    vertice.style.left = (posX - 5) + "px";
    vertice.style.top = (posY - 5) + "px";

    document.getElementById("divCanvas").appendChild(vertice);

    // Check num of vertex and draw polygon/line
    if (data.drawing != "point" && data.drawing != "polygon" && data.drawing != "openPolygon" && data.drawing != "closedPolygon" && mouse.vertice.length % getNumVertice(data.drawing) == 0) {
        data.anim.push(createDrawing(data.drawing, mouse.vertice, undefined));

        data.anim[data.anim.length - 1].svg = createPolygon(data.anim[data.anim.length - 1]);

        if (data.anim[data.anim.length - 1].svg != undefined)
            document.getElementById("svg").appendChild(data.anim[data.anim.length - 1].svg);
        data.anim_focus = data.anim[data.anim.length - 1];
        mouse.vertice = [];
    }
}

function drawPolygon() {
    if (mouse.vertice.length < 3)
        return;
    if (document.getElementById("openPolygon").checked)
        data.drawing = "openPolygon";
    else
        data.drawing = "closedPolygon";
    data.anim.push(createDrawing(data.drawing, mouse.vertice, undefined));

    data.anim[data.anim.length - 1].svg = createPolygon(data.anim[data.anim.length - 1]);
    data.anim[data.anim.length - 1].numVertice = mouse.vertice.length;

    if (data.anim[data.anim.length - 1].svg != undefined)
        document.getElementById("svg").appendChild(data.anim[data.anim.length - 1].svg);

    mouse.vertice = [];
}

function drawAllPoints() {
    if (mouse.vertice.length < 1)
        return;
    
    var width = Number( document.getElementById("input_point_width").value );
        
    for (var index = 0; index < mouse.vertice.length; index++) {
        mouse.vertice[index][0].id = "vertice_"+String(data.anim.length)+"_1";
        data.anim.push(createDrawing(data.drawing, [mouse.vertice[index]], undefined, width));
        data.anim[data.anim.length - 1].svg = createPolygon(data.anim[data.anim.length - 1], width/2);
        data.anim[data.anim.length - 1].numVertice = mouse.vertice.length;
        if (data.anim[data.anim.length - 1].svg != undefined)
            document.getElementById("svg").appendChild(data.anim[data.anim.length - 1].svg);
    }

    mouse.vertice = [];
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