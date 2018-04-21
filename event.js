function setEvent() {
    data.svg.onmousemove = data.canvas.onmousemove = function (e) {
        if (mouse.move) {
            console.log("canvas.onmousemove()", mouse.idVertice);
        }
    };
    data.svg.onclick = data.canvas.onclick = function (e) {
        console.log("canvas.onclick()", mouse.vertice);
        if (data.drawing != undefined && data.drawing != "edit" && data.drawing != "select") {
            drawVertice(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
        }
        if (data.drawing == "select") {
            mouse.select = false;
            data.drawing = "select";

            if ( mouse.vertice[mouse.vertice.length - 1][0].parentElement != null)
                mouse.vertice[mouse.vertice.length - 1][0].parentElement.removeChild(mouse.vertice[mouse.vertice.length - 1][0]);
            if ( mouse.vertice[mouse.vertice.length - 2][0].parentElement == null)
            document.getElementById("divCanvas").appendChild(mouse.vertice[mouse.vertice.length - 2][0]);

            console.log("Select ", mouse.vertice[mouse.vertice.length - 1][0].id, " - Move to", e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
            updateVertex(mouse.vertice[mouse.vertice.length - 1], e.pageX - (window.innerWidth / 2 - data.canvas.width / 2),e.pageY - 71)
            
            data.anim.push(createDrawing(data.drawing, mouse.vertice, mouse.polygon[mouse.polygon.length - 1]));

            var anim = findVertice(mouse.vertice[mouse.vertice.length - 1][0].id);
            if (anim != undefined) {
                anim[0].svg.parentNode.removeChild(anim[0].svg);
                anim[0].svg = updatePolygon(anim[0], String(anim[1] + 1));
                document.getElementById("svg").appendChild(anim[0].svg);
            }
            document.getElementById("divCanvas").appendChild(mouse.vertice[mouse.vertice.length - 1][0]);

            mouse.polygon.push(polygon);

            mouse.vertice = [];
        }
    };
    data.svg.onmousedown = data.canvas.onmousedown = function (e) {
        console.log("onmousedown()");
        if (data.drawing == "select" && !mouse.select) {
            removeVertices();
            removeSelects();
            var anim = startSelectAnimation(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
        }
    };
    data.svg.onmouseup = data.canvas.onmouseup = function (e) {
        mouse.select = false;
    };
    data.svg.onmouseout = data.canvas.onmouseout = function (e) {
        mouse.select = false;
    };
    var buttonDraws = document.getElementsByClassName("drawing");
    for (var index = 0; index < buttonDraws.length; index++) {
        buttonDraws[index].onclick = function (ev) {
            var buttonDraw = document.getElementsByClassName("drawing");
            console.log("drawingClick", ev.target.id);
            if (ev.target.style.boxShadow == "rgb(204, 204, 204) 0px 0px 10px") {
                ev.target.style.boxShadow = "none";
            } else {
                ev.target.style.boxShadow = "rgb(204, 204, 204) 0px 0px 10px";
            }

            for (var index = 0; index < buttonDraw.length; index++) {
                if (ev.target.id != buttonDraw[index].id) {
                    buttonDraw[index].style.boxShadow = "none";
                }
            }

            if (data.drawing == ev.target.id) {
                data.drawing = undefined;
                data.canvas.style.zIndex = "1";
                data.svg.style.zIndex = "0";
                if (ev.target.id == "polygon"){
                    console.log("ev.target.id == 'polygon'");
                    //document.getElementById("divEdit").style.dispray = 'inline-flex';
                    document.getElementById("divEdit").style.opacity = 0;
                    document.getElementById("divEdit").style.marginLeft = '-200px';
                }
            } else {
                data.drawing = ev.target.id;
                data.canvas.style.zIndex = "0";
                data.svg.style.zIndex = "1";
                if (ev.target.id == "polygon"){
                    console.log("ev.target.id == 'polygon'");
                    //document.getElementById("divEdit").style.dispray = 'inline-flex';
                    document.getElementById("divEdit").style.opacity = 1;
                    document.getElementById("divEdit").style.marginLeft = '0px';
                }else{
                    console.log("ev.target.id != 'polygon'");
                    document.getElementById("divEdit").style.opacity = 0;
                    //document.getElementById("divEdit").style.dispray = 'none';
                    document.getElementById("divEdit").style.marginLeft = '-200px';
                }
            }
            removeVertices();
            removeSelects();
            mouse.vertice = [];
        }
    }
}