// JASEN: Access the device's camera
angular.module('freshly.servicesCapture', [])
  .factory('Capture', function($q) {
    // var onSuccess = function(imgURI) {
    //   console.log(imgURI);
    // };
    // var onFailure = function() {
    //   console.log('Photo failed')
    // };
    // var cameraOptions = {
    //   destinationType: Camera.DestinationType.FILE_URI
    // };
    // return {
    //   capture: function() {
    //     navigator.camera.getPicture(onSuccess, onFailure, cameraOptions);
    //   }
    // };
    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    };
  });
  // .factory('Camera', ['$q', function($q) {
    // return {
    //   getPicture: function(options) {
    //     var q = $q.defer();

    //     navigator.camera.getPicture(function(result) {
    //       // Do any magic you need
    //       q.resolve(result);
    //     }, function(err) {
    //       q.reject(err);
    //     }, options);

    //     return q.promise;
    //   },
  //     renderPicture: function (input) {
  //       if (input.files && input.files[0]) {
  //         var reader = new FileReader();

  //         reader.onload = function (e) {
  //           // For app-capture.html
  //           $('.capturePhoto').attr('src', e.target.result);
  //           // For activity.html
  //           $('.full-image').attr('src', e.target.result);
  //         };

  //         reader.readAsDataURL(input.files[0]);
  //       }
  //     }
  //   };
  // }]);
