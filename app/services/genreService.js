(function(){
var app = angular.module('app');

app.service("genreService",['$http', '$q',
	function genreService($http, $q) {
		var API_KEY = 'c5850ed73901b8d268d0898a8a9d8bff';
		var URL = 'https://api.themoviedb.org/3/';
		var SEARCHGENRE = 'genre/movie/list';
		
		var vm = this;

		vm.getGenres = getGenres;
		

		function getGenres() {
                    var request = $http({
                        method: "get",
                        url: URL + SEARCHGENRE + '?api_key=' + API_KEY + '&language=en-US',
                        params: {
                            action: "get"
                        }
                    });
            return(request.then( handleSuccess, handleError ));
        }

        function handleError( response ) {         
         if ( ! angular.isObject( response.data ) || ! response.data.message) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        	return( $q.reject( response.data.message ) );
        }

        function handleSuccess( response ) {
            return( response.data );
        }
	}])
})();
