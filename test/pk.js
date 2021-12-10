var NodeC = /** @class */ (function () {
    function NodeC() {
    }
    NodeC.prototype.pikachu = function () { };
    NodeC.prototype.getValue = function () {
        return this._value;
    };
    NodeC.prototype.setValue = function (val) {
        this._value = val;
    };
    return NodeC;
}());
var pk = new NodeC;
pk.setValue(54);
console.log(pk.getValue());
