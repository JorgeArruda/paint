function setEvent() {
    // Canvas mouse events
    data.svg.onmousemove = data.canvas.onmousemove = function (e) {
        if (mouse.select)
            updateSelectAnimation(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);
    };
    data.svg.onclick = data.canvas.onclick = function (e) {
        if (data.drawing != undefined && data.drawing != "edit" && data.drawing != "select"){
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

    // Buttons events
    var buttonDraws = document.getElementsByClassName("drawing");
    for (var index = 0; index < buttonDraws.length; index++) {
        buttonDraws[index].onclick = function (ev) {
            var buttonDraw = document.getElementsByClassName("drawing");
            console.log("drawingClick", ev.target.id);
            if (ev.target.style.boxShadow == "rgb(204, 204, 204) 0px 0px 10px") {
                ev.target.style.boxShadow = "none";
            } else {
                ev.target.style.boxShadow = "rgb(204, 204, 204) 0px 0px 10px";
            }

            for (var index = 0; index < buttonDraw.length; index++) {
                if (ev.target.id != buttonDraw[index].id) {
                    buttonDraw[index].style.boxShadow = "none";
                }
            }

            if (data.drawing == ev.target.id) {
                data.drawing = undefined;
                data.canvas.style.zIndex = "1";
                data.svg.style.zIndex = "0";
                if (ev.target.id == "polygon") {
                    console.log("ev.target.id == 'polygon'");
                    document.getElementById("divEdit").style.opacity = 0;
                    document.getElementById("divEdit").style.marginLeft = '-200px';
                }
            } else {
                data.drawing = ev.target.id;
                data.canvas.style.zIndex = "0";
                data.svg.style.zIndex = "1";
                if (ev.target.id == "polygon") {
                    console.log("ev.target.id == 'polygon'");
                    document.getElementById("divEdit").style.opacity = 1;
                    document.getElementById("divEdit").style.marginLeft = '0px';
                } else {
                    console.log("ev.target.id != 'polygon'");
                    document.getElementById("divEdit").style.opacity = 0;
                    //document.getElementById("divEdit").style.dispray = 'none';
                    document.getElementById("divEdit").style.marginLeft = '-200px';
                }
            }
            
            removeVertices();
            removeSelects();
            mouse.vertice = [];
        }
    }
}