app.factory('PaypalService', ['$q', '$ionicPlatform', 'shopSettings', '$filter', '$timeout', function ($q, $ionicPlatform, shopSettings, $filter, $timeout) {



        var init_defer;
        /**
         * Service object
         * @type object
         */
        var service = {
            initPaymentUI: initPaymentUI,
            createPayment: createPayment,
            configuration: configuration,
            onPayPalMobileInit: onPayPalMobileInit,
            makePayment: makePayment
        };


        /**
         * @ngdoc method
         * @name initPaymentUI
         * @methodOf app.PaypalService
         * @description
         * Inits the payapl ui with certain envs. 
         *
         * 
         * @returns {object} Promise paypal ui init done
         */
        function initPaymentUI() {

            init_defer = $q.defer();
            $ionicPlatform.ready().then(function () {

                var clientIDs = {
                    "PayPalEnvironmentProduction": shopSettings.payPalProductionId,
                    "PayPalEnvironmentSandbox": shopSettings.payPalSandboxId
                };
                PayPalMobile.init(clientIDs, onPayPalMobileInit);
            });

            return init_defer.promise;

        }


        /**
         * @ngdoc method
         * @name createPayment
         * @methodOf app.PaypalService
         * @param {string|number} total total sum. Pattern 12.23
         * @param {string} name name of the item in paypal
         * @description
         * Creates a paypal payment object 
         *
         * 
         * @returns {object} PayPalPaymentObject
         */
        function createPayment(total, name) {
                
            // "Sale  == >  immediate payment
            // "Auth" for payment authorization only, to be captured separately at a later time.
            // "Order" for taking an order, with authorization and capture to be done separately at a later time.
            //var paymentDetails = new PayPalPaymentDetails(total, "0.00", "0.00");
            var payment = new PayPalPayment("" + total, "EUR", "" + name, "Auth");
            return payment;
        }
        /**
         * @ngdoc method
         * @name configuration
         * @methodOf app.PaypalService
         * @description
         * Helper to create a paypal configuration object
         *
         * 
         * @returns {object} PayPal configuration
         */
        function configuration() {
            // for more options see `paypal-mobile-js-helper.js`
            var config = new PayPalConfiguration({merchantName: shopSettings.payPalShopName, merchantPrivacyPolicyURL: shopSettings.payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: shopSettings.payPalMerchantUserAgreementURL});
            return config;
        }

        function onPayPalMobileInit() {
            $ionicPlatform.ready().then(function () {
                // must be called
                // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
                PayPalMobile.prepareToRender(shopSettings.payPalEnv, configuration(), function () {

                    $timeout(function () {
                        init_defer.resolve();
                    });

                });
            });
        }

        /**
         * @ngdoc method
         * @name makePayment
         * @methodOf app.PaypalService
         * @param {string|number} total total sum. Pattern 12.23
         * @param {string} name name of the item in paypal
         * @description
         * Performs a paypal single payment 
         *
         * 
         * @returns {object} Promise gets resolved on successful payment, rejected on error 
         */
        function makePayment(total, name) {

            var defer = $q.defer();
            total = $filter('number')(total, 2);
            $ionicPlatform.ready().then(function () {
                PayPalMobile.renderSinglePaymentUI(createPayment(total, name), function (result) {
                    $timeout(function () {
                        defer.resolve(result);
                    });
                }, function (error) {
                    $timeout(function () {
                        defer.reject(error);
                    });
                });
            });

            return defer.promise;
        }

        return service;
    }]);
    
//To use this service 


 // PaypalService.initPaymentUI().then(function () {
 //                    PaypalService.makePayment($scope.total(), "Total").then(...)
 // });
 
 
 
 
 
 // shop settings
 // include appConstant into your app.js
 
angular.module('appConstant', []).constant('shopSettings',{
   
   payPalSandboxId : 'Abtq1Of7qoCH_DTTp9BpRouEbueud3sl8zWdeapITEGsICV3r_Sggu1mNhsjAshGwfJk6fgKBbSrvWgG',
   payPalProductionId : 'production id here',
   payPalEnv: 'PayPalEnvironmentSandbox',   // for testing  production for production
   payPalShopName : 'MyShopName',
   payPalMerchantPrivacyPolicyURL : 'url to policy',
   payPalMerchantUserAgreementURL : ' url to user agreement '
    
});

