var torflixApp = angular.module('torflixApp', [])

// MainCtrl ============================================
// - Send a GET request to server and receive info for the file to serve
// - Redirect to the /video page
// - Set the source of the video to the right file
torflixApp.controller('MainCtrl', ['$scope', '$http', 'sharedProperties', function($scope, $http, sharedProperties) {

	var torrent = ""

	$scope.addTorrent = function() {
		torrent = $scope.torrent
		console.log("Submitted query: " + $scope.torrent)


		$http({
			method: 'GET',
			url: '//localhost:8000/stream/' + torrent
			console.log('GET: ' + '//localhost:8000/stream/' + torrent)
		})
		.success(function(data, status, headers, config) {
			// sharedProperties.setFile(data)
			$scope.filesource = data.filesource
			console.log('Recieved file location: ' + sharedProperties.getFile().filesource)
		})
		.error(function(data, status, headers, config) {
			console.log('ERROR: something went wrong during the GET request to //localhost:8000/stream/' + torrent)
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
		templateUrl: 'views/input.html'
	})
	.when('/stream', {
		templateUrl: 'views/video.html'
	})
	.otherwise({
		redirectTo: '/'
	})

}])
