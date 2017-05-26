cordova.define("cordova-plugin-mangopay.Mangopay", function(require, exports, module) {
	var exec = cordova.require('cordova/exec');

	var errorMessages = {
		'001999'	:	'Generic Operation error',
		'001001'	:	'Unsufficient wallet balance',
		'001002'	:	'Author is not the wallet owner',
		'001011'	:	'Transaction amount is higher than maximum permitted amount',
		'001012'	:	'Transaction amount is lower than minimum permitted amount',
		'001013'	:	'Invalid transaction amount',
		'001014'	:	'CreditedFunds must be more than 0',
		'001030'	:	'User has not been redirected',
		'001031'	:	'User canceled the payment',
		'101002'	:	'The transaction has been cancelled by the user',
		'001032'	:	'User is filling in the payment card details',
		'001033'	:	'User has not been redirected then the payment session has expired',
		'001034'	:	'User has let the payment session expire without paying',
		'101001'	:	'The user does not complete transaction',
		'001401'	:	'Transaction has already been successfully refunded',
		'005403'	:	'The refund cannot exceed initial transaction amount',
		'005404'	:	'The refunded fees cannot exceed initial fee amount',
		'005405'	:	'Balance of client fee wallet insufficient',
		'005407'	:	'Duplicated operation: you cannot refund the same amount more than once for a transaction during the same day',
		'105101'	:	'Invalid card number',
		'105102'	:	'Invalid cardholder name',
		'105103'	:	'Invalid PIN code',
		'105104'	:	'Invalid PIN format',
		'101101'	:	'Transaction refused by the bank (do not honor)',
		'101102'	:	'Transaction refused by the bank (amount limit)',
		'101103'	:	'Transaction refused by the terminal',
		'101104'	:	'Transaction refused by the bank (card limit reached)',
		'101105'	:	'The card has expired',
		'101106'	:	'The card is inactive',
		'101410'	:	'The card is not active',
		'101111'	:	'Maximum number of attempts reached',
		'101112'	:	'Maximum amount exceeded',
		'101113'	:	'Maximum Uses Exceeded',
		'101115'	:	'Debit limit exceeded',
		'101116'	:	'Amount limit',
		'101199'	:	'Transaction refused',
		'101399'	:	'Secure mode: 3DSecure authentication is not available',
		'101304'	:	'Secure mode: The 3DSecure authentication session has expired',
		'101303'	:	'Secure mode: The card is not compatible with 3DSecure',
		'101302'	:	'Secure mode: The card is not enrolled with 3DSecure',
		'101301'	:	'Secure mode: 3DSecure authentication has failed',
		'001599'	:	'Token processing error',
		'105299'	:	'Token input Error',
		'105202'	:	'Card number: invalid format',
		'105203'	:	'Expiry date: missing or invalid format',
		'105204'	:	'CVV: missing or invalid format',
		'105205'	:	'Callback URL: Invalid format',
		'105206'	:	'Registration data : Invalid format',
		'02625'		:	'Invalid card number',
		'02626'		:	'Invalid date. Use mmdd format',
		'02627'		:	'Invalid CCV number',
		'02628'		:	'Transaction refused',
		'02101'		:	'Internal Error',
		'02632'		:	'Method GET is not allowed',
		'09101'		:	'Username/Password is incorrect',
		'09102'		:	'Account is locked or inactive',
		'01902'		:	'This card is not active',
		'02624'		:	'Card expired',
		'09104'		:	'Client certificate is disabled',
		'09201'		:	'You do not have permissions to make this API call',
		'02631'		:	'Delay exceeded',
		'009999'	:	'Browser does not support making cross-origin Ajax calls',
		'001596'	:	'An HTTP request was blocked by the User\'s antivirus',
		'001597'	:	'An HTTP request failed',
		'001598'	:	'A cross-origin HTTP request failed',
		'101699'	:	'CardRegistration should return a valid JSON response'
	};

	module.exports  = {
		registerCard: function(options, successCallback, errorCallback) {
			options.cardExpirationMonth = ("00" + options.cardExpirationMonth.toString()).substr(-2);
			options.cardExpirationYear = ("00" + options.cardExpirationYear.toString()).substr(-2);
			
			var mangopayError = function(error) {
				if (error.substr(0,10) == 'errorCode=') {
					if (error.substr(10) in errorMessages) {
						errorMessage = errorMessages[ error.substr(10) ];
					} else {
						errorMessages = error.substr(10);
					}
				} else {
					errorMessage = error;
				}
				errorCallback(errorMessage);
			};

			return cordova.exec(successCallback, mangopayError, "Mangopay", "registerCard", [
				options.cardRegistrationURL, options.preregistrationData, options.accessKey, options.clientId, options.baseURL, options.cardPreregistrationId, options.cardNumber, options.cardExpirationMonth, options.cardExpirationYear, options.cardCvv
			]);
		}
	};
});
