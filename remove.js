function removeVertices() {
    var vertices = document.getElementsByClassName("vertice");
    if (vertices.length <= 0)
        return;
    for (var index = vertices.length - 1; index >= 0; index--) {
        console.log("Delete", vertices[index]);
        vertices[index].parentNode.removeChild(vertices[index]);
    }
}

function removeSelects() {
    var selects = document.getElementsByTagName("polygon");
    if (selects.length <= 0)
        return;
    for (var index = selects.length - 1; index >= 0; index--) {
        if (selects[index].id.substring(0, 6) == "select") {
            console.log("Delete", selects[index]);
            selects[index].parentNode.removeChild(selects[index]);
        }
    }

    var vertices = document.getElementsByClassName("vertice");
    if (vertices.length <= 0)
        return;
    for (var index = vertices.length - 1; index >= 0; index--) {
        if (vertices[index].id.substring(0, 6) == "select") {
            console.log("Delete", vertices[index]);
            vertices[index].parentNode.removeChild(vertices[index]);
        }
    }
}