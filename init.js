function init() {
    data.canvas = document.getElementById("canvas");
    data.context = data.canvas.getContext("2d");

    data.canvas.onmousemove = function (e) {
        if (mouse.move) {
            console.log("canvas.onmousemove()", mouse.idVertice);
        }
    };

    data.canvas.onclick = function (e) {
        console.log("canvas.onclick()");
        if (data.drawing == undefined)
            return;
        mouse.vertice.push([0, e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71]);
        drawVertice(e.pageX - (window.innerWidth / 2 - data.canvas.width / 2), e.pageY - 71);

    };

    var buttonDraws = document.getElementsByClassName("drawing");
    for (var index = 0; index < buttonDraws.length; index++) {
        buttonDraws[index].onclick = function (ev) {
            console.log("drawingClick", ev.target.id);
            if (ev.target.style.boxShadow == "rgb(204, 204, 204) 0px 0px 10px") {
                ev.target.style.boxShadow = "none";
            } else {
                ev.target.style.boxShadow = "rgb(204, 204, 204) 0px 0px 10px";
            }

            var buttonDraws = document.getElementsByClassName("drawing");
            for (var index = 0; index < buttonDraws.length; index++) {
                if (ev.target.id != buttonDraws[index].id) {
                    buttonDraws[index].style.boxShadow = "none";
                }
            }

            if (data.drawing == ev.target.id)
                data.drawing = undefined;
            else
                data.drawing = ev.target.id;

            removeVertices();
            mouse.vertice = [];
            
        };
    }
}