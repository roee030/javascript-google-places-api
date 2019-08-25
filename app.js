//global var
var data_from_api = [];
var address_of_restaurant;
var image_of_restaurant;
var next_page = [];
var next_token;
var toContinue = false;
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0333332,34.7666636&radius=1500&type=restaurant&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A&fields=opening_hours,photos,rating.json'

//gets all information needed

var data_from_api = [];
//our query with api-key included Gosh-Dan Location
function getdatafirsttry(url)
{
    fetch(url,{method: 'get'})
    .then(response =>
        response.json())
    .then(data => {
    next_token = data.next_page_token;
    
    if(next_token !== undefined){
    url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0333332,34.7666636&radius=1500&type=restaurant&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A&fields=opening_hours,photos,rating.json&pagetoken='+next_token;
    toContinue = true;
    }
    for(var i = 0 ; i < data.results.length ; i++)
    {
        //address - check
        var address_of_restaurant = data.results[i].vicinity;
      /*  //image - check
        if(data.results[i].photos)
        { image_of_restaurant = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+data.results[i].photos[0].photo_reference+'&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A'}
        else { image_of_restaurant = undefined}
        //name - check
        var name_of_restaurant = data.results[i].name;

        //add to an object
        //data_from_api.push(name_of_restaurant,image_of_restaurant);
        //console.log(i + name_of_restaurant + address_of_restaurant  )

        //distance user from the restaurant*/
        console.log(address_of_restaurant)
    }
    
} ).then( (success, err) => {
    if (err) { console.error(err); }
    if(toContinue){
    alltogheter(url);
    }
})


}

getdatafirsttry(url);
function alltogheter(url)
{
   
    getdatafirsttry(url);

}
