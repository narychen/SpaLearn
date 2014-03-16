var util = require("util");
var events = require("events");
var _ = require("underscore");

function MyStream() {
    events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype = {
    write: function(data){
        this.emit("data", data);
    },

    on: function(){
        console.log("my on");
        events.EventEmitter.prototype.on.apply(this, arguments);
    },

    constructor: MyStream
}
   
var stream = new MyStream();

console.log(stream instanceof events.EventEmitter); // true
console.log(stream instanceof MyStream); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})
stream.write("It works!"); // Received data: "It works!"


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
     