(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/magnifier.5792a2ef.png"},,,function(e,t,n){e.exports=n.p+"static/media/earthmusic.21749bcf.png"},,,function(e,t,n){e.exports=n(20)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/settings.39b8785e.png"},,function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(4),r=n.n(c),s=(n(16),n(1)),i=(n(17),n(5)),l=n.n(i),u=(n(18),n(6)),p=n(7),m=n(2),h=n(9),d=n(10),g=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).handlePlaySong=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({uris:[e]})}).then((function(e){return e})).then((function(e){console.log("song_playing: ",e),404===e.status&&alert("Please open Spotify App in your device")})).then((function(){return o.setState({_isPlaying:!0})}))},o.state={playlist:null,_isPlaying:!1},o.handlePlaySong=o.handlePlaySong.bind(Object(m.a)(o)),o}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.spotify.com/v1/playlists/".concat(this.props.playlist_id,"/tracks"),{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e.json()})).then((function(t){void 0!==t.error&&401===t.error.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"))}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})),e.setState({playlist:t})}))}},{key:"render",value:function(){var e=this;return a.a.createElement(a.a.Fragment,null,null!=this.state.playlist?this.state.playlist.items.map((function(t){return a.a.createElement("li",{key:t.track.id,onClick:function(){return e.handlePlaySong(t.track.uri)},className:"songs-list"},t.track.name," - ",t.track.artists.map((function(e){return e.name})))})):null)}}]),n}(a.a.Component);var y=function(e){var t=localStorage.getItem("map_style")||"light",o=localStorage.getItem("access_token")||"",c=a.a.useState(o),r=Object(s.a)(c,2),i=r[0],u=r[1],p=a.a.useState(window.localStorage.getItem("auth")),m=Object(s.a)(p,2),h=m[0],d=(m[1],a.a.useState(localStorage.getItem("refresh_token"))),y=Object(s.a)(d,2),f=y[0],_=y[1],k=a.a.useState(),v=Object(s.a)(k,2),w=v[0],S=v[1],b=a.a.useState(),N=Object(s.a)(b,2),j=N[0],O=N[1],T=a.a.useState(t),I=Object(s.a)(T,2),E=I[0],A=I[1],z=a.a.useState(),C=Object(s.a)(z,2),x=C[0],U=C[1],M=a.a.useState(!0),P=Object(s.a)(M,2),W=P[0],G=P[1],B=a.a.useState(),Q=Object(s.a)(B,2),Z=Q[0],D=Q[1],J=a.a.useState(null),Y=Object(s.a)(J,2),F=Y[0],L=Y[1],R=a.a.useState({}),V=Object(s.a)(R,2),H=V[0],X=V[1],q=a.a.useState(!1),K=Object(s.a)(q,2),$=K[0],ee=K[1],te=a.a.useState(),ne=Object(s.a)(te,2),oe=(ne[0],ne[1],a.a.useState({})),ae=Object(s.a)(oe,2),ce=ae[0],re=ae[1],se="9e71a4da3ee24d31ab4fd842607cce9e",ie=window.location.origin+window.location.pathname,le=n(19);le.accessToken="pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ",null!==window.location.search.match(/\?code/g)&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(ie,"&client_id=").concat(se,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){u(localStorage.getItem("access_token")),_(localStorage.getItem("refresh_token"))})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)})),a.a.useEffect((function(){var e=[];setInterval((function(){localStorage.getItem("logged_in")&&(fetch("https://api.spotify.com/v1/me/player",{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return 204===e.status?e:200===e.status?e.json():void 0})).then((function(e){e&&(e.error&&401===e.error.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"))}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})),X(e),localStorage.setItem("current_position",e.progress_ms))})),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return 204===e.status?e:200===e.status?e.json():void(401===e.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"))}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})))})).then((function(e){e&&e.devices.map((function(e){1==e.is_active&&re(e)}))})))}),1e3);var t=new le.Map({container:"root",style:"mapbox://styles/mapbox/".concat(E,"-v10"),zoom:1.5});O(t),t.on("click",(function(n){if(window.location.search.match(/\?code/g)||h){function o(){console.log("access token is refreshing..."),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(f)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()}))}console.log("acces_token: ",i),fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(n.lngLat.lng.toString(),",").concat(n.lngLat.lat.toString(),".json?&access_token=").concat(le.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(n){n.features.map((function(n){return"country"===n.place_type[0]&&(console.log("map_results: ",n),!1===t.getStyle().sources.hasOwnProperty(n.id)&&t.addSource(n.id,{type:"geojson",data:{type:n.type,geometry:n.geometry}}),t.getStyle().layers.map((function(t){e.push(t.id)})),-1===e.indexOf(n.text+"-layer")&&t.addLayer({id:n.text+"-layer",source:n.id,type:"circle"}),t.setPaintProperty(n.text+"-layer","circle-color","hsl(138, 100%, 40%)"),t.getStyle().layers[0].paint["background-color"],t.getStyle().layers.map((function(e){"circle"===e.type&&e.id!==n.text+"-layer"?t.setLayoutProperty(e.id,"visibility","none"):"circle"===e.type&&e.id==n.text+"-layer"&&t.setLayoutProperty(e.id,"visibility","visible")})),console.log("current_map_style: ",t.getStyle()),fetch("https://api.spotify.com/v1/search?q=".concat(encodeURIComponent("".concat(n.text," top 50")),"&type=playlist"),{method:"GET",headers:{Authorization:"Bearer ".concat(i)}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("search_results: ",e);var t=[],a=[];if(e.playlists.items.map((function(e){("Top 50 Playlists"===e.owner.display_name||"spotifycharts"===e.owner.display_name||e.name.match(/top\ 50/gi))&&t.push(e)})),a=t.length>1?t[0]:t,Object.keys(a).length>0)S(t),localStorage.setItem("countrys_top_fifths",JSON.stringify(t)),console.log("top_fifth_playlists: ",a),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer "+i}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("all_devices_result: ",e),0===e.devices.length&&alert("Please open Spotify App in your device");var t=[];e.devices.map((function(e){return!0===e.is_active&&t.push(e.id),t})),console.log("active_devices_array: ",t),t.length>0?(console.log("active device found!"),fetch("https://api.spotify.com/v1/me/player/play?",{method:"PUT",headers:{Authorization:"Bearer ".concat(i),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({context_uri:a.uri})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("player_result: ",e)})).catch((function(e){return console.log("player_err: ",e)}))):0===t.length&&(console.log("there is no active device. first found device is activating..."),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:"Bearer "+i,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({device_ids:[t[0]],play:!0})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?o():e.error&&404===e.error.status&&alert("Please open Spotify App in your device"),console.log("activate_device_result: ",e)})))})).catch((function(e){return console.log("device_err: ",e)}));else if(0===Object.keys(a).length){var c;console.log("there is no top 50 playlist for this country"),window.confirm("There isn't any Top 50 playlist for ".concat(n.text,".\nDo you wanna create one?"))&&(c=!!window.confirm("Do you wanna make it public?"),fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+i}}).then((function(e){return e.json()})).then((function(e){console.log("current_user_info: ",e),fetch("https://api.spotify.com/v1/users/".concat(e.id,"/playlists"),{method:"POST",headers:{Authorization:"Bearer "+i,"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(n.text," Top 50"),public:c,description:"Created via Earthify"})}).then((function(e){return e.json()})).then((function(e){console.log("create_playlist_result: ",e),alert("Congratulaitons! You've just created a playlist named ".concat(n.text," Top 50!\nThe Spotify URI of your playtlist is ").concat(e.uri,"\nLet's add some tracks.\nMay the followers be with you! ;)"))}))})))}return a})).catch((function(e){return console.log("search_err: ",e)}))),n}))})).catch((function(e){console.log("map_err: ",e)}))}else window.location="https://accounts.spotify.com/authorize?client_id=".concat(se,"&response_type=code&redirect_uri=").concat(encodeURIComponent(ie),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}))}),[]);var ue=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("access_token"))},body:JSON.stringify({context_uri:e.uri})}).then((function(e){return e})).then((function(e){console.log("pick_playlist_from_the_list: ",e),401===e.status?fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(f)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})):404===e.status&&alert("Please open Spotify App in your device")}))},pe=function(e){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(e),".json?&access_token=").concat(le.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("searched_country_result: ",e),j.setCenter(e.features[0].geometry.coordinates),j.setZoom(5)}))},me=function(e){if(F===e)L(null);else{var t=a.a.createElement(a.a.Fragment,null,a.a.createElement(g,{playlist_id:e}));D(t),L(e)}};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"settings",style:{textAlign:W?"end":"initial"}},a.a.createElement("div",{className:"settings-content",style:{display:W?"block":"none"}},a.a.createElement("div",{className:"modes"},a.a.createElement("div",{className:"search-form"},a.a.createElement("input",{name:"search-input",type:"text",className:"search-input",value:x||"",onKeyDown:function(e){"Enter"===e.key&&pe(x)},onChange:function(e){e.preventDefault(),U(e.target.value)}}),a.a.createElement("div",{className:"search-button"},a.a.createElement("input",{type:"image",src:l.a,alt:"search",className:"icon",onClick:function(){return pe(x)}}))),a.a.createElement("div",null,a.a.createElement("button",{className:"map-style-button",onClick:function(){return function(){var e=j.getStyle();"Mapbox Light"===e.name?(j.setStyle("mapbox://styles/mapbox/dark-v10"),localStorage.setItem("map_style","dark"),A(localStorage.getItem("map_style"))):"Mapbox Dark"===e.name&&(j.setStyle("mapbox://styles/mapbox/light-v10"),localStorage.setItem("map_style","light"),A(localStorage.getItem("map_style")))}()}},"light"===E?"Dark Mode":"Light Mode"),a.a.createElement("button",{className:"toggle-player-button",onClick:function(){ee(!$)}},!0===$?"Hide Controls":"Show Controls"))),a.a.createElement("div",{className:"lists"},a.a.createElement("ul",null,void 0!==w?w.map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",{key:e.id,className:"playlist-list"},a.a.createElement("div",{className:"li-text",onClick:function(){return ue(e)}},e.name),a.a.createElement("button",{className:"songs-button",onClick:function(){return me(e.id)}},F===e.id?"\u25bc":"\u25ba")),F===e.id?Z:null)})):localStorage.getItem("countrys_top_fifths")?JSON.parse(localStorage.getItem("countrys_top_fifths")).map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",{key:e.id,className:"playlist-list"},a.a.createElement("div",{className:"li-text",onClick:function(){return ue(e)}},e.name),a.a.createElement("button",{className:"songs-button",onClick:function(){return me(e.id)}},F===e.id?"\u25bc":"\u25ba")),F===e.id?Z:null)})):null))),a.a.createElement("button",{className:"toggle-settings",onClick:function(e){G(!W)}})),a.a.createElement("div",{id:"map",className:"App"}),!0===$?a.a.createElement("div",{className:"now-playing"},a.a.createElement("button",{className:"now-playing-button",onClick:function(){Object.keys(H).length>0&&(!0===H.is_playing?fetch("https://api.spotify.com/v1/me/player/pause",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e})).then((function(e){return console.log("paused_result: ",e)})):!1===H.is_playing&&fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({uris:[H.item.uri],position_ms:localStorage.getItem("current_position")||0})}).then((function(e){return e})).then((function(e){console.log("song_playing: ",e),404===e.status&&alert("Please open Spotify App in your device")})))}},1==H.is_playing?"\u0131\u0131":"\u25ba"),a.a.createElement("div",{className:"now-playing-info"},a.a.createElement("p",{className:"now-playing-track-name"},Object.keys(H).length>0&&null!==H.item?H.item.name:null),a.a.createElement("p",{className:"now-playing-artist-name"},Object.keys(H).length>0&&null!==H.item?H.item.artists.map((function(e){return e.name+" "})):null)),a.a.createElement("div",{className:"now-playing-progress"},a.a.createElement("input",{className:"now-playing-slider",style:{background:Object.keys(H).length>0&&null!==H.item?"linear-gradient(90deg, rgb(0,128,128) ".concat(H.progress_ms/H.item.duration_ms*100+"%",", rgb(255,255,255) ").concat(H.progress_ms/H.item.duration_ms*100+"%",")"):"white",width:"90%"},type:"range",min:"0",max:"100",step:"0.01",value:Object.keys(H).length>0&&null!==H.item?H.progress_ms/H.item.duration_ms*100:"0",onChange:function(e){return function(e){if(e.preventDefault(),Object.keys(H).length>0&&null!==H.item){var t=parseInt(e.target.value*H.item.duration_ms/100);localStorage.setItem("current_position",t),console.log(e.target.value),fetch("https://api.spotify.com/v1/me/player/seek?position_ms=".concat(t),{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e})).then((function(e){console.log("seek_position_result: ",e)}))}}(e)}})),a.a.createElement("div",{className:"now-playing-volume"},a.a.createElement("input",{className:"now-playing-slider",style:{background:Object.keys(ce).length>0&&null!==ce.volume_percent?"linear-gradient(90deg, rgb(0,128,128) ".concat(ce.volume_percent,"%, rgb(255,255,255) ").concat(ce.volume_percent,"%)"):"white",width:"70%"},type:"range",min:"0",max:"100",value:ce.volume_percent,onChange:function(e){return function(e){e.preventDefault(),console.log("volume_value: ",e.target.value),fetch("https://api.spotify.com/v1/me/player/volume?volume_percent=".concat(e.target.value),{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return 204===e.status?e:e.json()})).then((function(e){console.log("volume_result: ",e)}))}(e)}}))):null)},f=n(8),_=n.n(f);function k(){var e="9e71a4da3ee24d31ab4fd842607cce9e",t=window.location.origin+window.location.pathname;return null!==window.location.search.match(/\?code/g)&&(localStorage.setItem("logged_in",!0),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(t,"&client_id=").concat(e,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)}))),a.a.createElement("div",{className:"intro"},a.a.createElement("div",null,a.a.createElement("img",{src:_.a,alt:"earthify-icon",className:"intro-icon"})),a.a.createElement("div",null,a.a.createElement("button",{className:"intro-button",onClick:function(){window.location="https://accounts.spotify.com/authorize?client_id=".concat(e,"&response_type=code&redirect_uri=").concat(encodeURIComponent(t),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}},"Login")))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(a.a.StrictMode,null,void 0==localStorage.getItem("logged_in")?a.a.createElement(k,null):a.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[11,1,2]]]);
//# sourceMappingURL=main.8749b9c3.chunk.js.map