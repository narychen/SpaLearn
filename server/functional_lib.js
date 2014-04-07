var flib = (function(){

var _ = require("underscore");

function printf() { if(0) console.log.apply(undefined, arguments); }

function existy(x) { return x != null };

function truthy(x) { return (x !== false) && existy(x) };

function cat() {
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

function fail(thing){
    throw new Erro(thing);
}

function warn(thing){
    console.log(['WARNING:', thing].join(' '));
}
    
function note(thing){
    console.log(['NOTE:', thing].join(' '));
}
    
function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

function butLast(coll) {
    return _.toArray(coll).slice(0, -1);
}

function interpose (inter, coll) {
    return butLast(mapcat(function(e) {
        return construct(e, [inter]);
    }, coll));
}

printf(interpose(",", [1,2,3]));

function rename(obj, newNames) {
    return _.reduce(
        newNames,
        function(o, nu, old) {
            if (_.has(obj, old)) {
                o[nu] = obj[old]; return o;
            } else
                return o;
        },
        _.omit.apply(null, construct(obj, _.keys(newNames)))
    );
};


printf(rename({a: 1, b: 2}, {'a': 'AAA'}));


function restrict(table, pred) {
    return _.reduce(table, function(newTable, obj) {
        if (truthy(pred(obj))) return newTable;
        else
            return _.without(newTable, obj);
    }, table);
}

function _mymap(obj, iter, context){
    return _.reduce(obj, function(memo, value, index, list){
        memo.push(iter.call(context, value, index, list));
        return memo;
    }, []);
}

printf(_mymap([1, 2, 3], function(num){ return num * 3; }));

function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y });
}

var people = [{name: "Fred", age: 65}, {name: "Lucy", age: 36}];

printf(best(function(o1, o2){
    return o1.age < o2.age;
}, people));


function iterateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);
    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }
    return ret;
}

printf(iterateUntil(
    function(n) { return n+n },
    function(n) { return n <= 1024 },
    1
));

var nums = [1,2,3,null,5];
printf(_.reduce(nums, function(total, n) { return total * n }));

function repeat(times, VALUE) {
    return _.map(_.range(times), function() {
        return VALUE;
    });
}
printf(repeat(4, "Major"));

function repeatedly(times, fun) {
    return _.map(_.range(times), fun);
}
printf(repeatedly(3, function() {
    return Math.floor((Math.random()*10)+1);
}));

function _skipTake(n, coll){
    return _.reduce(_.range(0, _.size(coll), n), function(memo, value){
        memo.push(coll[value]);
        return memo;
    }, []);
}

printf('skipTake: %j', _skipTake(2, [1,2,3,4]));
printf('skipTake: %j', _skipTake(3, _.range(20)));


function curry2(fun) {
    return function(secondArg) {
        return function(firstArg) {
            return fun(firstArg, secondArg);
        };
    };
}

function partial2(fun, arg1, arg2) {
    return function(/* args */) {
        var args = cat([arg1, arg2], arguments);
        return fun.apply(fun, args);
    };
}

function partial1(fun, arg1) {
    return function(/* args */) {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    };
}

var rand = partial1(_.random, 1);

var freq = curry2(_.countBy)(_.identity);
var a = repeatedly(1000, partial1(rand, 2));
printf('freq: %j', freq(a));

function merge (argument) {
    return _.extend.apply(null, construct({}, argument));
}

var person = {fname: 'Simon'};
merge(person, {lname: 'Pertrikov'}, {age: 28}, {age: 108});
printf(person);

function Queue (elems) {
    this._q = elems;
}

Queue.prototype = {
    constructor: Queue,
    enqueue: function(thing){
        return new Queue(this._q + thing);
    }
};

printf(new Queue([1,2,3]));
printf((new Queue([1,2,3])).enqueue(108));


function randString(len){
    var ascii = repeatedly(len, partial1(rand, 26));
    return _.map(ascii, function(n){
        return n.toString(36);
    }).join('');
}
    
function trampoline(fun){
    var ret = fun.apply(fun, _.rest(arguments));
    while(_.isFunction(ret)){
        ret = ret();
    }
    return ret;
}

return {
    existy: existy,
    truthy: truthy,
    mapcat: mapcat,
    construct: construct,
    butLast: butLast,
    interpose: interpose,
    rename: rename,
    restrict: restrict,
    best: best,
    iterateUntil: iterateUntil,
    partial1: partial1,
    repeat: repeat,
    repeatedly: repeatedly,
    curry2: curry2,
    partial2: partial2,
    partial1: partial1,
    merge: merge,
    rand: rand,
    randString: randString,
    trampoline: trampoline,
    fail: fail,
    warn: warn,
    note: note

};

})();


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = flib;
    }
}else{
    this.flib = flib;
}
