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
    console.log("dragover_handler()");
    var id = ev.dataTransfer.getData("text");
    var anim = findVertice(id);
    if (anim) {
        anim[0].vertices[anim[2]][0].style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
        anim[0].vertices[anim[2]][0].style.top = (ev.pageY - 71) + "px";
        anim[0].vertices[anim[2]][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
        anim[0].vertices[anim[2]][2] = ev.pageY - 71;
        anim[0].svg.parentNode.removeChild(anim[0].svg);
        anim[0].svg = updatePolygon(anim[0], String(anim[1] + 1));
        document.getElementById("svg").appendChild(anim[0].svg);
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

    object.style.left = (ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2)) + "px";
    object.style.top = (ev.pageY - 71) + "px";
    console.log("drop_handler() -", id, " Move to", object.style.left, object.style.top);

    // Update point
    for (let index = 0; index < mouse.vertice.length; index++) {
        if (mouse.vertice[index][0].id == id) {
            mouse.vertice[index][1] = ev.pageX - (window.innerWidth / 2 - data.canvas.width / 2);
            mouse.vertice[index][2] = ev.pageY - 71;
            console.log("Update point", id, mouse.vertice[index][1], mouse.vertice[index][2]);
        }
    }
    mouse.move = false;
    console.log("drag - finish");
}

function dragEnd(ev) {

    data.canvas.style.zIndex = "0";
    data.svg.style.zIndex = "1";
}