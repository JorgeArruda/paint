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

            mouse.vertice[mouse.vertice.length - 1][0].parentElement.removeChild(mouse.vertice[mouse.vertice.length - 1][0]);

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
            mouse.select = true;

            var vertice = createVertice("select_" + data.anim.length + "_" + "1");
            mouse.vertice.push([vertice, 0, 0]);
            //mouse.vertice[mouse.vertice.length - 1][0].parentElement.removeChild(mouse.vertice[mouse.vertice.length - 1][0]);
            console.log("select1 - Create to", e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
            updateVertex(mouse.vertice[mouse.vertice.length - 1], e.pageX - (window.innerWidth / 2 - data.canvas.width / 2),e.pageY - 71)
            
            var vertice2 = createVertice("select_" + data.anim.length + "_" + "2");
            mouse.vertice.push([vertice2, 0, 0]);

            //mouse.vertice[mouse.vertice.length - 1][0].parentElement.removeChild(mouse.vertice[mouse.vertice.length - 1][0]);
            console.log("select2 - Create to", e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
            updateVertex(mouse.vertice[mouse.vertice.length - 1], e.pageX - (window.innerWidth / 2 - data.canvas.width / 2),e.pageY - 71)
            
            var element = document.getElementById("divCanvas");
            element.appendChild(mouse.vertice[mouse.vertice.length - 2][0]);
            element.appendChild(mouse.vertice[mouse.vertice.length - 1][0]);

            points = [];
            points.push([mouse.vertice[mouse.vertice.length - 1][1], mouse.vertice[mouse.vertice.length - 1][2]]);
            points.push([mouse.vertice[mouse.vertice.length - 1][1], e.pageY + 1 - 71]);
            points.push([e.pageX + 1 - (window.innerWidth / 2 - data.canvas.width / 2), mouse.vertice[mouse.vertice.length - 1][2]]);
            points.push([e.pageX + 1 - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY + 1 - 71]);
            var polygon = svgSelect("select_" + data.anim.length, points);

            if (polygon != undefined) {
                var svg = document.getElementById("svg");
                svg.appendChild(polygon);
            }

            mouse.polygon.push(polygon);
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
            console.log("drawingClick", ev.target.id);
            if (ev.target.style.boxShadow == "rgb(204, 204, 204) 0px 0px 10px") {
                ev.target.style.boxShadow = "none";
            } else {
                ev.target.style.boxShadow = "rgb(204, 204, 204) 0px 0px 10px";
            }

            var buttonDraws = document.getElementsByClassName("drawing");
            for (var index = 0; index < buttonDraws.length; index++) {
                if (ev.target.id != buttonDraws[index].id) {
                    buttonDraws[index].style.boxShadow = "none";
                }
            }

            if (data.drawing == ev.target.id) {
                data.drawing = undefined;
                data.canvas.style.zIndex = "1";
                data.svg.style.zIndex = "0";
            } else {
                data.drawing = ev.target.id;
                data.canvas.style.zIndex = "0";
                data.svg.style.zIndex = "1";
            }
            removeVertices();
            removeSelects();
            mouse.vertice = [];
        }
    }
}