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
        if (ev.target.id == "polygon") {
            console.log("ev.target.id == 'polygon'");
            divEdit(false, "div_polygon");
        }
    } else {
        data.drawing = ev.target.id;
        data.canvas.style.zIndex = "0";
        data.svg.style.zIndex = "1";
        if (ev.target.id == "polygon") {
            console.log("ev.target.id == 'polygon'");
            divEdit(true, "div_polygon");
        } else {
            console.log("ev.target.id != 'polygon'");
            divEdit(false, "div_polygon");
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
    var valor_x = Number(document.getElementById("input_pos_x").value);
    var valor_y = Number(document.getElementById("input_pos_y").value);
    if (data.anim_focus == undefined)
        return;
    for (var index = 0; index < data.anim_focus.vertices.length; index++) {
        data.anim_focus.vertices[index][1] = data.anim_focus.vertices[index][1] + valor_x;
        data.anim_focus.vertices[index][2] = data.anim_focus.vertices[index][2] + valor_y;
        data.anim_focus.vertices[index][0].style.left = (data.anim_focus.vertices[index][1] - 5) + "px";
        data.anim_focus.vertices[index][0].style.top = (data.anim_focus.vertices[index][2] - 5) + "px";
    }
    data.anim_focus.svg.parentNode.removeChild(data.anim_focus.svg);
    data.anim_focus.svg = updatePolygon(data.anim_focus, data.anim_focus.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(data.anim_focus.svg);
}

function button_draw_scale(ev) {
    var scale_x = Number(document.getElementById("input_scale_x").value) / 100;
    var scale_y = Number(document.getElementById("input_scale_y").value) / 100;
    if (data.anim_focus == undefined)
        return;
    var center = calcCenterVertex(data.anim_focus.vertices, true);
    var minX = center[0][0];
    var minY = center[0][1];
    if (data.anim_focus.vertices.length > 2){
        var area = calcAreaPolygon(data.anim_focus.vertices);
        [minX, minY] = calcCentroidPolygon(data.anim_focus.vertices, area);
    }
    console.log(minX, minY);
    for (var index = 0; index < data.anim_focus.vertices.length; index++) {
        data.anim_focus.vertices[index][1] = ((data.anim_focus.vertices[index][1] - minX) * scale_x) + minX;
        data.anim_focus.vertices[index][2] = ((data.anim_focus.vertices[index][2] - minY) * scale_y) + minY;
        data.anim_focus.vertices[index][0].style.left = (data.anim_focus.vertices[index][1] - 5) + "px";
        data.anim_focus.vertices[index][0].style.top = (data.anim_focus.vertices[index][2] - 5) + "px";
    }
    data.anim_focus.svg.parentNode.removeChild(data.anim_focus.svg);
    data.anim_focus.svg = updatePolygon(data.anim_focus, data.anim_focus.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(data.anim_focus.svg);
}

function button_draw_shear(ev) {
    var shear_x = ((-Number(document.getElementById("input_shear_x").value)) / 360)*3.141592653589793*2;
    var shear_y = ((-Number(document.getElementById("input_shear_y").value)) / 360)*3.141592653589793*2;
    if (data.anim_focus == undefined)
        return;
    
    var [tan_angle_x, tan_angle_y]  = [Math.tan(shear_x), Math.tan(shear_y)];
    console.log("tan", [tan_angle_x, tan_angle_y]);
    var [minX, minY] = calcCenterVertex(data.anim_focus.vertices, true)[0];
    if (data.anim_focus.vertices.length > 2){
        var area = calcAreaPolygon(data.anim_focus.vertices);
        [minX, minY] = calcCentroidPolygon(data.anim_focus.vertices, area);
    }
    console.log(minX, minY);
    for (var index = 0; index < data.anim_focus.vertices.length; index++) {
        var pos_x = data.anim_focus.vertices[index][1] - minX;
        var pos_y = data.anim_focus.vertices[index][2] - minY;
        data.anim_focus.vertices[index][1] = ( (pos_x ) + (pos_y * tan_angle_x) ) + minX;
        data.anim_focus.vertices[index][2] = ( (pos_y ) + (pos_x * tan_angle_y) ) + minY;
        data.anim_focus.vertices[index][0].style.left = (data.anim_focus.vertices[index][1] - 5) + "px";
        data.anim_focus.vertices[index][0].style.top = (data.anim_focus.vertices[index][2] - 5) + "px";
    }
    data.anim_focus.svg.parentNode.removeChild(data.anim_focus.svg);
    data.anim_focus.svg = updatePolygon(data.anim_focus, data.anim_focus.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(data.anim_focus.svg);
}

function button_draw_rotate(ev) {
    var angle = Number(document.getElementById("input_angle").value);
    if (document.getElementById("radio_img_1").style.boxShadow != "none")
        angle = -angle;

    var angle_rad = ((angle) / 360)*3.141592653589793*2;
    
    var cos_angle = Math.cos(angle_rad);
    var sin_angle = Math.sin(angle_rad);
    console.log("cos_angle", cos_angle, "sin_angle",sin_angle)
    if (data.anim_focus == undefined)
        return;

    var [minX, minY] = calcCenterVertex(data.anim_focus.vertices, true)[0];
    if (data.anim_focus.vertices.length > 2){
        var area = calcAreaPolygon(data.anim_focus.vertices);
        [minX, minY] = calcCentroidPolygon(data.anim_focus.vertices, area);
    }
    console.log(minX, minY);
    for (var index = 0; index < data.anim_focus.vertices.length; index++) {
        var pos_x = data.anim_focus.vertices[index][1] - minX;
        var pos_y = data.anim_focus.vertices[index][2] - minY;
        data.anim_focus.vertices[index][1] = ( (pos_x * cos_angle) - (pos_y * sin_angle) ) + minX;
        data.anim_focus.vertices[index][2] = ( (pos_y * cos_angle) + (pos_x * sin_angle) ) + minY;
        data.anim_focus.vertices[index][0].style.left = (data.anim_focus.vertices[index][1] - 5) + "px";
        data.anim_focus.vertices[index][0].style.top = (data.anim_focus.vertices[index][2] - 5) + "px";
    }
    data.anim_focus.svg.parentNode.removeChild(data.anim_focus.svg);
    data.anim_focus.svg = updatePolygon(data.anim_focus, data.anim_focus.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(data.anim_focus.svg);
}

function divEdit(show, painel) {
    var divs = document.getElementsByClassName("edit");
    for (var index = 0; index < divs.length; index++)
        divs[index].style.display = 'none';

    if (show && (painel == "div_polygon" || painel == "div_translate" || painel == "div_scale" || painel == "div_shear" || painel == "div_rotate")) {
        document.getElementById(painel).style.display = 'block';
        document.getElementById("divEdit").style.opacity = 1;
        document.getElementById("divEdit").style.marginLeft = '0px';
    } else {
        document.getElementById("divEdit").style.opacity = 0;
        document.getElementById("divEdit").style.marginLeft = '-200px';
    }
}

function focusButton(ev) {
    removeVertices();
    removeSelects();
    removeTransform();
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
        var radios = document.getElementsByClassName("radioimg");
        for (var index = 0; index < radios.length; index++)
            if (radios[index].id != event.target.id)
                radios[index].style.boxShadow = "rgb(0, 0, 0) 2px 2px 6px";

    } else {
        event.target.style.boxShadow = "rgb(0, 0, 0) 2px 2px 6px";
        var radios = document.getElementsByClassName("radioimg");
        for (var index = 0; index < radios.length; index++)
            if (radios[index].id != event.target.id)
                radios[index].style.boxShadow = "none";
    }
}