// DrawRectangle.js

var ctx;
var canvas;

function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');
    // Draw blue rectangle
    ctx.fillStyle = 'black'; // Set canvas black
    ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
}

function drawVector(v, color) {
    ctx.strokeStyle = color;
    let cx = canvas.width / 2
    let cy = canvas.height / 2

    ctx.beginPath()
    ctx.moveTo(cx, cy);
    ctx.lineTo(200 + v.elements[0]*20, 200 - v.elements[1]*20, v.elements[2]*20)
    ctx.stroke();
}

function handleDrawEvent() {
    var x = document.getElementById('xcoord').value;
    var y = document.getElementById('ycoord').value;
    var x2 = document.getElementById('xcoord2').value;
    var y2 = document.getElementById('ycoord2').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    var v1 = new Vector3([x, y, 0.0]);
    drawVector(v1, "red");
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    var x = document.getElementById('xcoord').value;
    var y = document.getElementById('ycoord').value;
    var x2 = document.getElementById('xcoord2').value;
    var y2 = document.getElementById('ycoord2').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    var v1 = new Vector3([x, y, 0.0]);
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v1, "red");
    drawVector(v2, "blue");

    var operator = document.getElementById('opt').value
    let opc = "green"
    switch(operator) {
        case 'Add':
            v1.add(v2)
            drawVector(v1, opc)
            break;
        case 'Subtract':
            v1.sub(v2)
            drawVector(v1, opc)
            break;
        case 'Multiply':
            var scalar = document.getElementById('scalar').value;
            v1.mul(scalar)
            drawVector(v1, opc)
            v2.mul(scalar)
            drawVector(v2, opc)
            break;
        case 'Divide':
            var scalar = document.getElementById('scalar').value;
            v1.div(scalar)
            v2.div(scalar)
            drawVector(v1, opc)
            drawVector(v2, opc)
            break;
        case 'Mag':
            console.log("Magnitude v1: " + v1.magnitude())
            console.log("Magnitude v2: " + v2.magnitude())
            break;
        case "Norm":
            var v1norm = v1.normalize();
            var v2norm = v2.normalize();
            drawVector(v1norm, opc)
            drawVector(v2norm, opc)
            break;
        case "Ang":
            console.log("Angle: " + (angleBetween(v1, v2)).toFixed(2))
            break;
        case "Area":
            console.log("Area of this triangle: " + (areaTriangle(v1, v2)).toFixed(2));
            break;
        default:
            console.log("Unexpected Input")
            break;
    }

}

function angleBetween(v1, v2) {
    var mag1 = v1.magnitude()
    var mag2 = v2.magnitude()
    var d = Vector3.dot(v1, v2);

    var alpha = Math.acos(d/(mag1*mag2));
    alpha *= 180/Math.PI
    return alpha;
}

function areaTriangle(v1, v2) {
    var a = Vector3.cross(v1, v2);
    var v1 = new Vector3([a[0], a[1], a[2]]);
    return v1.magnitude() / 2
}