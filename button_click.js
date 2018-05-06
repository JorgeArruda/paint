function button_delete(ev) {
    var vertex = document.getElementsByClassName("vertice");
    if (vertex.length > 0 && data.drawing != "select") {
        var anim = findVertice(vertex.item(0).id)[0];
        anim.svg.parentNode.removeChild(anim.svg);
        anim.show = false;
    }
    removeVertices();
    removeSelects();
    mouse.vertice = [];
}

function buttons_drawing(ev) {
    focusButton(ev); //Set border in button, remove border of other buttons

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

function divEdit(show, painel) {
    document.getElementById("div_polygon").style.display = document.getElementById("div_translate").style.display = 'none';
    if (show && (painel == "div_polygon" || painel ==  "div_translate")) {
        document.getElementById(painel).style.display = 'block';
        document.getElementById("divEdit").style.opacity = 1;
        document.getElementById("divEdit").style.marginLeft = '0px';
    } else {
        document.getElementById(painel).style.display = 'none';
        document.getElementById("divEdit").style.opacity = 0;
        document.getElementById("divEdit").style.marginLeft = '-200px';
    }
}

function buttons_transform(ev) {
    focusButton(ev);
    removeSelects();

    if (data.drawing == ev.target.id) {
        data.drawing = undefined;
        divEdit(false, "div_translate");
    } else {
        data.drawing = ev.target.id;
        divEdit(true, "div_translate");
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