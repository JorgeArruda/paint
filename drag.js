function dragstart_handler(ev) {
    data.canvas.style.zIndex = "1";
    data.svg.style.zIndex = "0";
    // Adiciona o id do elemento em questão ao objeto de transferência de dados (dataTransfer)
    ev.dataTransfer.setData("text/plain", ev.target.id);
    console.log("dragstart_handler()", ev.target.id);
    mouse.idVertice = ev.target.id;
    //ev.target.style.visibility = "hidden"; 
    //ev.target.style.opacity = "0";
    //ev.target.style.top = "-99999px";
    //ev.target.style.left = "-99999px";
    mouse.move = true;
}

function dragover_handler(ev) {
    var id = ev.dataTransfer.getData("text");
    var anim = findVertice(mouse.idVertice);
    if (anim != undefined) {
        if (anim[0].vertices[anim[2]][0].parentNode != null)
            anim[0].vertices[anim[2]][0].parentNode.removeChild(anim[0].vertices[anim[2]][0]);

        anim[0].vertices[anim[2]][0].style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
        anim[0].vertices[anim[2]][0].style.top = (ev.pageY - 71) + "px";
        anim[0].vertices[anim[2]][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
        anim[0].vertices[anim[2]][2] = ev.pageY - 71;

        anim[0].svg.parentNode.removeChild(anim[0].svg);
        anim[0].svg = updatePolygon(anim[0], String(anim[1] + 1));
        document.getElementById("svg").appendChild(anim[0].svg);
        //setTimeout(function(){
        document.getElementById("divCanvas").appendChild(anim[0].vertices[anim[2]][0]);
        //}, 15);
        
    }


    ev.preventDefault();
    // Define o dropEffect para ser do tipo move
    ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
    ev.preventDefault();
    // Pega o id do alvo e adiciona o elemento que foi movido para o DOM do alvo
    var id = ev.dataTransfer.getData("text");
    var object = document.getElementById(id);
    if (object != null && object.parentElement != null)
        object.parentElement.removeChild(object);

    object.style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
    object.style.top = (ev.pageY - 71) + "px";
    console.log("drop_handler() -", id, " Move to", object.style.left, object.style.top);


    var anim = findVertice(id);
    console.log("dragover_handler()", findVertice(id));
    if (anim != undefined) {
        console.log("Redraw", anim);
        anim[0].vertices[anim[2]][0].style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
        anim[0].vertices[anim[2]][0].style.top = (ev.pageY - 71) + "px";
        anim[0].vertices[anim[2]][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
        anim[0].vertices[anim[2]][2] = ev.pageY - 71;
        anim[0].svg.parentNode.removeChild(anim[0].svg);
        anim[0].svg = updatePolygon(anim[0], String(anim[1]));
        document.getElementById("svg").appendChild(anim[0].svg);
    }

    // Update point
    for (var index = 0; index < mouse.vertice.length; index++) {
        if (mouse.vertice[index][0].id == id) {
            mouse.vertice[index][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
            mouse.vertice[index][2] = ev.pageY - 71;
            console.log("Update point", id, mouse.vertice[index][1], mouse.vertice[index][2]);
        }
    }
    mouse.move = false;
    console.log("drag - finish");
    document.getElementById("divCanvas").appendChild(object);   
    if (data.drawing == "select" && mouse.vertice.length > 0){
        mouse.select = false;
        data.drawing = "select";

        mouse.vertice[mouse.vertice.length - 1][0].parentElement.removeChild(mouse.vertice[mouse.vertice.length - 1][0]);

        console.log("Select ",mouse.vertice[mouse.vertice.length - 1][0].id," - Move to", ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2), ev.pageY - 71);
        mouse.vertice[mouse.vertice.length - 1][0].style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
        mouse.vertice[mouse.vertice.length - 1][0].style.top = (ev.pageY - 71) + "px";
        mouse.vertice[mouse.vertice.length - 1][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
        mouse.vertice[mouse.vertice.length - 1][2] = ev.pageY - 71;

        data.anim.push(createDrawing(data.drawing, mouse.vertice, mouse.polygon[mouse.polygon.length-1]));
        
        var anim = findVertice(mouse.vertice[mouse.vertice.length - 1][0].id);
        if (anim != undefined) {
            console.log(anim);
            anim[0].svg.parentNode.removeChild(anim[0].svg);
            anim[0].svg = updatePolygon(anim[0], String(anim[1] + 1));
            document.getElementById("svg").appendChild(anim[0].svg);
        }
        var element = document.getElementById("divCanvas");
        element.appendChild(mouse.vertice[mouse.vertice.length - 1][0]);

        mouse.polygon.push(polygon);
        
        //mouse.vertice[mouse.vertice.length - 2][0].draggable = mouse.vertice[mouse.vertice.length - 1][0].draggable = "true";
        //mouse.vertice[mouse.vertice.length - 2][0].ondragstart = mouse.vertice[mouse.vertice.length - 1][0].ondragstart = dragstart_handler;
        //mouse.vertice[mouse.vertice.length - 2][0].ondragend = mouse.vertice[mouse.vertice.length - 1][0].ondragend = dragEnd;
        mouse.vertice = [];
    }
    mouse.select = false; 
}

function dragEnd(ev) {

    data.canvas.style.zIndex = "0";
    data.svg.style.zIndex = "1";
}