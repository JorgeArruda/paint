function init() {
    data.canvas = document.getElementById("canvas");
    data.context = data.canvas.getContext("2d");
    data.svg = document.getElementById("svg");
    console.log("svg", svg);

    data.color = document.getElementById('color').value;
    setEvent();
}

function buttonDelete(ev) {
    var vertex = document.getElementsByClassName("vertice");
    if (vertex.length > 0 && data.drawing != "select"){
        var anim = findVertice(vertex.item(0).id)[0];
        anim.svg.parentNode.removeChild(anim.svg);
        anim.show = false;
    }
    removeVertices();
    removeSelects();
    mouse.vertice = [];
}