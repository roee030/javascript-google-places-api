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
while(next_page)
{
fetch(url, {
    method: 'get'
}).then(response =>response.json()).then(data => {
   
    
    for(var i = 0 ; i < data.results.length ; i++)
    {
        //address - check
        var address_of_restaurant = data.results[i].vicinity;
        //image - check
        if(data.results[i].photos)
        { image_of_restaurant = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+data.results[i].photos[0].photo_reference+'&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A'}
        else { image_of_restaurant = undefined}
        //name - check
        var name_of_restaurant = data.results[i].name;

        //add to an object
        //data_from_api.push(name_of_restaurant,image_of_restaurant);
        //console.log(i + name_of_restaurant + address_of_restaurant  )

        //distance user from the restaurant
        
    }
    

    
} )
if(data.next_page_token){
    url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0333332,34.7666636&radius=1500&type=restaurant&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A&fields=opening_hours,photos,rating&pagetoken='+data.next_page_token;
}
else{
    next_page=false;
}

}
}
apiGetAll();
