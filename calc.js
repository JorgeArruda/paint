function calcCenterVertex(vertices, returnVertices = false){
    if (vertices == undefined || vertices.length == 0)
        return;
    var minX, minY, maxX, maxY;
    minX = maxX = vertices[0][1];
    minY = maxY = vertices[0][2];
    for (var index = 1; index < vertices.length; index++) {
        minX = vertices[index][1] < minX ? vertices[index][1] : minX;
        maxX = vertices[index][1] > maxX ? vertices[index][1] : maxX;
        minY = vertices[index][2] < minY ? vertices[index][2] : minY;
        maxY = vertices[index][2] > maxY ? vertices[index][2] : maxY;
    }

    return !returnVertices ? [(maxX+minX)/2, (maxY+minY)/2] : [[(maxX+minX)/2, (maxY+minY)/2],[minX, minY],[maxX, maxY]];
}

function calcAreaPolygon(vertices) {
    vertices.push(vertices[0]);
    var area = 0;
    for (var index = 0; index < vertices.length-1; index++) {
        area = area + (Number(vertices[index][1])*Number(vertices[index+1][2]) - Number(vertices[index+1][1])*Number(vertices[index][2]));
    }
    vertices.pop();
    //return area/2>=0 ? area/2 : -(area/2);
    return area/2;
}

function calcCentroidPolygon(vertices, area) {
    vertices.push(vertices[0]);
    var centro_x = 0;
    var centro_y = 0;
    for (var index = 0; index < vertices.length-1; index++) {
        centro_x = centro_x + ((Number(vertices[index][1])+Number(vertices[index+1][1])) * (Number(vertices[index][1])*Number(vertices[index+1][2]) - Number(vertices[index+1][1])*Number(vertices[index][2])));
        centro_y = centro_y + ((Number(vertices[index][2])+Number(vertices[index+1][2])) * (Number(vertices[index][1])*Number(vertices[index+1][2]) - Number(vertices[index+1][1])*Number(vertices[index][2])));
    }
    vertices.pop();
    return [(centro_x/(6*area)), (centro_y/(6*area))];
}