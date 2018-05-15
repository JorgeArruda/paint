function button_delete(ev) {
    var vertex = document.getElementsByClassName("vertice");
    if (vertex.length > 0 && data.drawing != "select") {
        var anim = findVertice(vertex.item(0).id)[0];
        anim.svg.parentNode.removeChild(anim.svg);
        anim.show = false;
    }
    removeVertices();
    removeSelects();
    data.anim_focus = undefined;
    mouse.vertice = [];
}

function buttons_drawing(ev) {
    focusButton(ev); //Set border in button, remove border of other buttons
    data.anim_focus = undefined;
    if (data.drawing == ev.target.id) {
        data.drawing = undefined;
        data.canvas.style.zIndex = "1";
        data.svg.style.zIndex = "0";
        if (ev.target.id == "polygon" || ev.target.id == "point") {
            divEdit(false, "div_"+ev.target.id);
        }
    } else {
        data.drawing = ev.target.id;
        data.canvas.style.zIndex = "0";
        data.svg.style.zIndex = "1";
        if (ev.target.id == "polygon" || ev.target.id == "point") {
            console.log("Click drawing", ev.target.id);
            divEdit(true, "div_"+ev.target.id);
        } else {
            divEdit(false, "div_polygon");
            divEdit(false, "div_point");
        }
    }

    removeVertices();
    removeSelects();
    mouse.vertice = [];
}

function buttons_transform(ev) {
    focusButton(ev);
    removeSelects();
    data.anim_focus = undefined;
    if (data.drawing == ev.target.id) {
        data.drawing = undefined;
        divEdit(false, "div_" + ev.target.id);
    } else {
        data.drawing = ev.target.id;
        divEdit(true, "div_" + ev.target.id);
    }
}

