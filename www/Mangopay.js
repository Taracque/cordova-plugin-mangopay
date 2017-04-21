var exec = cordova.require('cordova/exec');

var Mangopay = function() {
	console.log('Mangopay instanced');
};

if (typeof module != 'undefined' && module.exports) {
	module.exports = Mangopay;
}