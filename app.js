//global var
var data_from_api = [];
var address_of_restaurant;
var image_of_restaurant;
var next_page = [];
var next_token;
var user_lat;
var user_lng;
var toContinue = false;
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0333332,34.7666636&radius=1500&type=restaurant&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A&fields=opening_hours,photos,rating.json'

//gets all information needed

var data_from_api = [];
//our query with api-key included Gosh-Dan Location
function getdatafirsttry(url)
{
    if (navigator.geolocation) { //check if geolocation is available
        navigator.geolocation.getCurrentPosition(function(position){
            user_lat=position.coords.latitude;user_lng = position.coords.longitude;
        });   
    }
    fetch(url,{method: 'get'})
    .then(response =>
        response.json())
    .then(data => {
    next_token = data.next_page_token;
    
    if(next_token !== undefined){
    url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0333332,34.7666636&radius=1500&type=restaurant&key=AIzaSyCbaehPkHsIMdyfCjDRdfMlZHSVrl12E_A&fields=opening_hours,photos,rating.json&pagetoken='+next_token;
    toContinue = true;
    }
    else{toContinue=false}
    
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
        //geo - check
        var place_lat = data.results[i].geometry.location.lat;
        var place_lng = data.results[i].geometry.location.lng;
        var distance_from_user = getDistanceFromLatLonInKm(user_lat,user_lng,place_lat,place_lng)
        //is open?!
        if(data.results[i].opening_hours){
        var isOpen = data.results[i].opening_hours.open_now;}else{isOpen = "Null"}
        //add to an object
        data_from_api.push(name_of_restaurant,distance_from_user,isOpen,image_of_restaurant);
        
    }
    console.log(data_from_api);
} ).then( (success, err) => {
    if (err) { console.error(err); }
    if(toContinue){
        console.log(url)
    alltogheter(url);
    }
})


}

//////------- Get User Location---------////////
function getLocation() {
    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function geoSuccess(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        alert("lat:" + lat + " lng:" + lng);
    }



////////////--------- Calc The distance From 2 points (lat lng)-------------////////////
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }



//Next page token
function alltogheter(url)
{
   
    getdatafirsttry(url);

}
getdatafirsttry(url);
