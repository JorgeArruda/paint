function init() {
    data.canvas = document.getElementById("canvas");
    data.context = data.canvas.getContext("2d");
    data.svg = document.getElementById("svg");
    console.log("svg", svg);

    setEvent();
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

function updateSelectAnimation() {

}