angular.module('myapp', [])
    .constant('API_KEY', 'MW9S-E7SL-26DU-VV8V')
    .constant('API_URL', 'http://api.bart.gov/api/')
    .factory('BartAPI', function(API_KEY, API_URL, $http){
        var bart = {};
        
        var xml2json = function(response){
        	var x2js = new X2JS();    
        	return x2js.xml_str2json(response.data);
        };

        bart.getETAs = function(station, direction, platform){
            // Default to ALL stations if station is not given
            station = station || 'ALL';
            // Construct base url for etd endpoint
            var url = API_URL + "etd.aspx";

            var params = {
                cmd: 'etd',
                orig: station,
                key: API_KEY
            };

            if (direction) {
                params.dir = direction;
            }

            if (platform) {
                params.plat = platform;
            }

            return $http.get(url , {params: params}).then(xml2json);
        };

        return bart;
    })
    .controller('HelloController', function($scope, BartAPI) {
        $scope.helloTo = {};
        $scope.helloTo.title = "Hackbright";
        $scope.etas;

        BartAPI
        	.getETAs()
        	.then(function(data){
        		$scope.etas = data;
        	});
    });