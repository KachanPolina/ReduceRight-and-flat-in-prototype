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
		let i;
		if (this.length === 0 && startValue === undefined) {
			throw new TypeError('Empty array and StartValue === undefined');
		}
		if (startValue !== undefined) {
			result = startValue;
			i = this.length - 1;
		}
		if (startValue === undefined) {
			result = this[this.length - 1];
			i = this.length - 2;
		}
		for (; i >= 0; i--) {
			result = callback(result, this[i], i, this);
		}
		return result;
	};
}

const myArr = new MyArray();
const result = myArr.reduceRight((a, b) => a - b, 10);
console.log(result);
