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
    if (data.anim_focus == undefined)
        return;
    var valor_x = Number(document.getElementById("input_pos_x").value);
    var valor_y = Number(document.getElementById("input_pos_y").value);
    
    const anim = data.anim_focus;
    for (var x = 0; x < anim.vertices.length; x++) {
        anim.vertices[x][1] = anim.vertices[x][1] + valor_x;
        anim.vertices[x][2] = anim.vertices[x][2] + valor_y;
        anim.vertices[x][0].style.left = (anim.vertices[x][1] - 5) + "px";
        anim.vertices[x][0].style.top  = (anim.vertices[x][2] - 5) + "px";
    }

    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function button_draw_scale(ev) {
    if (data.anim_focus == undefined)
        return;
    const anim = data.anim_focus;

    var [minX, minY] = calcCenterVertex(anim.vertices, true)[0];
    if (anim.vertices.length > 2){
        var area = calcAreaPolygon(anim.vertices);
        [minX, minY] = calcCentroidPolygon(anim.vertices, area);
    }

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
    var shear_x = ((-Number(document.getElementById("input_shear_x").value)) / 360)*3.141592653589793*2;
    var shear_y = ((-Number(document.getElementById("input_shear_y").value)) / 360)*3.141592653589793*2;
    
    var [tan_angle_x, tan_angle_y]  = [Math.tan(shear_x), Math.tan(shear_y)];

    var [minX, minY] = calcCenterVertex(anim.vertices, true)[0];
    if (anim.vertices.length > 2){
        var area = calcAreaPolygon(anim.vertices);
        [minX, minY] = calcCentroidPolygon(anim.vertices, area);
    }
    console.log(minX, minY);
    for (var index = 0; index < anim.vertices.length; index++) {
        var pos_x = anim.vertices[index][1] - minX;
        var pos_y = anim.vertices[index][2] - minY;
        anim.vertices[index][1] = ( (pos_x ) + (pos_y * tan_angle_x) ) + minX;
        anim.vertices[index][2] = ( (pos_y ) + (pos_x * tan_angle_y) ) + minY;
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
    if (document.getElementById("radio_img_1").style.boxShadow != "none")
        angle = -angle;

    var angle_rad = ((angle) / 360)*3.141592653589793*2;
    
    var cos_angle = Math.cos(angle_rad);
    var sin_angle = Math.sin(angle_rad);
    console.log("cos_angle", cos_angle, "sin_angle",sin_angle)

    var [minX, minY] = calcCenterVertex(anim.vertices, true)[0];
    if (anim.vertices.length > 2){
        var area = calcAreaPolygon(anim.vertices);
        [minX, minY] = calcCentroidPolygon(anim.vertices, area);
    }
    console.log(minX, minY);
    anim.vertices = rotate_polygon(anim.vertices, cos_angle, sin_angle, minX, minY);
    
    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function button_draw_mirror(ev) {
    if (data.anim_focus == undefined)
        return;
    const anim = data.anim_focus;
    const angle = -Number(document.getElementById("input_mirror_angle").value);

    var angle_rad = ((-45+angle) / 360)*3.141592653589793*2;
    
    var cos_angle = Math.cos(angle_rad);
    var sin_angle = Math.sin(angle_rad);
    console.log("cos_angle", cos_angle, "sin_angle",sin_angle)

    var [minX, minY] = calcCenterVertex(anim.vertices, true)[0];
    if (anim.vertices.length > 2){
        var area = calcAreaPolygon(anim.vertices);
        [minX, minY] = calcCentroidPolygon(anim.vertices, area);
    }
    console.log(minX, minY);

    anim.vertices = rotate_polygon(anim.vertices, cos_angle, sin_angle, minX, minY);

    var mirror_y = Number(document.getElementById("input_mirror_y").value);
    var vertices = rotate_straight_simple([[mirror_y, -1000], [mirror_y, 1400]], angle);

    for (var index = 0; index < anim.vertices.length; index++) {
        var pos_x = anim.vertices[index][1] - 0;
        var pos_y = anim.vertices[index][2] - 0;

        var distance_poin_straight = calc_distance_poin_straight(vertices, [pos_x, pos_y]);
        console.log("distance_poin_straight", distance_poin_straight);

        anim.vertices[index][1] = -pos_x+(2*minX)-(2*(minX-mirror_y));
        anim.vertices[index][2] = pos_y ;
        anim.vertices[index][0].style.left = (anim.vertices[index][1] - 5) + "px";
        anim.vertices[index][0].style.top  = (anim.vertices[index][2] - 5) + "px";
    }
    [minX, minY] = calcCenterVertex(anim.vertices, true)[0];
    if (anim.vertices.length > 2){
        var area = calcAreaPolygon(anim.vertices);
        [minX, minY] = calcCentroidPolygon(anim.vertices, area);
    }
    angle_rad = ((-45+angle) / 360)*3.141592653589793*2;

    cos_angle = Math.cos(angle_rad);
    sin_angle = Math.sin(angle_rad);
    anim.vertices = rotate_polygon(anim.vertices, cos_angle, sin_angle, minX, minY);

    anim.svg.parentNode.removeChild(anim.svg);
    anim.svg = updatePolygon(anim, anim.svg.id.split("_")[1]);
    document.getElementById("svg").appendChild(anim.svg);
}

function divEdit(show, painel) {
    var divs = document.getElementsByClassName("edit");
    for (var index = 0; index < divs.length; index++)
        divs[index].style.display = 'none';
    const transform = (painel == "div_polygon" || painel == "div_translate" || painel == "div_scale" || painel == "div_shear" || painel == "div_rotate" || painel == "div_mirror");
    if (show && transform) {
        document.getElementById(painel).style.display = 'block';
        document.getElementById("divEdit").style.opacity = 1;
        document.getElementById("divEdit").style.marginLeft = '0px';
        if (painel == "div_mirror"){
            var mirror_y = Number(document.getElementById("input_mirror_y").value);

            var svg = svgAresta("mirror_line", mirror_y, -1000, mirror_y, 1000,"#000000");
            document.getElementById("svg").appendChild(svg);
        }
    } else {
        document.getElementById("divEdit").style.opacity = 0;
        document.getElementById("divEdit").style.marginLeft = '-200px';
    }
}

function update_mirror(event){
    document.getElementById("mirror_line").parentElement.removeChild(document.getElementById("mirror_line"));
    var mirror_y = Number(document.getElementById("input_mirror_y").value);    
    const angle = -Number(document.getElementById("input_mirror_angle").value);

    var vertices = rotate_straight_simple([[mirror_y, -1000], [mirror_y, 1400]], angle);
    
    var svg = svgAresta("mirror_line", vertices[0][0], vertices[0][1], vertices[1][0], vertices[1][1],"#000000");
    document.getElementById("svg").appendChild(svg);
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