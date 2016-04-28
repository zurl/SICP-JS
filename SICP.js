//Copyright zcy 2016-2016
//under MIT LICENSE
//SICP IN JAVASCRIPT
//A little practice
var { _ } = require('./test.js');


var fib = x => ( x==0 || x== 1)?1:fib(x-1)+fib(x-2);

_.test("fib",()=>fib(16));

var abs = x=>x>0?x:-x;
var square = x=>x*x;
var eps = 0.001;
var avg = (x,y)=>(x+y)/2;
{
    let good_enough = (guess,x)=>abs(x-square(guess))<eps;
    let improve_guess = (guess,x)=>avg(guess,x/guess);
    let sqrt_iter = (guess,x)=>good_enough(guess,x)?guess:sqrt_iter(improve_guess(guess,x),x);
    var sqrt_slow = x=>sqrt_iter(1,x);
}

_.test("sqrt_slow",()=>sqrt_slow(100));

{
    let good_enough = (guess,x)=>abs(x-guess*guess*guess)<eps;
    let improve_guess = (guess,x)=>(x/guess/guess + 2*guess)/3;
    let sqrt_3rd_iter = (guess,x)=>good_enough(guess,x)?guess:sqrt_3rd_iter(improve_guess(guess,x),x);
    var sqrt_3rd = x=>sqrt_3rd_iter(1,x);
}

_.test("sqrt_3rd",()=>sqrt_3rd(81));

