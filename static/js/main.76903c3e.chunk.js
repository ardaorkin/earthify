(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{11:function(e,t,o){},13:function(e,t,o){},15:function(e,t,o){"use strict";o.r(t);var n=o(0),c=o.n(n),a=o(4),r=o.n(a),i=(o(11),o(2)),s=o.n(i),l=o(5),p=o(1);o(13);var u=function(e){var t,n=localStorage.getItem("access_token")||"",a=c.a.useState(n),r=Object(p.a)(a,2),i=r[0],u=r[1],h=c.a.useState(window.localStorage.getItem("auth")),d=Object(p.a)(h,2),f=d[0],m=(d[1],c.a.useState(localStorage.getItem("refresh_token"))),g=Object(p.a)(m,2),y=g[0],w=g[1],_=c.a.useState(!0),v=Object(p.a)(_,2);v[0];v[1],t="http://localhost:3000"!==window.location.origin?window.location.origin+window.location.pathname:window.location.origin+"/callback";var k=o(14);if(k.accessToken="pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ",null!==window.location.search.match(/\?code/g)){function j(){return(j=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.localStorage.setItem("auth",!0);case 2:return e.next=4,fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6ZjJhZjc4MjVhOTA1NGNiNWE5MmMwZDZlMWEwNDAwNTY=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(t)}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){u(localStorage.getItem("access_token")),w(localStorage.getItem("refresh_token"))})).then((function(){return window.location=window.location.origin+"/earthify"})).catch((function(e){return console.log("acees_token_respone: ",e)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){j.apply(this,arguments)}()}return c.a.useEffect((function(){new k.Map({container:"root",style:"mapbox://styles/mapbox/light-v10",zoom:3}).on("click",(function(e){if(window.location.search.match(/\?code/g)||f){function o(){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(e.lngLat.lng.toString(),",").concat(e.lngLat.lat.toString(),".json?&access_token=").concat(k.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.features.map((function(e){return"country"===e.place_type[0]&&(console.log("map_results: ",e),fetch("https://api.spotify.com/v1/search?q=".concat(encodeURIComponent("".concat(e.text," top 50")),"&type=playlist"),{method:"GET",headers:{Authorization:"Bearer ".concat(i)}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?n():void 0==e.error&&console.log("search_results: ",e);var t=[],o=[];return e.playlists.items.map((function(e){("Top 50 Playlists"===e.owner.display_name||"spotifycharts"===e.owner.display_name||e.name.match(/top\ 50/gi))&&t.push(e)})),o=t.length>1?t[0]:t,console.log("top_fifth_playlists: ",o),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer "+i}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?n():void 0==e.error&&console.log("all_devices_result: ",e),0===e.devices.length&&alert("Please run Spotify App in your device.");var t=[];e.devices.map((function(e){return!0===e.is_active&&t.push(e.id),t})),console.log("active_devices_array: ",t),t.length>0?(console.log("active device found!"),fetch("https://api.spotify.com/v1/me/player/play?",{method:"PUT",headers:{Authorization:"Bearer ".concat(i),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({context_uri:o.uri})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?n():void 0==e.error&&console.log("player_result: ",e)})).catch((function(e){return console.log("player_err: ",e)}))):0===t.length&&(console.log("there is no active device. first found device is activating..."),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:"Bearer "+i,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({device_ids:[t[0]],play:!0})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?n():void 0==e.error&&console.log("activate_device_result: ",e)})))})).catch((function(e){return console.log("device_err: ",e)})),o})).catch((function(e){return console.log("search_err: ",e)}))),e}))})).catch((function(e){console.log("map_err: ",e)}))}function n(){console.log("access token is refreshing..."),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6ZjJhZjc4MjVhOTA1NGNiNWE5MmMwZDZlMWEwNDAwNTY=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(y)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return o()}))}console.log("acces_token: ",i),o()}else window.location="https://accounts.spotify.com/authorize?client_id=".concat("9e71a4da3ee24d31ab4fd842607cce9e","&response_type=code&redirect_uri=").concat(encodeURIComponent(t),"&scope=").concat(encodeURIComponent("user-modify-playback-state user-read-playback-state"),"&show_dialog=true")}))}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{id:"map",className:"App"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(u,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,o){e.exports=o(15)}},[[6,1,2]]]);
//# sourceMappingURL=main.76903c3e.chunk.js.map