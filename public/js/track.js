var  mapContainer = document.getElementById("map");
var ipAddressDiv = document.getElementById("ipAddress");
var locationDiv = document.getElementById("location");
var timeZoneDiv = document.getElementById("timeZone");
var ispDiv = document.getElementById("isp");
var  ipAddress =document.getElementById("search-bar");
window.addEventListener("load", (event) => {
    ipTracker("1.6.0.0");
    });
    // get country details from ipaddress api
const ipTracker = function(ipAddress){
fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RBu2rsepucyUi00nDvJatyeJsIDt3&ipAddress=${ipAddress}`)
    .then(function (response){
      console.log(response);
      console.log(response.url);
      return response.json();
    }).then(function(response){
        console.log(response);
        console.log(response.location.lat)
    getMap(response,ipAddress)
    }).catch(err =>{
      document.getElementById("responseDiv").innerHTML=`<p style=color:red>Please Enter a valid ip address</p>`
        console.log(`ip address not found${err}`)
      })
    .finally(()=>{
      console.log("Api calling finished")
    })
  }
  // get map from latitude and longtitude
  const getMap = (data,ipAddress) => {
    mapContainer.innerHTML=`<div id="mapDiv"></div>`; 
    ipAddressDiv.innerHTML = ` <p id="ipAddreesText">IP ADDRESS</p>
    <h2 id="ipAddress_Value"> 
    ${ipAddress}
    </h2>`;
    locationDiv.innerHTML=` <p id="location_txt">LOCATION</p>
    <h2 id="loc_value">${data.location.city}</h2>`;
    timeZoneDiv.innerHTML = `  <p id="time_txt">TIMEZONE</p>
    <h2 id="time_value">UTC${data.location.timezone}</h2>`;
    ispDiv.innerHTML =  `<p id="isp_txt">ISP</p>
    <h2 id="isp_value">${data.isp}</h2>`;
    let mapOptions = {
      center: [data.location.lat,data.location.lng],
      zoom: 10,
    };
    map = new L.map("mapDiv", mapOptions);
    let layer = new L.TileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    let marker = new L.marker([data.location.lat, data.location.lng]).addTo(map).bindPopup('Your ip address.<br> Easily customizable.')
    .openPopup();;
    map.addLayer(layer);
  };
  //call getip method
function getIP(){
 
    if(ipAddress.value!=" " && ipAddress.value!=undefined && ipAddress.value!=null){
       ipTracker(ipAddress.value);
    }
}
  document.addEventListener('keydown',function(event){
    
if(event.keyCode == 13){
  ipTracker(ipAddress.value);
}
      
   
  })

