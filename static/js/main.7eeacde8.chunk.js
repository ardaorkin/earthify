(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/magnifier.5792a2ef.png"},,,function(e,t,n){e.exports=n.p+"static/media/earthmusic.21749bcf.png"},,,function(e,t,n){e.exports=n(20)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/settings.39b8785e.png"},,function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(4),i=n.n(c),r=(n(16),n(1)),s=(n(17),n(5)),l=n.n(s),u=(n(18),n(6)),p=n(7),m=n(2),h=n(9),d=n(10),f=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).handlePlaySong=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({uris:[e]})}).then((function(e){return e})).then((function(e){console.log("song_playing: ",e),404===e.status&&alert("Please open Spotify App in your device")}))},o.state={playlist:null},o.handlePlaySong=o.handlePlaySong.bind(Object(m.a)(o)),o}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.spotify.com/v1/playlists/".concat(this.props.playlist_id,"/tracks"),{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e.json()})).then((function(t){void 0!==t.error&&401===t.error.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"))}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})),e.setState({playlist:t})}))}},{key:"render",value:function(){var e=this;return a.a.createElement(a.a.Fragment,null,null!=this.state.playlist?this.state.playlist.items.map((function(t){return a.a.createElement("li",{key:t.track.id,onClick:function(){return e.handlePlaySong(t.track.uri)},className:"songs-list"},t.track.name," - ",t.track.artists.map((function(e){return e.name})))})):null)}}]),n}(a.a.Component);var y=function(e){var t=localStorage.getItem("map_style")||"light",o=localStorage.getItem("access_token")||"",c=a.a.useState(o),i=Object(r.a)(c,2),s=i[0],u=i[1],p=a.a.useState(window.localStorage.getItem("auth")),m=Object(r.a)(p,2),h=m[0],d=(m[1],a.a.useState(localStorage.getItem("refresh_token"))),y=Object(r.a)(d,2),g=y[0],_=y[1],k=a.a.useState(),w=Object(r.a)(k,2),v=w[0],S=w[1],b=a.a.useState(),N=Object(r.a)(b,2),j=N[0],T=N[1],E=a.a.useState(t),O=Object(r.a)(E,2),I=O[0],A=O[1],C=a.a.useState(),x=Object(r.a)(C,2),z=x[0],U=x[1],M=a.a.useState(!0),W=Object(r.a)(M,2),G=W[0],P=W[1],J=a.a.useState(),B=Object(r.a)(J,2),Q=B[0],D=B[1],Z=a.a.useState(null),Y=Object(r.a)(Z,2),F=Y[0],R=Y[1],L="9e71a4da3ee24d31ab4fd842607cce9e",V=window.location.origin+window.location.pathname,H=n(19);H.accessToken="pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ",null!==window.location.search.match(/\?code/g)&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(V,"&client_id=").concat(L,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){u(localStorage.getItem("access_token")),_(localStorage.getItem("refresh_token"))})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)})),a.a.useEffect((function(){var e=new H.Map({container:"root",style:"mapbox://styles/mapbox/".concat(I,"-v10"),zoom:3});T(e),e.on("click",(function(e){if(window.location.search.match(/\?code/g)||h){function t(){console.log("access token is refreshing..."),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(g)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()}))}console.log("acces_token: ",s),fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(e.lngLat.lng.toString(),",").concat(e.lngLat.lat.toString(),".json?&access_token=").concat(H.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.features.map((function(e){return"country"===e.place_type[0]&&(console.log("map_results: ",e),fetch("https://api.spotify.com/v1/search?q=".concat(encodeURIComponent("".concat(e.text," top 50")),"&type=playlist"),{method:"GET",headers:{Authorization:"Bearer ".concat(s)}}).then((function(e){return e.json()})).then((function(n){n.error&&401===n.error.status&&t(),console.log("search_results: ",n);var o=[],a=[];if(n.playlists.items.map((function(e){("Top 50 Playlists"===e.owner.display_name||"spotifycharts"===e.owner.display_name||e.name.match(/top\ 50/gi))&&o.push(e)})),a=o.length>1?o[0]:o,Object.keys(a).length>0)S(o),localStorage.setItem("countrys_top_fifths",JSON.stringify(o)),console.log("top_fifth_playlists: ",a),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer "+s}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&t(),console.log("all_devices_result: ",e),0===e.devices.length&&alert("Please open Spotify App in your device");var n=[];e.devices.map((function(e){return!0===e.is_active&&n.push(e.id),n})),console.log("active_devices_array: ",n),n.length>0?(console.log("active device found!"),fetch("https://api.spotify.com/v1/me/player/play?",{method:"PUT",headers:{Authorization:"Bearer ".concat(s),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({context_uri:a.uri})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&t(),console.log("player_result: ",e)})).catch((function(e){return console.log("player_err: ",e)}))):0===n.length&&(console.log("there is no active device. first found device is activating..."),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:"Bearer "+s,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({device_ids:[n[0]],play:!0})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?t():e.error&&404===e.error.status&&alert("Please open Spotify App in your device"),console.log("activate_device_result: ",e)})))})).catch((function(e){return console.log("device_err: ",e)}));else if(0===Object.keys(a).length){var c;console.log("there is no top 50 playlist for this country"),window.confirm("There isn't any Top 50 playlist for ".concat(e.text,".\nDo you wanna create one?"))&&(c=!!window.confirm("Do you wanna make it public?"),fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+s}}).then((function(e){return e.json()})).then((function(t){console.log("current_user_info: ",t),fetch("https://api.spotify.com/v1/users/".concat(t.id,"/playlists"),{method:"POST",headers:{Authorization:"Bearer "+s,"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e.text," Top 50"),public:c,description:"Created via Earthify"})}).then((function(e){return e.json()})).then((function(t){console.log("create_playlist_result: ",t),alert("Congratulaitons! You've just created a playlist named ".concat(e.text," Top 50!\nThe Spotify URI of your playtlist is ").concat(t.uri,"\nLet's add some tracks.\nMay the followers be with you! ;)"))}))})))}return a})).catch((function(e){return console.log("search_err: ",e)}))),e}))})).catch((function(e){console.log("map_err: ",e)}))}else window.location="https://accounts.spotify.com/authorize?client_id=".concat(L,"&response_type=code&redirect_uri=").concat(encodeURIComponent(V),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}))}),[]);var X=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("access_token"))},body:JSON.stringify({context_uri:e.uri})}).then((function(e){return e})).then((function(e){console.log("pick_playlist_from_the_list: ",e),401===e.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(g)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()}))}))},q=function(e){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(e),".json?&access_token=").concat(H.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("searched_country_result: ",e),j.setCenter(e.features[0].geometry.coordinates),j.setZoom(5)}))},K=function(e){if(F===e)R(null);else{var t=a.a.createElement(a.a.Fragment,null,a.a.createElement(f,{playlist_id:e}));D(t),R(e)}};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"settings",style:{textAlign:G?"end":"initial"}},a.a.createElement("div",{className:"settings-content",style:{display:G?"block":"none"}},a.a.createElement("div",{className:"modes"},a.a.createElement("div",{className:"search-form"},a.a.createElement("input",{name:"search-input",type:"text",className:"search-input",value:z||"",onKeyDown:function(e){"Enter"===e.key&&q(z)},onChange:function(e){e.preventDefault(),U(e.target.value)}}),a.a.createElement("div",{className:"search-button"},a.a.createElement("input",{type:"image",src:l.a,alt:"search",className:"icon",onClick:function(){return q(z)}}))),a.a.createElement("div",null,a.a.createElement("button",{className:"map-style-button",onClick:function(){return function(){var e=j.getStyle();"Mapbox Light"===e.name?(j.setStyle("mapbox://styles/mapbox/dark-v10"),localStorage.setItem("map_style","dark"),A(localStorage.getItem("map_style"))):"Mapbox Dark"===e.name&&(j.setStyle("mapbox://styles/mapbox/light-v10"),localStorage.setItem("map_style","light"),A(localStorage.getItem("map_style")))}()}},"light"===I?"Dark Mode":"Light Mode"))),a.a.createElement("div",{className:"lists"},a.a.createElement("ul",null,void 0!==v?v.map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",{key:e.id,className:"playlist-list"},a.a.createElement("div",{className:"li-text",onClick:function(){return X(e)}},e.name),a.a.createElement("button",{className:"songs-button",onClick:function(){return K(e.id)}},F===e.id?"\u25bc":"\u25ba")),F===e.id?Q:null)})):localStorage.getItem("countrys_top_fifths")?JSON.parse(localStorage.getItem("countrys_top_fifths")).map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",{key:e.id,className:"playlist-list"},a.a.createElement("div",{className:"li-text",onClick:function(){return X(e)}},e.name),a.a.createElement("button",{className:"songs-button",onClick:function(){return K(e.id)}},F===e.id?"\u25bc":"\u25ba")),F===e.id?Q:null)})):null))),a.a.createElement("button",{className:"toggle-settings",onClick:function(e){P(!G)}})),a.a.createElement("div",{id:"map",className:"App"}))},g=n(8),_=n.n(g);function k(){var e="9e71a4da3ee24d31ab4fd842607cce9e",t=window.location.origin+window.location.pathname;return null!==window.location.search.match(/\?code/g)&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(t,"&client_id=").concat(e,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)})),a.a.createElement("div",{className:"intro"},a.a.createElement("div",null,a.a.createElement("img",{src:_.a,alt:"earthify-icon",className:"intro-icon"})),a.a.createElement("div",null,a.a.createElement("button",{className:"intro-button",onClick:function(){window.location="https://accounts.spotify.com/authorize?client_id=".concat(e,"&response_type=code&redirect_uri=").concat(encodeURIComponent(t),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}},"Login")))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,null==localStorage.getItem("access_token")?a.a.createElement(k,null):a.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[11,1,2]]]);
//# sourceMappingURL=main.7eeacde8.chunk.js.map