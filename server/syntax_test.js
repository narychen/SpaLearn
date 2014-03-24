//var util = require("util");
//var events = require("events");
var _ = require("underscore");
//
//function MyStream() {
//    events.EventEmitter.call(this);
//    this.__MyStream = {
//        _events: "",
//        _maxListeners: 0
//    }
//}
//
//util.inherits(MyStream, events.EventEmitter);
//
//_.extend(MyStream.prototype, {
//    write: function(data){
//        this.__MyStream._events = "This will not override the super member but it's odd";
//        this.emit("data", data);
//    },
//
////    on: function(){
////        console.log("my on");
////        events.EventEmitter.prototype.on.apply(this, arguments);
////    },
//
//    constructor: MyStream
//});
//
//var stream = new MyStream();
//
//console.log(stream instanceof events.EventEmitter); // true
//console.log(stream instanceof MyStream); // true
//
//stream.on("data", function(data) {
//    console.log('Received data: "' + data + '"');
//})
//stream.write("It works!"); // Received data: "It works!"


//function BaseClass(a){
//    _.extend(this, {
//        a: a
//    });
//}
//
//BaseClass.prototype.aa = function(){
//    console.log(this.a);
//}
//
//function InheritClass(a){
//    var _super = new BaseClass(a);
//    var that = Object.create(_super);
//    that.a = 'inherit';
//    that.aa = function(){
//        _super.aa();
//        console.log(that.a);
//    };
//    return that;
//}
//
//var inherit = InheritClass('super');
//inherit.aa();
//console.log(inherit instanceof BaseClass);
//
//function ThirdInherit(a){
//    var _super = InheritClass(a);
//    var that = Object.create(_super);
//    that.a = 'third';
//    that.aa = function(){
//        _super.aa();
//        console.log(that.a);
//    }
//    return that;
//}
//var third = ThirdInherit('super');
//third.aa();
//console.log(third instanceof BaseClass);

//
//function MyClass(member){
//    var privateMember = member;
//    this.getPrivateMember = function(){
//        return privateMember;
//    };
//}
//my = new MyClass("newbie");
//console.log(my.getPrivateMember());
//
//var util = require("util");
//var events = require("events");
//
//function MyStream() {
//    events.EventEmitter.call(this);
//}
//
//util.inherits(MyStream, events.EventEmitter);
//
//MyStream.prototype.write = function(data) {
//    this.emit("data", data);
//}
//
//var stream = new MyStream();
//
//console.log(stream instanceof events.EventEmitter); // true
//console.log(MyStream.super_ === events.EventEmitter); // true
//
//stream.on("data", function(data) {
//    console.log('Received data: "' + data + '"');
//})
//stream.write("It works!"); // Received data: "It works!"
//
//
//

var albums = [{title: "Sabbath Bloody Sabbath", genre: "Metal"},
                {title: "Scientist", genre: "Dub"},
                {title: "Undertow", genre: "Metal"}];
var newAlbums = _.groupBy(albums, function(a) { return a.genre });
console.log(newAlbums);

function existy(x) { return x != null };

function truthy(x) { return (x !== false) && existy(x) };

function cat() {
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
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

console.log(interpose(",", [1,2,3]));


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

console.log(rename({a: 1, b: 2}, {'a': 'AAA'}));


function restrict(table, pred) {
    return _.reduce(table, function(newTable, obj) {
        if (truthy(pred(obj))) return newTable;
        else
            return _.without(newTable, obj);
    }, table);
};

var mymap = function(obj, iter, context){
    return _.reduce(obj, function(memo, value, index, list){
        memo.push(iter.call(context, value, index, list));
        return memo;
    }, []);
}

console.log(mymap([1, 2, 3], function(num){ return num * 3; }));

function best(fun, coll) {
    return _.reduce(coll, function(x, y) {
        return fun(x, y) ? x : y });
}

var people = [{name: "Fred", age: 65}, {name: "Lucy", age: 36}];

console.log(best(function(o1, o2){
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

console.log(iterateUntil(
    function(n) { return n+n },
    function(n) { return n <= 1024 },
    1
));

var nums = [1,2,3,null,5];
console.log(_.reduce(nums, function(total, n) { return total * n }));