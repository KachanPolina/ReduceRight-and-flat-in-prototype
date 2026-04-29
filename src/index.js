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

