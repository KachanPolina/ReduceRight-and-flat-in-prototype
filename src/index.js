'use strict';

function MyArray(...args) {
	this.length = 0;
	for (let i = 0; i < args.length; i++) {
		this.push(args[i]);
	}
}
MyArray.prototype = new MyArrayProto();

function MyArrayProto() {
	this.push = function () {
		if (arguments) {
			for (let i = 0; i < arguments.length; i++) {
				this[this.length++] = arguments[i];
			}
		}
		return this.length;
	};
	this.reduceRight = function (callback, startValue) {
		let result;
        if(this.length === 0) return NaN;
		if (startValue !== undefined) {
			result = startValue;
			for (let i = this.length - 1; i >= 0; i--) {
				result = callback(result, this[i], i, this);
			}
			return result;
		}
		if (startValue === undefined) {
			result = this[this.length - 1];
			for (let i = this.length - 2; i >= 0; i--) {
				result = callback(result, this[i], i, this);
			}
			return result;
		}
	};
}

const myArr = new MyArray(1, 2, 3, 10);
const result = myArr.reduceRight((a, b) => a - b, 0)
console.log(result);