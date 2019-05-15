var rect = require('./rectangle');

function solveRec(l, b) {
    console.log("Solving the rectangle with l = " + l + ' and b = ' + b);
    rect(l, b, (err, rectangle) => {
        if (err) {
            console.log("ERROR : ", err.message);
        } else {
            console.log("The Area of the rectangle l = " + l + ' b = ' + b + " is " + rectangle.area());
            console.log("The Perimeter of the rectangle is l = " + l + ' b = ' + b + " is " + rectangle.perimeter());
        }
    });
    console.log("This statement is after the call to the rect()");
}

solveRec(10, 5);
solveRec(0, 5);
solveRec(1, 50);
solveRec(5, 6);