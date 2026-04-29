'use strict';

function MyArray(...args) {
	this.length = 0;
	for (let i = 0; i < args.length; i++) {
		this.push(args[i]);
	}
}
MyArray.prototype = new MyArrayProto();

MyArray.isMyArray = function (obj) {
	return obj instanceof MyArray;
};

function MyArrayProto() {
	this.push = function () {
		if (arguments) {
			for (let i = 0; i < arguments.length; i++) {
				this[this.length++] = arguments[i];
			}
		}
		return this.length;
	};
	this.pop = function () {
		if (this.length === 0) return;
		const lastItem = this[this.length - 1];
		delete this[--this.length];
		return lastItem;
	};
	this.forEach = function (callback) {
		for (let i = 0; i < this.length; i++) {
			callback(this[i], i, this);
		}
	};
	this.some = function (callback) {
		for (let i = 0; i < arr.length; i++) {
			if (callback(this[i], i, this)) {
				return true;
			}
		}
		return fasle;
	};
	this.every = function (callback) {
		for (let i = 0; i < arr.length; i++) {
			if (!callback(this[i], i, this)) {
				return fasle;
			}
		}
		return true;
	};
	this.map = function (callback) {
		const result = new MyArray();
		for (let i = 0; i < this.length; i++) {
			result.push(callback(this[i], i, this));
		}
		return result;
	};
	this.concat = function (...args) {
		const res = new MyArray();
		for (let i = 0; i < args.length; i++) {
			if (Array.isArray(args[i])) {
				res.push(...args[i]);
			} else if (MyArray.isMyArray(args[i])) {
				for (let j = 0; j < args[i].length; j++) {
					res.push(args[i][j]);
				}
			} else {
				res.push(args[i]);
			}
		}
		return res;
	};
	this.reverse = function () {
		const lengthMinusOne = this.length - 1;
		// let temp;
		for (let i = 0; i < Math.floor(this.length / 2); i++) {
			// temp = this[i];
			// this[i] = this[lengthMinusOne - i];
			// this[lengthMinusOne - i] = temp;
			[this[i], this[lengthMinusOne - i]] = [this[lengthMinusOne - i], this[i]];
		}
		return this;
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

	this.flat = function (depth = 1) {
		const result = new MyArray();
		let resultIndex = 0;
		for (let i = 0; i < this.length; i++) {
			if (!MyArray.isMyArray(this[i]) || depth === 0 ) {
				result[resultIndex++] = this[i];
			} else {
				const innerArray = this[i].flat(depth - 1);

				for (let j = 0; j < innerArray.length; j++) {
					result[resultIndex++] = innerArray[j];
				}
			}
		}

		result.length = resultIndex;
		return result;
	};
}

const innerInnerArray2 = new MyArray(2, 22, 2, 6);
const innerInnerArray1 = new MyArray(
	2,
	5,
	9,
	innerInnerArray2,
	innerInnerArray2,
);
const innerArray1 = new MyArray(3, 7, innerInnerArray1);
const innerArray3 = new MyArray(2);
const myArr = new MyArray(1, 2, innerArray1, 1, innerArray3);
console.log(myArr);
console.log(myArr.flat());
console.log(myArr);