function button_draw_translate(ev) {
    if (data.anim_focus == undefined)
        return;
    var valor_x = Number(document.getElementById("input_pos_x").value);
    var valor_y = Number(document.getElementById("input_pos_y").value);

    const anim = data.anim_focus;
    for (var x = 0; x < anim.vertices.length; x++) {
        anim.vertices[x][1] = anim.vertices[x][1] + valor_x;
        anim.vertices[x][2] = anim.vertices[x][2] + valor_y;
        anim.vertices[x][0].style.left = (anim.vertices[x][1] - 5) + "px";
        anim.vertices[x][0].style.top = (anim.vertices[x][2] - 5) + "px";
    }

    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function button_draw_scale(ev) {
    if (data.anim_focus == undefined)
        return;
    const anim = data.anim_focus;

    var [minX, minY] = centerPolygon(anim.vertices);

    var scale_x = Number(document.getElementById("input_scale_x").value) / 100;
    var scale_y = Number(document.getElementById("input_scale_y").value) / 100;

    for (var index = 0; index < anim.vertices.length; index++) {
        anim.vertices[index][1] = ((anim.vertices[index][1] - minX) * scale_x) + minX;
        anim.vertices[index][2] = ((anim.vertices[index][2] - minY) * scale_y) + minY;
        anim.vertices[index][0].style.left = (anim.vertices[index][1] - 5) + "px";
        anim.vertices[index][0].style.top = (anim.vertices[index][2] - 5) + "px";
    }
    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function button_draw_shear(ev) {
    if (data.anim_focus == undefined)
        return;
    const anim = data.anim_focus;
    var shear_x = ((-Number(document.getElementById("input_shear_x").value)) / 360) * 3.141592653589793 * 2;
    var shear_y = ((-Number(document.getElementById("input_shear_y").value)) / 360) * 3.141592653589793 * 2;

    var [tan_angle_x, tan_angle_y] = [Math.tan(shear_x), Math.tan(shear_y)];

    var [minX, minY] = centerPolygon(anim.vertices);

    for (var index = 0; index < anim.vertices.length; index++) {
        var pos_x = anim.vertices[index][1] - minX;
        var pos_y = anim.vertices[index][2] - minY;
        anim.vertices[index][1] = ((pos_x) + (pos_y * tan_angle_x)) + minX;
        anim.vertices[index][2] = ((pos_y) + (pos_x * tan_angle_y)) + minY;
        anim.vertices[index][0].style.left = (anim.vertices[index][1] - 5) + "px";
        anim.vertices[index][0].style.top = (anim.vertices[index][2] - 5) + "px";
    }
    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function button_draw_rotate(ev) {
    if (data.anim_focus == undefined)
        return;
    const anim = data.anim_focus;

    var angle = Number(document.getElementById("input_angle").value);
    if (document.getElementById("radioimg_1").style.boxShadow != "none")
        angle = -angle;

    var angle_rad = ((angle) / 360) * 3.141592653589793 * 2;
    var cos_angle = Math.cos(angle_rad);
    var sin_angle = Math.sin(angle_rad);

    var [minX, minY] = centerPolygon(anim.vertices);
    anim.vertices = rotate_polygon(anim.vertices, cos_angle, sin_angle, minX, minY);

    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function button_draw_mirror(ev) {
    if (data.anim_focus == undefined)
        return;
    const anim = data.anim_focus;
    var angle;
    if (document.getElementById("radiomirror_2").style.boxShadow == "none")
        angle = 0;
    else
        angle = 90;

    var angle_rad = ((-45) / 360) * 3.141592653589793 * 2;
    var cos_angle = Math.cos(angle_rad);
    var sin_angle = Math.sin(angle_rad);
    var [minX, minY] = centerPolygon(anim.vertices);
    anim.vertices = rotate_polygon(anim.vertices, cos_angle, sin_angle, minX, minY);

    var mirror = Number(document.getElementById("input_mirror").value);

    for (var index = 0; index < anim.vertices.length; index++) {
        const distance = (2 * minX) - (2 * (minX - mirror));
        var pos_x = anim.vertices[index][1] - 0;
        var pos_y = anim.vertices[index][2] - 0;

        anim.vertices[index][1] = angle == 0 ? -pos_x + distance : pos_x;
        anim.vertices[index][2] = angle == 0 ? pos_y : -pos_y + distance;
        anim.vertices[index][0].style.left = (anim.vertices[index][1] - 5) + "px";
        anim.vertices[index][0].style.top = (anim.vertices[index][2] - 5) + "px";
    }

    [minX, minY] = centerPolygon(anim.vertices);
    angle_rad = ((-45) / 360) * 3.141592653589793 * 2;
    cos_angle = Math.cos(angle_rad);
    sin_angle = Math.sin(angle_rad);
    anim.vertices = rotate_polygon(anim.vertices, cos_angle, sin_angle, minX, minY);

    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function centerPolygon(vertices) {
    var [minX, minY] = calcCenterVertex(vertices, true)[0];
    if (vertices.length > 2) {
        var area = calcAreaPolygon(vertices);
        [minX, minY] = calcCentroidPolygon(vertices, area);
    }
    return [minX, minY];
}

function divEdit(show, painel) {
    var divs = document.getElementsByClassName("edit");
    for (var index = 0; index < divs.length; index++)
        divs[index].style.display = 'none';
    const transform = (painel == "div_polygon" || painel == "div_point" || painel == "div_translate" || painel == "div_scale" || painel == "div_shear" || painel == "div_rotate" || painel == "div_mirror");
    if (show && transform) {
        document.getElementById(painel).style.display = 'block';
        document.getElementById("divEdit").style.opacity = 1;
        document.getElementById("divEdit").style.marginLeft = '0px';
        if (painel == "div_mirror") {
            update_mirror();
        }
    } else {
        document.getElementById("divEdit").style.opacity = 0;
        document.getElementById("divEdit").style.marginLeft = '-200px';
    }
}

function update_mirror(event) {
    if (document.getElementById("mirror_line"))
        document.getElementById("mirror_line").parentElement.removeChild(document.getElementById("mirror_line"));
    var mirror = Number(document.getElementById("input_mirror").value);
    var angle;
    var vertices;
    if (document.getElementById("radiomirror_2").style.boxShadow == "none") {
        angle = 0;
        vertices = rotate_line_simple([
            [mirror, -1000],
            [mirror, (1000 + canvas_height())]
        ], angle);
    } else {
        angle = 0;
        vertices = rotate_line_simple([
            [-1000, mirror],
            [(1000 + canvas_height()), mirror]
        ], angle);
    }

    var svg = svgLine("mirror_line", vertices[0][0], vertices[0][1], vertices[1][0], vertices[1][1], "#000000");
    document.getElementById("svg").appendChild(svg);
    return vertices;
}

function focusButton(ev) {
    removeVertices();
    removeSelects();
    removeTransform();
    if (document.getElementById("mirror_line"))
        document.getElementById("mirror_line").parentElement.removeChild(document.getElementById("mirror_line"));

    console.log("click drawing OR transform", ev.target.id);
    if (ev.target.style.boxShadow == "rgb(204, 204, 204) 0px 0px 10px") {
        ev.target.style.boxShadow = "none";
    } else {
        ev.target.style.boxShadow = "rgb(204, 204, 204) 0px 0px 10px";
    }

    var buttonDraw = document.getElementsByClassName("drawing");
    for (var index = 0; index < buttonDraw.length; index++) {
        if (ev.target.id != buttonDraw[index].id) {
            buttonDraw[index].style.boxShadow = "none";
        }
    }

    var buttonTransform = document.getElementsByClassName("transform");
    for (var index = 0; index < buttonTransform.length; index++) {
        if (ev.target.id != buttonTransform[index].id) {
            buttonTransform[index].style.boxShadow = "none";
        }
    }
}

function button_radio_img(event) {
    if (event.target.style.boxShadow == "rgb(0, 0, 0) 2px 2px 6px") {
        event.target.style.boxShadow = "none";
        var radios = document.getElementsByClassName(event.target.id.split('_')[0]);
        for (var index = 0; index < radios.length; index++)
            if (radios[index].id != event.target.id) {
                console.log("radios[index].id", radios[index].id);
                radios[index].style.boxShadow = "rgb(0, 0, 0) 2px 2px 6px";
            }
    } else {
        event.target.style.boxShadow = "rgb(0, 0, 0) 2px 2px 6px";
        var radios = document.getElementsByClassName(event.target.id.split('_')[0]);
        for (var index = 0; index < radios.length; index++)
            if (radios[index].id != event.target.id) {
                console.log("radios[index].id", radios[index].id);
                radios[index].style.boxShadow = "none";
            }
    }
}