angular.module('freshly.activities', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.activities', {
    url: '/activities',
    views: {
      'app-activities': {
        templateUrl: 'app/controllers_views/activities/app-activities.html',
        controller: 'ActivitiesController'
      }
    }
  });
})

.controller('ActivitiesController', function($scope, Activities, Capture) {

  //Gets the activities list from the database
  //so the view can be updated
  $scope.refreshActivities = function() {
    return Activities.getActivities().then(function(response) {
      $scope.activities = response.data;
    });
  };

  //Hides or unhides the activity details
  //so users can view many activities at once
  $scope.toggleActivity = function(activity) {
    if (!$scope.editing) {
      if (activity._id === $scope.viewActivity) {
        $scope.viewActivity = null;
      } else {
        $scope.viewActivity = activity._id;
      }
    }
  };

  //Adds a tag to the activity object
  //so that new tags can be saved to the database
  $scope.addTag = function(activity) {
    if (activity.newTag) {
      if (!Array.isArray(activity.tags)) {
        activity.tags = [];
      }
      if (activity.tags.indexOf(activity.newTag) === -1) {
        activity.tags.push(activity.newTag);
      }
    }
    activity.newTag = '';
  };

  //Allows users to remove currently existing tags
  $scope.removeTag = function(activity, tag) {
    activity.tags.splice(activity.tags.indexOf(tag),1);
  };

  //Changes the activity view to allow editing
  $scope.editActivity = function(activity) {
    $scope.savedActivity = activity;
    $scope.editing = activity._id;
  };

  //Re-pulls activity data from the database
  //in order to unstage changes made during editing
  $scope.cancelEdit = function(activity) {
    $scope.refreshActivities().then(function() {
      $scope.editing = null;
    }).catch(function(err) {
      console.log(err);
    });
  };

  //Updates the database with an edited activity
  $scope.saveEdit = function(activity) {
    Activities.updateActivity(activity).then(function(response) {
      $scope.editing = null;
    }).catch(function(err) {
      console.log(err);
    });
  };

  //Allows users to remove activities from the database
  $scope.deleteActivity = function(activity) {
    if (confirm("Are you sure you want to delete this activity?")) {
      Activities.deleteActivity(activity._id).then(function(response) {
        console.log('Activity deleted');
        $scope.refreshActivities();
      }).catch(function(err) {
        console.log(err);
      });
    }
  };

  $scope.getPicture = function(activity) {
    console.log('[JASEN]-getPicture-activity:', activity);

    var cameraOptions = {
      //Returns file URI
      destinationType: 1
    };


    Capture.getPicture(cameraOptions).then(function(imageURI) {
      $scope.imageData.imageURI = imageURI;

      if (activity.imageIds.length === 0) {
        Activities.addImage(imageURI, activity['_id'])
          .then($scope.refreshActivities)
          .catch(function(err) {
          });
      } else {
        Activities.updateImage(imageURI, activity['_id'], 0)
          .then(function(response) {
            console.log('respooooooooooonse');
            console.log(response);
            $scope.refreshActivities();
          })
          .catch(function(err) {
            console.log('errorrrrrrrrrrrrrr');
            console.log(err);
          });
      }
    }).catch(function(err) {
      console.log(err);
    });
  };

  //Refreshes the activity list so it can be viewed
  $scope.activities = [];
  $scope.imageData = {};
  $scope.refreshActivities().catch(function(err) {
    console.log(err);
  });

});
