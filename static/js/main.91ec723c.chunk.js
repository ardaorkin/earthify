(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/magnifier.5792a2ef.png"},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBREOKg+UDrANAAAA/UlEQVQoz5WRQStEURiGn/c2xhQr29mosRELK4WtGfkH6mayIGXBgmQnS8qCheUkC9MkP0A3S6yUhQWFP6CsKE2a1+a6TnMX8q7e73zP+c7bd+A/8rTLmZ93D0AUtGOajGRlm5ZLAeBlZtlP/bilFmfsZIA3GaPOV0pP0LDUZNDDke+dOKGfFXV+pumARxaBQxbwRZBiwzUPeQtc9CVYToKQ6e0nJj2gNh8uyXRyQLdygCtc6c1F+vRpERUoOwFu2JYB9MwusM4pMMVtpFFVVeWdI//uZI0KDWCV4/RQe9xxQiElrlmSHfOih/D12K+uZdWcz93bHXAm/1l/6hud81xqUNTrKwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNS0xN1QxNDo0MjoxNSswMDowMD9B3xgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDUtMTdUMTQ6NDI6MTUrMDA6MDBOHGekAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="},,,function(e,t,n){e.exports=n.p+"static/media/earthmusic.21749bcf.png"},,,function(e,t,n){e.exports=n(22)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/settings.39b8785e.png"},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBREONyogZghWAAAA3ElEQVQoz32QsU4CQRRFz5tMYUJJkMLKTpCWztLKwm61sDEhaE8MHwKBZu3VpXJjBfEL/ADpKQklISHBS4HBXRg5yWvuve/mzUAOHelFV1nF5ewiCVMKWc1n7FP6tKjlO7cNqtPl3r7ZwavKOVDmglubs4ejB8CEuz9bVV0DyKntmdpgb21MSwXeiBk5AtgPD1zyycheg4FNajM+5MkRMyQhFp6SImDJh622iTPeLQU1eTJVqP0+s2FzUASBs0F1DXUCihQFf9K+eORZFQ6holJ1/mkAsBk3HLPIamtU0kMwHOlC+AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNS0xN1QxNDo1NTo0MiswMDowMJFUK0sAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDUtMTdUMTQ6NTU6NDIrMDA6MDDgCZP3AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="},,function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(4),s=n.n(c),r=(n(17),n(1)),i=(n(18),n(5)),l=n.n(i),u=(n(19),n(6)),p=n.n(u),m=(n(20),"9e71a4da3ee24d31ab4fd842607cce9e"),h="93e10b25c8a045e0a9357b4c99225b06",g=window.location.origin+window.location.pathname,d=n(7),f=n(8),y=n(2),A=n(10),_=n(11),k=function(e){Object(_.a)(n,e);var t=Object(A.a)(n);function n(e){var o;return Object(d.a)(this,n),(o=t.call(this,e)).handlePlaySong=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({uris:[e]})}).then((function(e){return e})).then((function(e){console.log("song_playing: ",e),404===e.status&&alert("Please open Spotify App in your device")})).then((function(){return o.setState({_isPlaying:!0})}))},o.state={playlist:null,_isPlaying:!1},o.handlePlaySong=o.handlePlaySong.bind(Object(y.a)(o)),o}return Object(f.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.spotify.com/v1/playlists/".concat(this.props.playlist_id,"/tracks"),{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e.json()})).then((function(t){void 0!==t.error&&401===t.error.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=","Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"))}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})),e.setState({playlist:t})}))}},{key:"render",value:function(){var e=this;return a.a.createElement(a.a.Fragment,null,null!=this.state.playlist&&this.state.playlist.items.length>0?this.state.playlist.items.map((function(t){var n=[];return a.a.createElement("li",{key:t.track.id,onClick:function(){return e.handlePlaySong(t.track.uri)},className:"songs-list"},t.track.name," - ",t.track.artists.map((function(e){return n.push(e.name),n.join(", ")})))})):null)}}]),n}(a.a.Component);var w=function(e){var t=localStorage.getItem("map_style")||"light",o=localStorage.getItem("access_token")||"",c=a.a.useState(o),s=Object(r.a)(c,2),i=s[0],u=s[1],d=a.a.useState(window.localStorage.getItem("auth")),f=Object(r.a)(d,2),y=f[0],A=(f[1],a.a.useState(localStorage.getItem("refresh_token"))),_=Object(r.a)(A,2),w=_[0],v=_[1],S=a.a.useState(),b=Object(r.a)(S,2),j=b[0],E=b[1],N=a.a.useState(),I=Object(r.a)(N,2),T=I[0],O=I[1],C=a.a.useState(t),U=Object(r.a)(C,2),x=U[0],B=U[1],M=a.a.useState(),P=Object(r.a)(M,2),Q=P[0],D=P[1],G=a.a.useState(!0),J=Object(r.a)(G,2),z=J[0],R=J[1],F=a.a.useState(),Z=Object(r.a)(F,2),V=Z[0],W=Z[1],K=a.a.useState(null),L=Object(r.a)(K,2),H=L[0],X=L[1],Y=a.a.useState({}),q=Object(r.a)(Y,2),$=q[0],ee=q[1],te=a.a.useState(!1),ne=Object(r.a)(te,2),oe=ne[0],ae=ne[1],ce=a.a.useState(),se=Object(r.a)(ce,2),re=(se[0],se[1],a.a.useState({})),ie=Object(r.a)(re,2),le=ie[0],ue=ie[1],pe=[],me=n(21);me.accessToken="pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ",null!==window.location.search.match(/\?code/g)&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(g,"&client_id=").concat(m,"&client_secret=").concat(h)}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){u(localStorage.getItem("access_token")),v(localStorage.getItem("refresh_token"))})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)})),a.a.useEffect((function(){var e=[];setInterval((function(){localStorage.getItem("logged_in")&&(fetch("https://api.spotify.com/v1/me/player",{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return 204===e.status?e:200===e.status?e.json():void 0})).then((function(e){e&&(e.error&&401===e.error.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"),"&client_id=").concat(m,"&client_secret=").concat(h)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})),ee(e),localStorage.setItem("current_position",e.progress_ms))})),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return 204===e.status?e:200===e.status?e.json():void(401===e.status&&fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(localStorage.getItem("refresh_token"),"&client_id=").concat(m,"&client_secret=").concat(h)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})))})).then((function(e){e&&e.devices.map((function(e){1==e.is_active&&ue(e)}))})))}),1e3);var t=new me.Map({container:"root",style:"mapbox://styles/mapbox/".concat(x,"-v10"),zoom:1.5});O(t),t.on("click",(function(n){if(window.location.search.match(/\?code/g)||y){function o(){console.log("access token is refreshing..."),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(w,"&client_id=").concat(m,"&client_secret=").concat(h)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()}))}console.log("acces_token: ",i),fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(n.lngLat.lng.toString(),",").concat(n.lngLat.lat.toString(),".json?&access_token=").concat(me.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(n){n.features.map((function(n){return"country"===n.place_type[0]&&(console.log("map_results: ",n),!1===t.getStyle().sources.hasOwnProperty(n.id)&&t.addSource(n.id,{type:"geojson",data:{type:n.type,geometry:n.geometry}}),t.getStyle().layers.map((function(t){e.push(t.id)})),-1===e.indexOf(n.text+"-layer")&&t.addLayer({id:n.text+"-layer",source:n.id,type:"circle"}),t.setPaintProperty(n.text+"-layer","circle-color","hsl(138, 100%, 40%)"),t.getStyle().layers[0].paint["background-color"],t.getStyle().layers.map((function(e){"circle"===e.type&&e.id!==n.text+"-layer"?t.setLayoutProperty(e.id,"visibility","none"):"circle"===e.type&&e.id==n.text+"-layer"&&t.setLayoutProperty(e.id,"visibility","visible")})),console.log("current_map_style: ",t.getStyle()),fetch("https://api.spotify.com/v1/search?q=".concat(encodeURIComponent("".concat(n.text," top 50")),"&type=playlist"),{method:"GET",headers:{Authorization:"Bearer ".concat(i)}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("search_results: ",e);var t=[],a=[];if(e.playlists.items.map((function(e){("Top 50 Playlists"===e.owner.display_name||"spotifycharts"===e.owner.display_name||e.name.match(/top\ 50/gi))&&t.push(e)})),a=t.length>1?t[0]:t,Object.keys(a).length>0)E(t),localStorage.setItem("countrys_top_fifths",JSON.stringify(t)),console.log("top_fifth_playlists: ",a),fetch("https://api.spotify.com/v1/me/player/devices",{method:"GET",headers:{Authorization:"Bearer "+i}}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("all_devices_result: ",e),0===e.devices.length&&alert("Please open Spotify App in your device");var t=[];e.devices.map((function(e){return!0===e.is_active&&t.push(e.id),t})),console.log("active_devices_array: ",t),t.length>0?(console.log("active device found!"),fetch("https://api.spotify.com/v1/me/player/play?",{method:"PUT",headers:{Authorization:"Bearer ".concat(i),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({context_uri:a.uri})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status&&o(),console.log("player_result: ",e)})).catch((function(e){return console.log("player_err: ",e)}))):0===t.length&&(console.log("there is no active device. first found device is activating..."),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:"Bearer "+i,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({device_ids:[t[0]],play:!0})}).then((function(e){return e.json()})).then((function(e){e.error&&401===e.error.status?o():e.error&&404===e.error.status&&alert("Please open Spotify App in your device"),console.log("activate_device_result: ",e)})))})).catch((function(e){return console.log("device_err: ",e)}));else if(0===Object.keys(a).length){var c;console.log("there is no top 50 playlist for this country"),window.confirm("There isn't any Top 50 playlist for ".concat(n.text,".\nDo you wanna create one?"))&&(c=!!window.confirm("Do you wanna make it public?"),fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:"Bearer "+i}}).then((function(e){return e.json()})).then((function(e){console.log("current_user_info: ",e),fetch("https://api.spotify.com/v1/users/".concat(e.id,"/playlists"),{method:"POST",headers:{Authorization:"Bearer "+i,"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(n.text," Top 50"),public:c,description:"Created via Earthify"})}).then((function(e){return e.json()})).then((function(e){console.log("create_playlist_result: ",e),alert("Congratulaitons! You've just created a playlist named ".concat(n.text," Top 50!\nThe Spotify URI of your playtlist is ").concat(e.uri,"\nLet's add some tracks.\nMay the followers be with you! ;)"))}))})))}return a})).catch((function(e){return console.log("search_err: ",e)}))),n}))})).catch((function(e){console.log("map_err: ",e)}))}else window.location="https://accounts.spotify.com/authorize?client_id=".concat(m,"&response_type=code&redirect_uri=").concat(encodeURIComponent(g),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}))}),[]);var he=function(e){fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("access_token"))},body:JSON.stringify({context_uri:e.uri})}).then((function(e){return e})).then((function(e){console.log("pick_playlist_from_the_list: ",e),401===e.status?fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=refresh_token&refresh_token=".concat(w,"&client_id=").concat(m,"&client_secret=").concat(h)}).then((function(e){return e.json()})).then((function(e){console.log("updating access token..."),localStorage.setItem("access_token",e.access_token)})).then((function(){return console.log("acess token were refresh\nnew access token: ",localStorage.getItem("access_token"))})).then((function(){return window.location.reload()})):404===e.status&&alert("Please open Spotify App in your device")}))},ge=function(e){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(e),".json?&access_token=").concat(me.accessToken),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("searched_country_result: ",e),T.setCenter(e.features[0].geometry.coordinates),T.setZoom(5)}))},de=function(e){if(H===e)X(null);else{var t=a.a.createElement(a.a.Fragment,null,a.a.createElement(k,{playlist_id:e}));W(t),X(e)}};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"settings",style:{textAlign:z?"end":"initial"}},a.a.createElement("div",{className:"settings-content",style:{display:z?"block":"none"}},a.a.createElement("div",{className:"modes"},a.a.createElement("div",{className:"search-form"},a.a.createElement("input",{name:"search-input",type:"text",className:"search-input",value:Q||"",onKeyDown:function(e){"Enter"===e.key&&ge(Q)},onChange:function(e){e.preventDefault(),D(e.target.value)}}),a.a.createElement("div",{className:"search-button"},a.a.createElement("input",{type:"image",src:l.a,alt:"search",className:"icon",onClick:function(){return ge(Q)}}))),a.a.createElement("div",null,a.a.createElement("button",{className:"map-style-button",onClick:function(){return function(){var e=T.getStyle();"Mapbox Light"===e.name?(T.setStyle("mapbox://styles/mapbox/dark-v10"),localStorage.setItem("map_style","dark"),B(localStorage.getItem("map_style"))):"Mapbox Dark"===e.name&&(T.setStyle("mapbox://styles/mapbox/light-v10"),localStorage.setItem("map_style","light"),B(localStorage.getItem("map_style")))}()}},"light"===x?"Dark Mode":"Light Mode"),a.a.createElement("button",{className:"toggle-player-button",onClick:function(){ae(!oe)}},!0===oe?"Hide Controls":"Show Controls"))),a.a.createElement("div",{className:"lists"},a.a.createElement("ul",null,void 0!==j?j.map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",{key:e.id,className:"playlist-list"},a.a.createElement("div",{className:"li-text",onClick:function(){return he(e)}},e.name),a.a.createElement("button",{className:"songs-button",onClick:function(){return de(e.id)}},H===e.id?"\u25bc":"\u25ba")),H===e.id?V:null)})):localStorage.getItem("countrys_top_fifths")?JSON.parse(localStorage.getItem("countrys_top_fifths")).map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("li",{key:e.id,className:"playlist-list"},a.a.createElement("div",{className:"li-text",onClick:function(){return he(e)}},e.name),a.a.createElement("button",{className:"songs-button",onClick:function(){return de(e.id)}},H===e.id?"\u25bc":"\u25ba")),H===e.id?V:null)})):null))),a.a.createElement("button",{className:"toggle-settings",onClick:function(e){R(!z)}})),a.a.createElement("div",{id:"map",className:"App"}),!0===oe?a.a.createElement("div",{className:"now-playing"},a.a.createElement("img",{className:"now-playing-image",src:Object.keys($).length>0&&$.item?$.item.album.images[$.item.album.images.length-1].url:null,alt:"album-image"}),a.a.createElement("button",{className:"now-playing-button",onClick:function(){Object.keys($).length>0&&(!0===$.is_playing?fetch("https://api.spotify.com/v1/me/player/pause",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e})).then((function(e){return console.log("paused_result: ",e)})):!1===$.is_playing&&fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token")),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({uris:[$.item.uri],position_ms:localStorage.getItem("current_position")||0})}).then((function(e){return e})).then((function(e){console.log("song_playing: ",e),404===e.status&&alert("Please open Spotify App in your device")})))}},1==$.is_playing?"\u0131\u0131":"\u25ba"),a.a.createElement("div",{className:"now-playing-info"},a.a.createElement("p",{className:"now-playing-track-name"},Object.keys($).length>0&&null!==$.item?$.item.name:null),a.a.createElement("p",{className:"now-playing-artist-name"},Object.keys($).length>0&&null!==$.item?$.item.artists.map((function(e){return pe.push(e.name),pe.join(", ")})):null)),a.a.createElement("div",{className:"now-playing-duration"},Object.keys($).length>0&&null!==$.item?function(e){var t=parseInt(e/1e3%60),n=parseInt(e/6e4%60);return(n=n<10?"0"+n:n)+":"+(t=t<10?"0"+t:t)}($.progress_ms):"0:00"),a.a.createElement("div",{className:"now-playing-progress"},a.a.createElement("input",{className:"now-playing-slider",style:{background:Object.keys($).length>0&&null!==$.item?"linear-gradient(90deg, rgb(0,128,128) ".concat($.progress_ms/$.item.duration_ms*100+"%",", rgb(255,255,255) ").concat($.progress_ms/$.item.duration_ms*100+"%",")"):"white",width:"90%"},type:"range",min:"0",max:"100",step:"0.01",value:Object.keys($).length>0&&null!==$.item?$.progress_ms/$.item.duration_ms*100:"0",onChange:function(e){return function(e){if(e.preventDefault(),Object.keys($).length>0&&null!==$.item){var t=parseInt(e.target.value*$.item.duration_ms/100);localStorage.setItem("current_position",t),console.log(e.target.value),fetch("https://api.spotify.com/v1/me/player/seek?position_ms=".concat(t),{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return e})).then((function(e){console.log("seek_position_result: ",e)}))}}(e)}})),a.a.createElement("div",{className:"now-playing-volume"},a.a.createElement("img",{className:"volume-icon",src:p.a}),a.a.createElement("input",{className:"now-playing-slider",style:{background:Object.keys(le).length>0&&null!==le.volume_percent?"linear-gradient(90deg, rgb(0,128,128) ".concat(le.volume_percent,"%, rgb(255,255,255) ").concat(le.volume_percent,"%)"):"white",width:"70%"},type:"range",min:"0",max:"100",value:le.volume_percent,onChange:function(e){return function(e){e.preventDefault(),console.log("volume_value: ",e.target.value),fetch("https://api.spotify.com/v1/me/player/volume?volume_percent=".concat(e.target.value),{method:"PUT",headers:{Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){return 204===e.status?e:e.json()})).then((function(e){console.log("volume_result: ",e)}))}(e)}}))):null)},v=n(9),S=n.n(v);function b(){var e="9e71a4da3ee24d31ab4fd842607cce9e",t=window.location.origin+window.location.pathname;return null!==window.location.search.match(/\?code/g)&&(localStorage.setItem("logged_in",!0),fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:"grant_type=authorization_code&code=".concat(window.location.search.split("=")[1],"&redirect_uri=").concat(t,"&client_id=").concat(e,"&client_secret=").concat("907e432cd3d74554b29582eb58756277")}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("create_access_token_result",JSON.stringify(e)),localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token)})).then((function(){return window.location=window.location.origin+"/earthify"})).then((function(){return window.localStorage.setItem("auth",!0)})).catch((function(e){return console.log("acees_token_respone: ",e)}))),a.a.createElement("div",{className:"intro"},a.a.createElement("div",null,a.a.createElement("img",{src:S.a,alt:"earthify-icon",className:"intro-icon"})),a.a.createElement("div",null,a.a.createElement("button",{className:"intro-button",onClick:function(){window.location="https://accounts.spotify.com/authorize?client_id=".concat(e,"&response_type=code&redirect_uri=").concat(encodeURIComponent(t),"&scope=").concat(encodeURIComponent("user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private"),"&show_dialog=true")}},"Login")))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(a.a.StrictMode,null,void 0==localStorage.getItem("logged_in")?a.a.createElement(b,null):a.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[12,1,2]]]);
//# sourceMappingURL=main.91ec723c.chunk.js.map