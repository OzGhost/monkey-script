window.onload = function(){
  function testRun(start, end, expect) {
    var out = window.kit.workingDayCount()
                      .count(new Date(start), new Date(end)).format()
    if (expect === out) {
      console.log('PASS')
    } else {
      console.error('expected: [' + expect + '] but was: [' + out + ']')
    }
  }
  
  testRun('2018-10-01T00:00:00', '2018-10-01T00:00:00', '0d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-01T11:00:00', '0d3h30m')
  testRun('2018-10-01T12:00:00', '2018-10-01T23:40:00', '0d6h4m')
  testRun('2018-10-01T00:00:00', '2018-10-01T22:00:00', '1d0h0m')
  testRun('2018-10-01T00:02:00', '2018-10-01T00:05:00', '0d0h3m')
  testRun('2018-10-01T01:58:00', '2018-10-01T02:04:00', '0d0h6m')
  testRun('2018-10-01T08:40:00', '2018-10-01T18:30:00', '0d8h20m')
  testRun('2018-10-01T11:00:00', '2018-10-01T15:25:00', '0d2h55m')
  testRun('2018-10-01T00:00:00', '2018-10-02T00:00:00', '1d0h0m')
  testRun('2018-10-01T07:00:00', '2018-10-02T12:00:00', '1d4h30m')

  testRun('2018-10-01T00:00:00', '2018-10-01T00:00:00', '0d0h0m')

  var d = new Date('2018-10-04T22:02:03')
  console.log(d.getFullYear())
  console.log(d.getMonth())
  console.log(d.getDate())
  console.log(d.getHours())
  console.log(d.getMinutes())
  console.log(d.getSeconds())
}
