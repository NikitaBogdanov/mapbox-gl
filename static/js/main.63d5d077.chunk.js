(this["webpackJsonpmapbox-gl-app"]=this["webpackJsonpmapbox-gl-app"]||[]).push([[0],{39:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t),a.d(t,"store",(function(){return E}));var n=a(2),c=a(0),o=a(13),i=a.n(o),r=a(22),s=a(44),l=a(4),p=a(20),d=a(35),u=(a(60),a(29)),j=a(16),b=a(45),g=a(27),m=(a(39),a(79)),f=a(78);var O=function(e){var t=e.addInfo,a=e.onChange,o=e.onAdd,i=e.onCancel,r=Object(c.useState)({title:!0}),s=Object(g.a)(r,2),l=s[0],p=s[1];return Object(n.jsx)("div",{className:"popup-bg",children:Object(n.jsxs)("div",{className:"popup-container",children:[Object(n.jsx)("div",{className:"popup-header",children:"Add new point"}),Object(n.jsxs)("div",{className:"input-container",children:[Object(n.jsx)("span",{className:"input-label",children:"Title:"}),Object(n.jsx)(m.a,{onChange:function(e){return a(e.target.value,"title")},className:"popup-title"}),Object(n.jsx)("span",{className:"warning-message-text",children:!l.title&&"Title is required"})]}),Object(n.jsxs)("div",{className:"input-container",children:[Object(n.jsx)("span",{className:"input-label",children:"Description:"}),Object(n.jsx)(m.a,{onChange:function(e){return a(e.target.value,"description")},className:"popup-description"})]}),Object(n.jsxs)("div",{className:"popup-buttons-container",children:[Object(n.jsx)(f.a,{onClick:i,children:"Cancel"}),Object(n.jsx)(f.a,{onClick:function(){var e={title:t.title.length};p(e),e.title&&o()},variant:"contained",color:"primary",children:"Add"})]})]})})},h="add_marker",x="map_movement",A=a(32),v=a.n(A),y={id:"3d-buildings",source:"composite","source-layer":"building",filter:["==","extrude","true"],type:"fill-extrusion",minzoom:15,paint:{"fill-extrusion-color":"#aaa","fill-extrusion-height":["interpolate",["linear"],["zoom"],15,0,15.05,["get","height"]],"fill-extrusion-base":["interpolate",["linear"],["zoom"],15,0,15.05,["get","min_height"]],"fill-extrusion-opacity":.6}},C={id:"buildings",source:"composite","source-layer":"building",filter:["==","extrude","true"],type:"fill-extrusion",minzoom:15},N={id:"places",type:"symbol",source:"places",layout:{"icon-image":"custom-marker","icon-allow-overlap":!0}},S=function(e){return{type:"Feature",properties:{title:e.title,description:e.description},geometry:{type:"Point",coordinates:[e.lng,e.lat]}}};var k=function(e){var t=e.title,a=e.description;return Object(n.jsxs)("div",{className:"tooltip-container",children:[Object(n.jsx)("div",{className:"tooltip-title",children:t}),a.length>0&&Object(n.jsx)("div",{className:"tooltip-description",children:a})]})};var D=function(){var e=Object(r.b)(),t=Object(r.c)((function(e){return e.map.geoData})).payload,a=Object(r.c)((function(e){return e.map})).mapSettings,o=Object(c.useState)({isOpen:!1,title:"",description:"",lng:0,lat:0}),s=Object(g.a)(o,2),l=s[0],p=s[1],d=Object(c.useState)(null),m=Object(g.a)(d,2),f=m[0],A=m[1],D=Object(c.useRef)(null);Object(c.useEffect)((function(){v.a.accessToken="pk.eyJ1IjoibmlraXRhYm9nZGFub3YiLCJhIjoiY2tpZnd2N3ZhMDI2aDJ1bzMwcXdlaTF6cyJ9.TG6WMDhBBdEZ02AnCstRrw";var e=new v.a.Map({container:D.current,style:"mapbox://styles/mapbox/streets-v11",center:[a.lng,a.lat],zoom:a.zoom});e.on("load",(function(){return w(e)})),e.on("click","buildings",(function(t){return B(t,e)})),e.on("moveend",(function(){return L(e)}))}),[]);var L=function(t){var a;e((a={lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toFixed(2)},{type:x,payload:a}))},B=function(e,t){e.preventDefault(),p({isOpen:!0,title:"",description:"",lng:e.lngLat.lng,lat:e.lngLat.lat}),A(t)},w=function(e){F(e),E(e)},F=function(e){for(var a,n=e.getStyle().layers,c=0;c<n.length;c++)if("symbol"===n[c].type&&n[c].layout["text-field"]){a=n[c].id;break}e.addLayer(y,a),e.addLayer(C,a),e.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEAAACxABrSO9dQAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMkMEa+wAAADESURBVEhLvc1BDsMwCETR3P/SLkYCOfBtSNVm8VA0gfE1xvg7DNFcjWbegKGykrWUyKxgqDplnR2BoWocu2IPQ2WHh2NX7GGo7LAoUMVeCtx6tDl2trvZS4FbDzfHqrGXAtc4Vo29FLjGcWtHYOiqgvX/bkdg6GJJRSbB8CYWncgkGN6sBfZNZO5geBPLiMwTDJNYGsk8wTCJpSuZFQyTWLySWcEQxXIjs4IhssKHD0wYbj0sNxhuvfLI9MojX8Dwt8b1Add1/VdzVL1BAAAAAElFTkSuQmCC",(function(a,n){e.addImage("custom-marker",n),e.addSource("places",{type:"geojson",data:{type:"FeatureCollection",features:t}}),e.addLayer(N)}))},E=function(e){var t=new v.a.Popup({closeButton:!1}),a=document.createElement("div");e.on("mouseenter","places",(function(c){e.getCanvas().style.cursor="pointer";var o=c.features[0].geometry.coordinates.slice(),r=c.features[0].properties.description,s=c.features[0].properties.title;for(i.a.render(Object(n.jsx)(k,{title:s,description:r}),a);Math.abs(c.lngLat.lng-o[0])>180;)o[0]+=c.lngLat.lng>o[0]?360:-360;t.setLngLat(o).setDOMContent(a).addTo(e)})),e.on("mouseleave","places",(function(){e.getCanvas().style.cursor="",t.remove()}))};return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("div",{ref:D,className:"mapContainer"}),l.isOpen&&Object(n.jsx)(O,{addInfo:l,onChange:function(e,t){p(Object(j.a)(Object(j.a)({},l),{},Object(u.a)({},t,e)))},onAdd:function(){var t;f.getSource("places").setData({type:"FeatureCollection",features:[].concat(Object(b.a)(f.getSource("places")._data.features),[S(l)])}),p({isOpen:!1,title:"",description:"",lng:0,lat:0}),e((t=f.getSource("places")._data.features,{type:h,payload:t})),localStorage.setItem("geoData",JSON.stringify(f.getSource("places")._data.features))},onCancel:function(){return p(Object(j.a)(Object(j.a)({},l),{},{isOpen:!1}))}})]})},L=a.p+"static/media/logo.6ce24c58.svg";var B=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("header",{className:"App-header",children:[Object(n.jsx)("img",{src:L,className:"App-logo",alt:"logo"}),Object(n.jsx)("p",{children:"Welcome back!"}),Object(n.jsx)("input",{onKeyPress:function(e){console.log(e.key)}}),Object(n.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},w={mapSettings:{lng:-77.020945,lat:38.878241,zoom:17},geoData:{payload:[]}},F=Object(p.c)({map:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:return Object(j.a)(Object(j.a)({},e),{},{geoData:{payload:t.payload}});case x:return Object(j.a)(Object(j.a)({},e),{},{mapSettings:t.payload});default:return e}}}),E=Object(p.d)(F,Object(d.load)(),Object(p.a)(Object(d.save)()));i.a.render(Object(n.jsx)(r.a,{store:E,children:Object(n.jsxs)(s.a,{basename:"/mapbox-gl-app/#",children:[Object(n.jsx)(l.a,{path:"/",component:D,exact:!0}),Object(n.jsx)(l.a,{path:"/welcome",component:B,exact:!0})]})}),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.63d5d077.chunk.js.map