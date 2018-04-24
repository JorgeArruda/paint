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
    var anim = findVertice(mouse.idVertice);
    if (anim != undefined) {
        if (anim[0].vertices[anim[2]][0].parentNode != null)
            anim[0].vertices[anim[2]][0].parentNode.removeChild(anim[0].vertices[anim[2]][0]);

        updateVertex(anim[0].vertices[anim[2]], ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71)

        anim[0].svg.parentNode.removeChild(anim[0].svg);
        anim[0].svg = updatePolygon(anim[0], String(anim[1] + 1));
        document.getElementById("svg").appendChild(anim[0].svg);
        //setTimeout(function(){
        document.getElementById("divCanvas").appendChild(anim[0].vertices[anim[2]][0]);
        //}, 15);
    }

    updateSelectAnimation(ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71);

    ev.preventDefault();
    // Define o dropEffect para ser do tipo move
    //ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
    ev.preventDefault();
    // Pega o id do alvo e adiciona o elemento que foi movido para o DOM do alvo
    //var id = ev.dataTransfer.getData("text");
    var object = document.getElementById(mouse.idVertice);
    if (object != null && object.parentElement != null)
        object.parentElement.removeChild(object);

    object.style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
    object.style.top = (ev.pageY - 71) + "px";
    console.log("drop_handler() -", mouse.idVertice, " Move to", object.style.left, object.style.top);


    var anim = findVertice(mouse.idVertice);
    console.log("dragover_handler()", findVertice(mouse.idVertice));
    if (anim != undefined) {
        console.log("Redraw", anim);
        updateVertex(anim[0].vertices[anim[2]], ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71)

        anim[0].svg.parentNode.removeChild(anim[0].svg);
        anim[0].svg = updatePolygon(anim[0], String(anim[1]));
        document.getElementById("svg").appendChild(anim[0].svg);
    }

    // Update point
    for (var index = 0; index < mouse.vertice.length; index++) {
        if (mouse.vertice[index][0].id == mouse.idVertice) {
            mouse.vertice[index][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
            mouse.vertice[index][2] = ev.pageY - 71;
            console.log("Update point", mouse.idVertice, mouse.vertice[index][1], mouse.vertice[index][2]);
        }
    }
    mouse.move = false;
    console.log("drag - finish");
    document.getElementById("divCanvas").appendChild(object);

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

        updateVertex(mouse.vertice[index], posX, posY);
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
    updateVertex(mouse.vertice[mouse.vertice.length - 1], posX, posY);

    mouse.vertice.push([createVertex("select_" + data.anim.length + "_" + "2"), 0, 0]);
    console.log("select2 - Create to", posX, posY);
    updateVertex(mouse.vertice[mouse.vertice.length - 1], posX, posY);

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