(function(){
	var app = angular.module("app")
	app.controller("searchController", ['$scope', '$http', 'genreService', 
		function ($scope,  $http, genreService) {
		var API_KEY = 'c5850ed73901b8d268d0898a8a9d8bff';
		var pageActual = 1;
		$scope.upcoming = [];
		
    	$scope.open = function (movie){
    		$scope.movieSelected = movie;
    	};

		$scope.loadCollections = function(){	
			loadMovies();
			loadGenres();
		}

		loadMovies = function() {
			var promise = $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' + API_KEY + '&language=en-US&page=' + pageActual);
			promise.then(successCallback, failureCallBack)

			function successCallback (result) {
				if (pageActual < result.data.total_pages - 1){
					for (var i = result.data.results.length - 1; i >= 0; i--) {
						$scope.upcoming.push(result.data.results[i]);
					}
					pageActual = pageActual + 1;
					loadMovies();
				}
			}

			function failureCallBack(result){
				console.log("failureCallBack", result)
			}
		}

		loadGenres = function(){
			genreService.getGenres().then(
				function( genres ) {
					$scope.genres = genres;
				});			
		}

		$scope.getGenresNames = function(ids_list){
			var genres = "";
			if (ids_list) {
				for (var i = 0; i < ids_list.length; i++) {
				genres = genres + getGenreName(ids_list[i]) + ", " ;
				}
			}
			return genres;
		}

		getGenreName = function(genreId){
			var genre = "";
			for (var i = 0; i < $scope.genres.length; i++) {
				if(genreId == $scope.genres[i].id){
					genre = $scope.genres[i].name;
				}
			}
			return genre;
		}
	}])
})();