(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,function(e,o,t){e.exports=t(12)},,,,,function(e,o,t){},function(e,o,t){},,function(e,o,t){"use strict";t.r(o);var n=t(0),a=t.n(n),c=t(2),i=t.n(c),r=(t(9),t(3));t(10);var s=function(){var e=window.localStorage.getItem("auth")||!1,o=a.a.useState(e),n=Object(r.a)(o,2),c=n[0],i=(n[1],window.location.origin+"/callback"),s=t(11);return s.accessToken="pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ",a.a.useEffect((function(){if(new s.Map({container:"root",style:"mapbox://styles/mapbox/dark-v10",zoom:3}).on("click",(function(e){window.location.hash||c?(window.localStorage.setItem("auth",!0),fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(e.lngLat.lng.toString(),",").concat(e.lngLat.lat.toString(),".json?&access_token=").concat(s.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.features.map((function(e){"country"===e.place_type[0]&&console.log(e)}))})).catch((function(e){console.log(e)}))):window.location="https://accounts.spotify.com/authorize?client_id=9e71a4da3ee24d31ab4fd842607cce9e&response_type=token&redirect_uri="+encodeURIComponent(i)+"&scope="+encodeURIComponent("user-read-private user-read-email")+"&show_dialog=true"})),window.location.hash){var e=window.location.hash.substr(1).split("=")[1].split("&")[0];console.log(e)}}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{id:"map",className:"App"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.67cf1b8e.chunk.js.map