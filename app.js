//global var
var data_from_api = [];
var next_token;
var address_of_restaurant;
var image_of_restaurant;
var next_page = true;
//gets all information needed
function apiGetAll () {
var data_from_api = [];
//our query with api-key included Gosh-Dan Location
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0333332,34.7666636&radius=1500&type=restaurant&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A&fields=opening_hours,photos,rating'

fetch(url, {
    method: 'get'
}).then(response =>response.json()).then(data => {
    for(var i = 0 ; i < data.results.length ; i++)
    {
        //address - check
        var address_of_restaurant = data.results[i].vicinity;
      
        //name
        var name_of_restaurant = data.results[i].name;
      
        console.log(address_of_restaurant);
    }

   //console.log(data_from_api);

} )

}

apiGetAll();
