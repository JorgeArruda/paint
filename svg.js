function svgAresta(id, x1, y1, x2, y2, color = undefined) {
    if (typeof (id) != 'string')
        return;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("id", id);
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    if (color != undefined) {
        line.setAttribute("stroke", color != undefined ? color : data.color);
    } else {
        line.setAttribute("stroke", data.color);
    }
    line.setAttribute("stroke-width", 2);
    line.setAttribute("onclick", "click_svg(evt);");
    return line;
}

function svgClosedPolygon(id, vertices, color = undefined) {
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
    if (color != undefined) {
        polygon.setAttribute("fill", color);
        polygon.setAttribute("stroke", color);
    } else {
        polygon.setAttribute("fill", data.color);
        polygon.setAttribute("stroke", data.color);
    }
    polygon.setAttribute("fill-opacity", "1");
    // Preenchimento
    polygon.setAttribute("stroke-opacity", "1");

    polygon.setAttribute("onclick", "click_svg(evt);");
    return polygon;
}

function svgOpenPolygon(id, vertices, color = undefined) {
    console.log("svgOpenPolygon(id, vertices)", id, vertices);
    if (typeof (id) != 'string')
        return;
    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polygon.setAttribute("id", id);
    var vertex = "";
    for (var index = 0; index < vertices.length; index++)
        vertex = vertex + (vertices[index][0]) + "," + (vertices[index][1]) + "  ";
    polygon.setAttribute("points", vertex);
    polygon.setAttribute("fill", "none");
    if (color != undefined) {
        polygon.setAttribute("stroke", color);
    } else {
        polygon.setAttribute("stroke", data.color);
    }
    polygon.setAttribute("stroke-opacity", "1");

    polygon.setAttribute("onclick", "click_svg(evt);");
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

    polygon.setAttribute("onclick", "click_svg(evt);");
    return polygon;
}

function click_svg(evt) {
    console.log("clickPolygon()", evt.target.id);
    if (data.drawing == "edit" || data.drawing == "translate" || data.drawing == "scale") {
        var anim = findPolygon(evt.target.id);
        removeVertices();
        removeTransform();
        drawAnim(anim[0]);
        data.anim_focus = anim[0];
        // if (data.drawing == "translate") {
        //     var vertex = document.getElementsByClassName("vertice");
        //     if (vertex.length > 0 && mouse.vertice.length == 0) {
        //         var anim = findVertice(vertex.item(0).id)[0];
        //         var positionCenter = calcCenterVertex(anim.vertices);
        //         console.log("ok", positionCenter);
        //         var vertexControl = createVertexControl("control_translate", positionCenter[0], positionCenter[1]);
        //         document.getElementById("divCanvas").appendChild(vertexControl);
        //     }
        //     removeVertices();
        // }
    }
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

function createVertexControl(id, posX, posY) {
    if (typeof (id) != 'string')
        return;
    var transformControl = document.createElement('img');
    transformControl.id = id;
    transformControl.src = "icons/control-translation.svg";
    transformControl.draggable = "true";
    transformControl.ondragstart = dragstart_handler;
    transformControl.ondragend = dragEnd;
    transformControl.className = "transformControl";

    transformControl.style.left = (posX - 15) + "px";
    transformControl.style.top = (posY - 15) + "px";
    return transformControl;
}