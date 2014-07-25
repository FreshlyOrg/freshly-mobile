angular.module('freshly.servicesActivities', [])

.factory('Activities', function($http, $q) {
  return {
    getActivities: function() {
      return $http({
        method: 'GET',
        url: 'http://fresh.ly/api/activities'
      });
    },
    addActivity: function(activity) {
      return $http({
        method: 'POST',
        url: 'http://fresh.ly/api/activities',
        data: activity,
        dataType: 'json'
      });
    },
    getActivity: function(activityId) {
      return $http({
        method: 'GET',
        url: 'http://fresh.ly/api/activities/' + activityId
      });
    },
    updateActivity: function(activity) {
      return $http({
        method: 'PUT',
        url: 'http://fresh.ly/api/activities/' + activity._id,
        data: activity,
        dataType: 'json'
      });
    },
    deleteActivity: function(activityId) {
      return $http({
        method: 'DELETE',
        url: 'http://fresh.ly/api/activities/' + activityId
      });
    },
    addImage: function(imageURI, activityId) {
      var serverURL = 'http://fresh.ly/api/activities/' + activityId + '/images';

      var options = new FileUploadOptions();
      options.httpMethod = "POST";
      options.chunkedMode = false;
      var ft = new FileTransfer();

      //Returns a promise
      var q = $q.defer()
      ft.upload(imageURI, encodeURI(serverURL), function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    updateImage: function(imageURI, activityId, imageIndex) {
      var serverURL = 'http://fresh.ly/api/activities/' + activityId + '/images/' + imageIndex;

      var options = new FileUploadOptions();
      options.httpMethod = "PUT";
      options.chunkedMode = false;
      var ft = new FileTransfer();

      //Returns a promise
      var q = $q.defer();
      ft.upload(imageURI, encodeURI(serverURL), function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      console.log('Sent image to server.');

      return q.promise;
    }
  };
});
