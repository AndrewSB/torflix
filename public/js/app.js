var torflixApp = angular.module('torflixApp', ['ngRoute'])

// MainCtrl ============================================
// - Send a GET request to server and receive info for the file to serve
// - Redirect to the /video page
// - Set the source of the video to the right file
torflixApp.controller('MainCtrl', ['$scope', '$http', 'sharedProperties', function($scope, $http, sharedProperties) {

	$scope.torrent = {
		query: "",
		file: ""
	}	

	$scope.addTorrent = function() {
		
		console.log("Submitted query: " + $scope.torrent.query)

		torrentHttp = '//localhost:8000/stream/' + $scope.torrent.query
		$http({
			method: 'GET',
			url: torrentHttp
		})
		.success(function(data, status, headers, config) {
			// sharedProperties.setFile(data)
			$scope.filesource = data.filesource
			console.log('Recieved file location: ' + sharedProperties.getFile().filesource)
		})
		.error(function(data, status, headers, config) {
			console.log('ERROR: something went wrong during the GET request to //localhost:8000/stream/' + $scope.torrent.query)
		})
	}

}])

// QUESTION - 
// Is it okay to keep everything inside the MainCtrl even though 
// I'm using 2 views? The video view only needs the path to the
// video file. Will I be able to update a $scope variable even
// thought the view is not being displayed at the time of the 
// update? 

/* NOTE - This is what the file object should look like:
   
   {
	filesource: "path/to/video/file"
   }

*/


// Service for sharing variables  ======================
torflixApp.service('sharedProperties', function() {

	var file = 
	{ 
		filesource: "path/to/video/file"
	}

	return {
		getFile: function() {
			return file
		},
		setFile: function(data) {
			file = data
		}
	}

})


// Routing and config ==================================
torflixApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider
	.when('/', {
		controller: 'MainCtrl',
		templateUrl: 'views/input.html'

	})
	.when('/stream', {
		templateUrl: 'views/video.html'
	})
	.otherwise({
		redirectTo: '/'
	})

}])
