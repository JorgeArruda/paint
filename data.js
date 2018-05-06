var data = {
    canvas: undefined,
    context: undefined,
    svg: undefined,
    drawing: undefined,
    transform: undefined,
    color: undefined,
    states: [],
    anim: []  // createDrawing()
};

var mouse = {
    clickX: [],
    clickY: [],
    paint: undefined,
    select: undefined,
    vertice: [], //[<img>, posX, posY]
    polygon: [],
    move: false,
    idVertice: 0
};

/**
 * @param {[string]} operation [ point/line/triangle/rectangle/polygon/star/select ]
 * @param {any[]} vertice [ Array of vertices, a vertex is [DOM <img>, posX, posY] ]
 * @param {[object]} svg [ DOM <line/polygon/polyline> ]
 */
function createDrawing(operation, vertice, svg) {
    var drawing = {
        color: data.color,
        type: operation,
        vertices: vertice, //[<img>, posX, posY]
        svg: svg,
        numVertice: getNumVertice(operation),
        show: true
    };

    return drawing;
}

/**
 * [Return object (drawing) and indices of vertex position, in a array]
 * @param {[string]} idVertice 
 */
function findVertice(idVertice) { // type _ anim.lenght-1 _ vertice.lenght
    var ret = [];
    if (data.anim[Number(idVertice.split("_")[1])] == undefined){
        for (let index = 0; index < mouse.vertice.length; index++) {
            if (mouse.vertice[index][0].id == idVertice)
                return mouse.vertice[index];
        }
        return;
    }
    ret.push(data.anim[Number(idVertice.split("_")[1])]);
    ret.push(Number(idVertice.split("_")[1]));
    ret.push(Number(idVertice.split("_")[2])-1);
    return ret;
}

/**
 * @param {[string]} idPolygon 
 * @return [Return object (drawing) and indice of polygon position, in a array]
 */
function findPolygon(idPolygon) {
    
    var ret = [];
    if (data.anim[Number(idPolygon.split("_")[1])-1] != undefined){
        ret.push(data.anim[Number(idPolygon.split("_")[1])-1]);
        ret.push(Number(idPolygon.split("_")[1])-1);
        return ret;
    }
}

function getNumVertice(type) {
    if (type == "point")
        return 1;
    if (type == "line")
        return 2;
    if (type == "triangle")
        return 3;
    if (type == "rectangle")
        return 4;
    if (type == "star")
        return 5;
    if (type == "openPolygon" || type == "openPolygon")
        return mouse.vertice.length;
}