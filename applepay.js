if (window.ApplePaySession) {
    var merchantIdentifier = 'example.com.store';
    var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
    promise.then(function (canMakePayments) {
        if (canMakePayments) {
            $("#button_modal_applepay").show();
        }
    });
}

function settlementApplepay() {
	var request = {
		countryCode: 'JP',
		currencyCode: 'JPY',
		supportedNetworks: ['visa', 'jcb', 'masterCard'],
		merchantCapabilities: ['supports3DS'],
		total: { label: 'Treat', amount: menu_amount }
	};

	var session = new ApplePaySession(2, request);

	session.onvalidatemerchant = function (event) {
		var promise = performValidation(event.validationURL);
		promise.then(function (merchantSession) {
			session.completeMerchantValidation(merchantSession);
		});
	}

	function performValidation(valURL) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				var data = JSON.parse(this.responseText);
				resolve(data);
			};
			xhr.onerror = reject;
			xhr.open('POST', '/path/to/applepay/serverside', true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send('validationUrl='+valURL);
		});
	}

	session.onpaymentauthorized = function (event) {
        console.log('starting session.onpaymentauthorized');
        var promise = sendPaymentToken(event.payment.token);
        promise.then(function (success) {
            var status;
            if (success){
                status = ApplePaySession.STATUS_SUCCESS;
                console.log('Apple Pay Payment SUCCESS ');
            } else {
                status = ApplePaySession.STATUS_FAILURE;
            }
            session.completePayment(status);
        });
    }

function sendPaymentToken(paymentToken) {
    return new Promise(function(resolve, reject) {
        resultApplepaySettle = createTransaction(paymentToken.paymentData);
        if (resultApplepaySettle == true) {
            resolve(true);
        } else {
            reject;
        }
    });
}

function createTransaction(dataObj) {
    console.log('starting createTransaction');
    let objJsonStr = JSON.stringify(dataObj);
    let objJsonB64 = window.btoa(objJsonStr);
    $.ajax({
        url: "/path/to/applepay/serverside/third-party/payment/provider/",
        data: {
            label: label,
            total_price: total_price,
            apple_token: objJsonB64
        },
        method: 'POST',
        timeout: 5000
    }).done(function(data){
        console.log('createTransaction Success');
    }).fail(function(){
        console.log('createTransaction Error');
    })

    return true;
}

	session.begin();
};