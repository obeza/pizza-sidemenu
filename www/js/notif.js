app.run(function ($ionicPlatform, PushProcessingService) {

    $ionicPlatform.ready(function () {
        try {
            PushProcessingService.initialize();
        } catch (e) {
            //hide event
        }
    })
})
.factory('PushProcessingService', ["$window", "$ionicPopup", function ($window, $ionicPopup) {
    function onDeviceReady() {
        var pushNotification = window.plugins.pushNotification;
        if (ionic.Platform.isAndroid()) {
            pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {'senderID': '875736502036', 'ecb': 'onNotificationGCM'});
        } else if (ionic.Platform.isIOS()) {
            var config = {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "pushCallbacks.onNotificationAPN"
            };
            pushNotification.register(gcmSuccessHandler, gcmErrorHandler, config);
        }

        var addCallback = function addCallback(key, callback){
            if(window.pushCallbacks == undefined){
                window.pushCallbacks = {};
            }
            window.pushCallbacks[key] = callback({registered:true});
        }
    }

    function gcmSuccessHandler(result) {
        console.log("Register push notification successfully : " + result);
        if (ionic.Platform.isIOS()) {
            var mobileType = "ios";
            var mobileRegisterId = result;
            // Save the ios mobile register Id in your server database
            // call the following method on callback of save
                addCallback("onNotificationAPN", onNotificationAPN);            
        }
    }

    function gcmErrorHandler(error) {
        console.log("Error while register push notification : " + error);
    }

    var GCMid;

    return {
        getAndId:function(){
            return GCMid;
        },
        initialize: function () {
            document.addEventListener('deviceready', onDeviceReady, false);
        },
        registerID: function (id) {
            var mobileType = "android";
            GCMid = id;
            // Save the android mobile register Id in your server database
            console.log("RegisterId saved successfully.");
        },
        showNotificationGCM: function (event) {
            $ionicPopup.alert({
                title: "Pajhwok Notification",
                subTitle: event.payload.type,
                template: event.payload.message
            });
        },
        showNotificationAPN: function (event) {
            $ionicPopup.alert({
                title: event.messageFrom + "..",
                subTitle: event.alert,
                template: event.body
            });
        }
    }
}])

onNotificationAPN = function(event) {
    if (!event.registered) {
        var elem = angular.element(document.querySelector('[ng-app]'));
        var injector = elem.injector();
        var myService = injector.get('PushProcessingService');
        myService.showNotificationAPN(event);
    } else {
        console.log("Registered successfully notification..");
    }
}

function onNotificationGCM(e) {
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                var elem = angular.element(document.querySelector('[ng-app]'));
                var injector = elem.injector();
                var myService = injector.get('PushProcessingService');
                myService.registerID(e.regid);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            var elem = angular.element(document.querySelector('[ng-app]'));
            var injector = elem.injector();
            var myService = injector.get('PushProcessingService');
            myService.showNotificationGCM(e);
            break;

        case 'error':
            alert('<li>ERROR :' + e.msg + '</li>');
            break;

        default:
            alert('<li>Unknown, an event was received and we do not know what it is.</li>');
            break;
    }
}