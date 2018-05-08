function setEvent() {
    // Canvas mouse events
    data.svg.onmousemove = data.canvas.onmousemove = function (e) {
        if (mouse.select)
            updateSelectAnimation(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
    };
    data.svg.onclick = data.canvas.onclick = function (e) {
        if (data.drawing != undefined && data.drawing != "edit" && data.drawing != "select" && data.drawing != "translate" && data.drawing != "rotate" && data.drawing != "shear" && data.drawing != "scale" && data.drawing != "mirror") {
            if (mouse.vertice.length == 0)
                removeVertices();
            drawVertice(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
        }
        updateSelectAnimation(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
    };
    data.svg.onmousedown = data.canvas.onmousedown = function (e) {
        if (data.drawing == "select" && !mouse.select) {
            removeVertices();
            removeSelects();
            var anim = startSelectAnimation(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
        }
    };
    data.svg.onmouseup = data.canvas.onmouseup = function (e) {
        mouse.select = false;
    };
    data.svg.onmouseout = data.canvas.onmouseout = function (e) {
        mouse.select = false;
    };
}