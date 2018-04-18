var data = {
    canvas: undefined,
    context: undefined,
    svg: undefined,
    drawing: undefined, // createDrawing()
    color: undefined,
    states: [],
    anim: []
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

function createDrawing(operation, vertice, svg) {
    var drawing = {
        type: operation,
        vertices: vertice, //[<img>, posX, posY]
        svg: svg,
        numVertice: getNumVertice(operation)
    };

    return drawing;
}