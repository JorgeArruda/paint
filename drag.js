function dragstart_handler(ev) {
    // up canvas element
    data.canvas.style.zIndex = "1";
    data.svg.style.zIndex = "0";
    console.log("dragstart_handler()", ev.target.id);
    mouse.idVertice = ev.target.id;
    //ev.target.style.visibility = "hidden"; 
    //ev.target.style.opacity = "0";
    //ev.target.style.top = "-99999px";
    //ev.target.style.left = "-99999px";
    mouse.move = true;
}

function dragover_handler(ev) {

    if (mouse.vertice.length > 0) {
        var vertex = findVertice(mouse.idVertice);
        vertex[0].style.left = (ev.pageX - 5 - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
        vertex[0].style.top = (ev.pageY - 5 - 71) + "px";
        vertex[1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
        vertex[2] = ev.pageY - 71;
    }else{
    
        var anim = findVertice(mouse.idVertice);
        if (anim != undefined) {
            if (anim[0].vertices[anim[2]] != undefined)
                anim[0].vertices[anim[2]][0].parentNode.removeChild(anim[0].vertices[anim[2]][0]);
            anim[0].vertices[anim[2]] = updateVertex(anim[0].vertices[anim[2]], ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71);
            document.getElementById("divCanvas").appendChild(anim[0].vertices[anim[2]][0]);

            if (anim[0].svg != undefined) {
                anim[0].svg.parentNode.removeChild(anim[0].svg);
                anim[0].svg = updatePolygon(anim[0], String(anim[1] + 1));
                document.getElementById("svg").appendChild(anim[0].svg);
            }
        }
    }

    updateSelectAnimation(ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71);

    ev.preventDefault();
    // Define o dropEffect para ser do tipo move
    //ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
    ev.preventDefault();

    if (mouse.vertice.length > 0) {
        var vertex = findVertice(mouse.idVertice);
        vertex[0].style.left = (ev.pageX - 5 - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
        vertex[0].style.top = (ev.pageY - 5 - 71) + "px";
        vertex[1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
        vertex[2] = ev.pageY - 71;
    }else{

        var anim = findVertice(mouse.idVertice);
        if (anim != undefined) {
            anim[0].vertices[anim[2]] = updateVertex(anim[0].vertices[anim[2]], ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71);
            anim[0].svg.parentNode.removeChild(anim[0].svg);
            anim[0].svg = updatePolygon(anim[0], String(anim[1]));
            document.getElementById("svg").appendChild(anim[0].svg);
        }
    }
    mouse.move = false;
    
    updateSelectAnimation(ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71);
}

function dragEnd(ev) {
    data.canvas.style.zIndex = "0";
    data.svg.style.zIndex = "1";
}

function updateSelectAnimation(posX, posY) {
    if (data.drawing == "select" && mouse.vertice.length == 2) {
        mouse.select = true;
        data.drawing = "select";
        var index = (mouse.idVertice == mouse.vertice[0][0].id) ? 0 : 1;

        if (mouse.vertice[0][0].parentElement == null)
            document.getElementById("divCanvas").appendChild(mouse.vertice[0][0]);
        if (mouse.vertice[1][0].parentElement == null)
            document.getElementById("divCanvas").appendChild(mouse.vertice[1][0]);

        // Remove from document the select vertex
        if (mouse.vertice[index][0].parentElement)
            mouse.vertice[index][0].parentElement.removeChild(mouse.vertice[index][0]);

        console.log(" 2 Select ", mouse.vertice[index][0].id, " - Move to", posX, posY);

        mouse.vertice[index] = updateVertex(mouse.vertice[index], posX, posY);
        document.getElementById("divCanvas").appendChild(mouse.vertice[index][0]);

        var drawing = createDrawing(data.drawing, mouse.vertice, mouse.polygon[mouse.polygon.length - 1]);
        //data.anim.push(createDrawing(data.drawing, mouse.vertice, mouse.polygon[mouse.polygon.length - 1]));
        console.log("redrawPolygon()");
        var anim = mouse.polygon[mouse.polygon.length - 1];
        if (anim != undefined) {
            console.log("redrawPolygon()");
            anim.parentNode.removeChild(anim);
            anim = updatePolygon(drawing, String(data.anim.length + 1));
            document.getElementById("svg").appendChild(anim);
            mouse.polygon[mouse.polygon.length - 1] = anim;
        }
    }
}

function startSelectAnimation(posX, posY) {
    mouse.vertice = [];
    mouse.select = true;

    mouse.vertice.push([createVertex("select_" + data.anim.length + "_" + "1"), 0, 0]);
    console.log("select1 - Create to", posX, posY);
    mouse.vertice[mouse.vertice.length - 1] = updateVertex(mouse.vertice[mouse.vertice.length - 1], posX, posY);

    mouse.vertice.push([createVertex("select_" + data.anim.length + "_" + "2"), 0, 0]);
    console.log("select2 - Create to", posX, posY);
    mouse.vertice[mouse.vertice.length - 1] = updateVertex(mouse.vertice[mouse.vertice.length - 1], posX, posY);

    var element = document.getElementById("divCanvas");
    //element.appendChild(mouse.vertice[mouse.vertice.length - 2][0]);
    //element.appendChild(mouse.vertice[mouse.vertice.length - 1][0]);

    points = [];
    points.push([mouse.vertice[mouse.vertice.length - 1][1], mouse.vertice[mouse.vertice.length - 1][2]]);
    points.push([mouse.vertice[mouse.vertice.length - 1][1], posY+1]);
    points.push([posX+1, mouse.vertice[mouse.vertice.length - 1][2]]);
    points.push([posX+1, posY+1]);
    var polygon = svgSelect("select_" + data.anim.length, points);

    if (polygon != undefined) {
        var svg = document.getElementById("svg");
        svg.appendChild(polygon);
    }

    mouse.polygon.push(polygon);
}