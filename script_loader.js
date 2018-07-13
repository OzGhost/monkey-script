// ==UserScript==
// @name     no-name
// @version  1
// @grant    GM.getResourceUrl
// @resource portal_custom_shortcut https://raw.githubusercontent.com/OzGhost/monkey-script/master/portal_custom_shortcut.js
// ==/UserScript==

GM.getResourceUrl("portal_custom_shortcut")
.then(function(rs){
  var tag = document.createElement("SCRIPT")
  tag.src = rs
  tag.type = "text/javascript"
  document.body.appendChild(tag)
  console.log("cout << script [portal_custom_shortcut] loaded.")
}, function(err){
  console.log("cout << fail to load script! [portal_custom_shortcut]")
})

