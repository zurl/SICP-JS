//Copyright zcy 2016-2016
//under MIT LICENSE
//SICP IN JAVASCRIPT
//A little practice
var { _ } = require('./test.js');


var fib = x => (x == 0 || x == 1) ? 1 : fib(x - 1) + fib(x - 2);

_.test("fib", () => fib(30));

var abs = x => x > 0 ? x : -x;
var square = x => x * x;
var cube = x => x * x * x;
var eps = 0.001;
const PI = 3.1415926;
var avg = (x, y) => (x + y) / 2;
{
    let good_enough = (guess, x) => abs(x - square(guess)) < eps;
    let improve_guess = (guess, x) => avg(guess, x / guess);
    let sqrt_iter = (guess, x) => good_enough(guess, x) ? guess : sqrt_iter(improve_guess(guess, x), x);
    var sqrt_slow = x => sqrt_iter(1, x);
}

_.test("sqrt_slow", () => sqrt_slow(100));

{
    let good_enough = (guess, x) => abs(x - cube(guess)) < eps;
    let improve_guess = (guess, x) => (x / guess / guess + 2 * guess) / 3;
    let sqrt_3rd_iter = (guess, x) => good_enough(guess, x) ? guess : sqrt_3rd_iter(improve_guess(guess, x), x);
    var sqrt_3rd = x => sqrt_3rd_iter(1, x);
}

_.test("sqrt_3rd", () => sqrt_3rd(81));

{
    let sin_expr = x => (3 * x - 4 * cube(x));
    var sin = x => x < 0.1 ? x : sin_expr(sin(x / 3));
}

_.test("sin", () => sin(PI / 3));

var pow = (a, n) => n == 0 ? 1 : a * pow(a, n - 1);
var fast_pow = (a, n) => n == 0 ? 1 : (n % 2 == 1 ? a * fast_pow(a, n - 1) : square(fast_pow(a, n / 2)));
_.test("pow", () => pow(1.0000001, 10000));
_.test("fast_pow", () => fast_pow(1.0000001, 10000));

var gcd = (a, b) => b == 0 ? a : gcd(b, a % b);

{
    let find_factor = (guess, x) => guess > square(x) ? x : (x % guess == 0 ? guess : find_factor(guess + 1, x));
    var isPrime = x => find_factor(2, x) == x;
}

_.assert("isPrime", () => isPrime(1000007), true);

var fast_pow_mod = (a, n, mod) => n == 0 ? 1 : (n % 2 == 1 ? (a * fast_pow(a, n - 1)) % mod : square(fast_pow(a, n / 2)));

{
    let cons = (x, y) => (z) => z ? y : x;
    let car = (x) => x(0);
    let cdr = (x) => x(1);

    _.assert("car", () => car(cons(1, 2)), 1);
    _.assert("cdr", () => cdr(cons(10, 196)), 196);
}

var zero = f => x => x;
var plus_one = n => f => x => f(n(f)(x));
var one = f => x => f(x);
var two = f => x => f(f(x));
var plus = (m, n) => f => x => m(f)(n(f)(x));
var suc = x => x + 1;
var toNumber = (x) => x(suc)(0);

_.assert("church_algebra", () => toNumber(plus(plus(two, two), two)), 6);

var cons = (a, b) => [a, b];
var car = (x) => x[0];
var cdr = (x) => x[1];

var list = function () {
    if (arguments.length == 1) return [arguments[0], []];
    else return [arguments[0], list.apply(this, Array.from(arguments).slice(1))];
};

var map = (list, proc) => list.length == 0 ? [] : [proc(list[0]), map(list[1], proc)];
_.list(map(list(1, 2, 3, 4), x => x * x));

var filter = (list, proc) => list.length == 0 ? [] : (proc(list[0]) ? [list[0], filter(list[1], proc)] : filter(list[1], proc));
_.list(filter(list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), x => x % 2 == 0));

var reduce = (list,proc) => cdr(list).length == 0 ? car(list) : proc(car(list),reduce(cdr(list),proc));
_.out(reduce(list(1,2,3,4,5),(x,y)=>x+y));


var list_length = list => list.length == 0 ? 0 : list_length(cdr(list)) + 1;
var list_tail = (list, n) => list_length(list) == n ? list : list_tail(cdr(list), n);
var list_head = (list, n) => n == 0 ? [] : cons(car(list), list_head(cdr(list), n - 1));
var merge_sort = (list, cmp) => {
    var merge = (left, right) => {
        if (left.length == 0) return right;
        if (left.length == 0) return left;
        return car(left) > car(right) ?
            cons(car(right), merge(left, (cdr(right)))) : cons(car(left), merge(right, (cdr(left))));
    };
    let len = list_length(list); let half = Math.floor(len / 2);
    return half == 0 ? list : merge(merge_sort(list_head(list, half), cmp), merge_sort(list_tail(list, len - half), cmp))
}

var list_generator = (n) => n == 0 ? [] : [Math.random() * 1000, list_generator(n - 1)];
var list0 = list_generator(99);
_.test("lisp sort", () => merge_sort(list0, (x, y) => x > y), false);
var array_generator = (n) => n == 0 ? [] : [n].concat(array_generator(n - 1));
var array0 = array_generator(99)
_.test("js sort", () => array0.sort(), false);
var isNum = x=>/[0-9\.]/.test(x);
var isLetter = x=>/[A-Za-z]/.test(x);
{
    let tokenize = (str,groupBy)=>Array.from(str).reduce((prev,next)=>{
        if(prev.length == 0)return [next];
        if(groupBy(prev[prev.length - 1]) != groupBy(next))return prev.concat([next]);
        else {prev[prev.length - 1] += next; return prev;}
    },[]);
    _.test("token",()=>tokenize("1231*244+6*x+7*y*x+4*x*y",x=>isNum(x)?"0":isLetter(x)?"1":x),false);
    let push_stack = (Sope,ope,eval)=>{
        if(stack.length!=0 && eval(stack[stack.length-1]) > eval(ope))return push_stack(stack.slice(-1)).concat([ope]);
        else return stack.concat([ope]);
    }
    let mid_to_pre = (tokens,eval,Sope = [],Snum = [])=>{
        if(tokens.length == 0)return 
        else if(isNum(tokens[0]) || isLetter(tokens[0]))return midToSuf(tokens.slice(1),Sope,Snum.concat([tokens[0]]));
        else midtoSuf(tokens.slice(1),push_stack(stack,toekns[0],eval),Snum.concat([tokens[0]]))
    }
    _.out(mid_to_pre(tokenize("1231*244+6*x+7*y*x+4*x*y",x=>isNum(x)?"0":isLetter(x)?"1":x),x=>{
        return (x=='+'||x=='-')?1:2;
    }));
}


_.status();