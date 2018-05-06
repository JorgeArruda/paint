function init() {
    data.canvas = document.getElementById("canvas");
    data.context = data.canvas.getContext("2d");
    data.svg = document.getElementById("svg");
    console.log("svg", svg);

    data.color = document.getElementById('color').value;
    setEvent();
}