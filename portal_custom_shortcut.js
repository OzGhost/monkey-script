
fetch('https://raw.githubusercontent.com/OzGhost/monkey-script/master/di.js')
.then(function(rs){
  console.log("cout << got rs: ", rs, arguments)
}, function(err){
  console.log("cout << got err: ", err, arguments)
})
