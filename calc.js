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