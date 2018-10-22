var launch = function() {
	var tag = document.createElement('SCRIPT')
  tag.src = 'https://127.0.0.1:8080/jira_issue_life_time_count.js'
  tag.type = 'text/javascript'
  document.body.appendChild(tag)
}

var pageOnload = window.onload
window.onload = function() {
  if (typeof(pageOnload) === 'function') {
    pageOnload()
  }
  launch()
}
