(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,function(e,t,o){e.exports=o.p+"static/media/magnifier.add06f1c.png"},function(e,t,o){e.exports=o.p+"static/media/earthmusic.21749bcf.png"},function(e,t,o){e.exports=o(14)},,,,,function(e,t,o){},function(e,t,o){},,function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),c=o(3),r=o.n(c),i=(o(11),o(1)),s=(o(12),o(4)),l=o.n(s);var u=function(e){var t=localStorage.getItem("map_style")||"light",n=localStorage.getItem("access_token")||"",c=a.a.useState(n),r=Object(i.a)(c,2),s=r[0],u=r[1],p=a.a.useState(window.localStorage.getItem("auth")),h=Object(i.a)(p,2),m=h[0],d=(h[1],a.a.useState(localStorage.getItem("refresh_token"))),f=Object(i.a)(d,2),y=f[0],g=f[1],_=a.a.useState(),w=Object(i.a)(_,2),k=w[0],v=w[1],S=a.a.useState(),b=Object(i.a)(S,2),I=b[0],j=b[1],T=a.a.useState(t),E=Object(i.a)(T,2),N=E[0],O=E[1],x=a.a.useState(),C=Object(i.a)(x,2),A=C[0],z=C[1],J="9e71a4da3ee24d31ab4fd842607cce9e",U=o(13);U.accessToken="pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ",null!==window.location.search.match(/\?code/g)&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat("http://localhost:3000/callback","&client_id=").concat(J,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){u(localStorage.getItem("access_token")),g(localStorage.getItem("refresh_token"))})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)})),a.a.useEffect((function(){var e=new U.Map({container:"root",style:"mapbox://styles/mapbox/".concat(N,"-v10"),zoom:3});j(e),e.on("click",(function(e){if(window.location.search.match(/\?code/g)||m){function t(){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(e.lngLat.lng.toString(),",").concat(e.lngLat.lat.toString(),".json?&access_token=").concat(U.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.features.map((function(e){return"country"===e.place_type[0]&&(console.log("map_results: ",e),fetch("https://api.spotify.com/v1/search?q=".concat(encodeURIComponent("".concat(e.text," top 50")),"&type=playlist"),{method:"GET",headers:{Authorization:"Bearer ".concat(s)}}).then((function(e){return e.json()})).then((function(t){t.error&&401===t.error.status&&o(),console.log("search_results: ",t);var n=[],a=[];if(t.playlists.items.map((function(e){("Top 50 Playlists"===e.owner.display_name||"spotifycharts"===e.owner.display_name||e.name.match(/top\ 50/gi))&&n.push(e)})),a=n.length>1?n[0]:n,Object.keys(a).length>0)v(n),localStorage.setItem("countrys_top_fifths",JSON.stringify(n)),console.log("top_fifth_playlists: ",a),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer "+s}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("all_devices_result: ",e),0===e.devices.length&&alert("Please run Spotify App in your device.");var t=[];e.devices.map((function(e){return!0===e.is_active&&t.push(e.id),t})),console.log("active_devices_array: ",t),t.length>0?(console.log("active device found!"),fetch("https://api.spotify.com/v1/me/player/play?",{method:"PUT",headers:{Authorization:"Bearer ".concat(s),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({context_uri:a.uri})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("player_result: ",e)})).catch((function(e){return console.log("player_err: ",e)}))):0===t.length&&(console.log("there is no active device. first found device is activating..."),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:"Bearer "+s,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({device_ids:[t[0]],play:!0})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?o():e.error&&404===e.error.status&&alert("Please run Spotify App in your device."),console.log("activate_device_result: ",e)})))})).catch((function(e){return console.log("device_err: ",e)}));else if(0===Object.keys(a).length){var c;if(console.log("there is no top 50 playlist for this country"),window.confirm("There isn't any Top 50 playlist for ".concat(e.text,".\nDo you wanna create one?")))c=!!window.confirm("Do you wanna make it public?"),fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+s}}).then((function(e){return e.json()})).then((function(t){console.log("current_user_info: ",t),fetch("https://api.spotify.com/v1/users/".concat(t.id,"/playlists"),{method:"POST",headers:{Authorization:"Bearer "+s,"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e.text," Top 50"),public:c,description:"Created via Earthify"})}).then((function(e){return e.json()})).then((function(t){console.log("create_playlist_result: ",t),alert("Congratulaitons! You've just created a playlist named ".concat(e.text," Top 50!\nThe Spotify URI of your playtlist is ").concat(t.uri,"\nLet's add some tracks.\nMay the followers be with you! ;)"))}))}))}return a})).catch((function(e){return console.log("search_err: ",e)}))),e}))})).catch((function(e){console.log("map_err: ",e)}))}function o(){console.log("access token is refreshing..."),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(y)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return t()})).then((function(){return window.location.reload()}))}console.log("acces_token: ",s),t()}else window.location="https://accounts.spotify.com/authorize?client_id=".concat(J,"&response_type=code&redirect_uri=").concat(encodeURIComponent("http://localhost:3000/callback"),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}))}),[]);var M=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("access_token"))},body:JSON.stringify({context_uri:e.uri})}).then((function(e){return e})).then((function(e){return console.log(e)}))},P=function(e){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(e),".json?&access_token=").concat(U.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("searched_country_result: ",e),I.setCenter(e.features[0].geometry.coordinates),I.setZoom(5)}))};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"settings"},a.a.createElement("div",{className:"search-form"},a.a.createElement("input",{name:"search-country",type:"text",className:"search-input",value:A||"",onKeyDown:function(e){"Enter"===e.key&&P(A)},onChange:function(e){e.preventDefault(),z(e.target.value)}}),a.a.createElement("div",{className:"search-button"},a.a.createElement("input",{type:"image",src:l.a,alt:"search",className:"icon",onClick:function(){return P(A)}}))),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return function(){var e=I.getStyle();"Mapbox Light"===e.name?(I.setStyle("mapbox://styles/mapbox/dark-v10"),localStorage.setItem("map_style","dark"),O(localStorage.getItem("map_style"))):"Mapbox Dark"===e.name&&(I.setStyle("mapbox://styles/mapbox/light-v10"),localStorage.setItem("map_style","light"),O(localStorage.getItem("map_style")))}()}},"light"===N?"Dark Mode":"Light Mode")),a.a.createElement("div",null,a.a.createElement("ul",null,void 0!==k?k.map((function(e){return a.a.createElement("li",{onClick:function(){return M(e)},key:e.id},e.name)})):localStorage.getItem("countrys_top_fifths")?JSON.parse(localStorage.getItem("countrys_top_fifths")).map((function(e){return a.a.createElement("li",{onClick:function(){return M(e)},key:e.id},e.name)})):null))),a.a.createElement("div",{id:"map",className:"App"}))},p=o(5),h=o.n(p);function m(){var e="9e71a4da3ee24d31ab4fd842607cce9e",t=window.location.origin+window.location.pathname;return null!==window.location.search.match(/\?code/g)&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(t,"&client_id=").concat(e,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)})),a.a.createElement("div",{className:"intro"},a.a.createElement("div",null,a.a.createElement("img",{src:h.a,alt:"earthify-icon",className:"intro-icon"})),a.a.createElement("div",null,a.a.createElement("button",{className:"intro-button",onClick:function(){window.location="https://accounts.spotify.com/authorize?client_id=".concat(e,"&response_type=code&redirect_uri=").concat(encodeURIComponent(t),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}},"Login")))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(a.a.StrictMode,null,null==localStorage.getItem("access_token")?a.a.createElement(m,null):a.a.createElement(u,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.39b98a63.chunk.js.map