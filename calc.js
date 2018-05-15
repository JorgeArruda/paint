function calcCenterVertex(vertices, returnVertices = false) {
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

    return !returnVertices ? [(maxX + minX) / 2, (maxY + minY) / 2] : [
        [(maxX + minX) / 2, (maxY + minY) / 2],
        [minX, minY],
        [maxX, maxY]
    ];
}

function calcAreaPolygon(vertices) {
    vertices.push(vertices[0]);
    var area = 0;
    for (var index = 0; index < vertices.length - 1; index++) {
        area = area + (Number(vertices[index][1]) * Number(vertices[index + 1][2]) - Number(vertices[index + 1][1]) * Number(vertices[index][2]));
    }
    vertices.pop();
    //return area/2>=0 ? area/2 : -(area/2);
    return area / 2;
}

function calcCentroidPolygon(vertices, area) {
    vertices.push(vertices[0]);
    var centro_x = 0;
    var centro_y = 0;
    for (var index = 0; index < vertices.length - 1; index++) {
        centro_x = centro_x + ((Number(vertices[index][1]) + Number(vertices[index + 1][1])) * (Number(vertices[index][1]) * Number(vertices[index + 1][2]) - Number(vertices[index + 1][1]) * Number(vertices[index][2])));
        centro_y = centro_y + ((Number(vertices[index][2]) + Number(vertices[index + 1][2])) * (Number(vertices[index][1]) * Number(vertices[index + 1][2]) - Number(vertices[index + 1][1]) * Number(vertices[index][2])));
    }
    vertices.pop();
    return [(centro_x / (6 * area)), (centro_y / (6 * area))];
}

function rotate_polygon(vertices, cos_angle, sin_angle, minX, minY) {
    for (var index = 0; index < vertices.length; index++) {
        var pos_x = vertices[index][1] - minX;
        var pos_y = vertices[index][2] - minY;
        vertices[index][1] = ((pos_x * cos_angle) - (pos_y * sin_angle)) + minX;
        vertices[index][2] = ((pos_y * cos_angle) + (pos_x * sin_angle)) + minY;
        vertices[index][0].style.left = (vertices[index][1] - 5) + "px";
        vertices[index][0].style.top = (vertices[index][2] - 5) + "px";
    }
    return vertices;
}

function rotate_line_simple(vertices, angle) {

    const angle_rad = ((Number(angle)) / 360) * 3.141592653589793 * 2;

    const cos_angle = Math.cos(angle_rad);
    const sin_angle = Math.sin(angle_rad);
    const minX = (vertices[0][0] + vertices[1][0]) / 2;
    const minY = (vertices[0][1] + vertices[1][1]) / 2;

    for (var index = 0; index < vertices.length; index++) {
        var pos_x = vertices[index][0] - minX;
        var pos_y = vertices[index][1] - minY;
        vertices[index][0] = ((pos_x * cos_angle) - (pos_y * sin_angle)) + minX;
        vertices[index][1] = ((pos_y * cos_angle) + (pos_x * sin_angle)) + minY;
    }
    return vertices;
}

function calc_equation_line(x1, y1, x2, y2) {
    return [(y1 - y2), (x2 - x1), ((x1 * y2) - x2 - y1)];
}

function calc_distance_point_line(line, point) {
    var [a, b, c] = calc_equation_line(Number(line[0][0]), Number(line[0][1]), Number(line[1][0]), Number(line[1][1]));
    console.log("[a, b, c]", [a, b, c]);
    var [x, y] = [Number(point[0]), Number(point[1])];
    console.log("[x, y]", [x, y]);
    return (Math.abs((a * x) + (b * y) + c)) / (Math.sqrt((a * a) + (b * b)));
}