/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

function registerCard(success,error,opts) {
	var regData = opts[0];
	var cardNumber = opts[1];
	var cardExpirationMonth = opts[2];
	var cardExpirationYear = opts[3];
	var cardCvx = opts[4];

	mangoPay.cardRegistration.baseURL = regData.baseURL;
	mangoPay.cardRegistration.clientId = regData.clientId;

	var cardRegisterData = {
		cardRegistrationURL: regData.cardRegistrationURL,
		preregistrationData: regData.preregistrationData,
		accessKey: regData.accessKey,
		Id: regdata.cardPreregistrationId
	};

	var cardData = {
		cardNumber: cardNumber,
		cardExpirationDate: cardExpirationMonth + "/" + cardExpirationYear,
		cardCvx: cardCvx
		cardType: regdata.cardType
	};

	mangoPay.cardRegistration.init(cardRegisterData);

	mangoPay.cardRegistration.registerCard(
		cardData,
		function(res) {
			// Success, you can use res.CardId now that points to registered card
			success(res.CardId);
		},
		function(res) {
			// Handle error, see res.ResultCode and res.ResultMessage
			error(res.ResultMessage);
		}
	);
}

module.exports = {
	registerCard : registerCard
};

