window.onload = function() {
  var total = 0
  var pass = 0

  function testRun(start, end, expect) {
    total++
    var out = window.kit.workingDayCount()
                      .count(new Date(start), new Date(end)).format()
    console.log('input: from ' + start + ' to ' + end)
    if (expect === out) {
      console.warn('PASS')
      pass++
    } else {
      console.error('expected: [' + expect + '] but was: [' + out + ']')
    }
  }
  
  testRun('2018-10-01T00:00:00', '2018-10-01T00:00:00', '0d0h0m')
  testRun('2018-10-01T02:00:00', '2018-10-01T06:59:00', '0d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-01T11:00:00', '0d3h30m')
  testRun('2018-10-01T08:40:00', '2018-10-01T10:00:00', '0d1h20m')
  testRun('2018-10-01T09:01:00', '2018-10-01T13:30:00', '0d2h59m')
  testRun('2018-10-01T12:00:00', '2018-10-01T23:40:00', '0d5h0m')
  testRun('2018-10-01T12:00:00', '2018-10-01T13:40:00', '0d0h10m')
  testRun('2018-10-01T12:15:00', '2018-10-01T13:30:00', '0d0h0m')
  testRun('2018-10-01T13:45:00', '2018-10-01T14:00:00', '0d0h15m')
  testRun('2018-10-01T15:05:00', '2018-10-01T19:28:00', '0d4h23m')
  testRun('2018-10-01T18:13:00', '2018-10-01T20:18:00', '0d1h17m')
  testRun('2018-10-01T00:00:00', '2018-10-01T22:00:00', '1d0h0m')
  testRun('2018-10-01T09:02:00', '2018-10-01T09:05:00', '0d0h3m')
  testRun('2018-10-01T09:58:00', '2018-10-01T10:04:00', '0d0h6m')
  testRun('2018-10-01T08:40:00', '2018-10-01T18:30:00', '1d0h0m')
  testRun('2018-10-01T11:00:00', '2018-10-01T15:25:00', '0d2h55m')
  testRun('2018-10-01T07:24:00', '2018-10-01T07:36:00', '0d0h6m')
  testRun('2018-10-01T07:24:00', '2018-10-01T07:30:00', '0d0h0m')
  testRun('2018-10-01T07:30:00', '2018-10-01T07:32:00', '0d0h2m')
  testRun('2018-10-01T11:53:00', '2018-10-01T12:06:00', '0d0h7m')
  testRun('2018-10-01T11:53:00', '2018-10-01T12:00:00', '0d0h7m')
  testRun('2018-10-01T12:00:00', '2018-10-01T12:06:00', '0d0h0m')
  testRun('2018-10-01T13:29:00', '2018-10-01T13:31:00', '0d0h1m')
  testRun('2018-10-01T13:29:00', '2018-10-01T13:30:00', '0d0h0m')
  testRun('2018-10-01T13:30:00', '2018-10-01T13:31:00', '0d0h1m')
  testRun('2018-10-01T19:27:00', '2018-10-01T19:37:00', '0d0h3m')
  testRun('2018-10-01T19:27:00', '2018-10-01T19:30:00', '0d0h3m')
  testRun('2018-10-01T19:30:00', '2018-10-01T19:37:00', '0d0h0m')

  testRun('2018-10-01T19:30:00', '2018-10-02T07:30:00', '0d0h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T07:31:00', '0d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T07:30:00', '0d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T07:31:00', '0d0h2m')
  testRun('2018-10-01T13:30:00', '2018-10-02T07:31:00', '0d5h1m')
  testRun('2018-10-01T13:29:00', '2018-10-02T07:31:00', '0d5h1m')
  testRun('2018-10-01T13:29:00', '2018-10-02T07:30:00', '0d5h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T07:29:00', '0d5h0m')

  testRun('2018-10-01T00:00:00', '2018-10-02T00:00:00', '1d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T04:43:00', '1d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T07:29:00', '1d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T07:30:00', '1d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T07:31:00', '1d0h1m')
  testRun('2018-10-01T00:00:00', '2018-10-02T09:31:00', '1d2h1m')
  testRun('2018-10-01T00:00:00', '2018-10-02T11:59:00', '1d2h59m')
  testRun('2018-10-01T00:00:00', '2018-10-02T12:00:00', '1d3h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T12:01:00', '1d3h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T12:47:00', '1d3h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T13:29:00', '1d3h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T13:30:00', '1d3h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T13:31:00', '1d3h1m')
  testRun('2018-10-01T00:00:00', '2018-10-02T15:20:00', '1d4h50m')
  testRun('2018-10-01T00:00:00', '2018-10-02T19:20:00', '2d0h0m')
  testRun('2018-10-01T00:00:00', '2018-10-02T20:20:00', '2d0h0m')

  testRun('2018-10-01T07:31:00', '2018-10-02T00:00:00', '0d7h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T04:43:00', '0d7h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T07:29:00', '0d7h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T07:30:00', '0d7h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T07:31:00', '1d0h0m')
  testRun('2018-10-01T07:31:00', '2018-10-02T09:31:00', '1d2h0m')
  testRun('2018-10-01T07:31:00', '2018-10-02T11:59:00', '1d2h58m')
  testRun('2018-10-01T07:31:00', '2018-10-02T12:00:00', '1d2h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T12:01:00', '1d2h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T12:47:00', '1d2h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T13:29:00', '1d2h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T13:30:00', '1d2h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T13:31:00', '1d3h0m')
  testRun('2018-10-01T07:31:00', '2018-10-02T15:20:00', '1d4h49m')
  testRun('2018-10-01T07:31:00', '2018-10-02T19:20:00', '1d7h59m')
  testRun('2018-10-01T07:31:00', '2018-10-02T20:20:00', '1d7h59m')
  
  testRun('2018-10-01T09:09:00', '2018-10-02T00:00:00', '0d7h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T04:43:00', '0d7h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T07:29:00', '0d7h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T07:30:00', '0d7h21')
  testRun('2018-10-01T09:09:00', '2018-10-02T07:31:00', '0d7h22m')
  testRun('2018-10-01T09:09:00', '2018-10-02T09:31:00', '1d0h22m')
  testRun('2018-10-01T09:09:00', '2018-10-02T11:59:00', '1d1h20m')
  testRun('2018-10-01T09:09:00', '2018-10-02T12:00:00', '1d1h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T12:01:00', '1d1h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T12:47:00', '1d1h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T13:29:00', '1d1h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T13:30:00', '1d1h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T13:31:00', '1d1h22m')
  testRun('2018-10-01T09:09:00', '2018-10-02T15:20:00', '1d3h11m')
  testRun('2018-10-01T09:09:00', '2018-10-02T19:20:00', '1d6h21m')
  testRun('2018-10-01T09:09:00', '2018-10-02T20:20:00', '1d6h21m')

  testRun('2018-10-01T11:59:00', '2018-10-02T00:00:00', '0d5h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T04:43:00', '0d5h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T07:29:00', '0d5h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T07:30:00', '0d5h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T07:31:00', '0d5h2m')
  testRun('2018-10-01T11:59:00', '2018-10-02T09:31:00', '0d7h2m')
  testRun('2018-10-01T11:59:00', '2018-10-02T11:59:00', '1d0h0m')
  testRun('2018-10-01T11:59:00', '2018-10-02T12:00:00', '1d0h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T12:01:00', '1d0h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T12:47:00', '1d0h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T13:29:00', '1d0h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T13:30:00', '1d0h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T13:31:00', '1d0h2m')
  testRun('2018-10-01T11:59:00', '2018-10-02T15:20:00', '1d1h51m')
  testRun('2018-10-01T11:59:00', '2018-10-02T19:20:00', '1d5h1m')
  testRun('2018-10-01T11:59:00', '2018-10-02T20:20:00', '1d5h1m')

  testRun('2018-10-01T12:00:00', '2018-10-02T00:00:00', '0d5h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T04:43:00', '0d5h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T07:29:00', '0d5h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T07:30:00', '0d5h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T07:31:00', '0d5h1m')
  testRun('2018-10-01T12:00:00', '2018-10-02T09:31:00', '0d7h1m')
  testRun('2018-10-01T12:00:00', '2018-10-02T11:59:00', '0d7h59m')
  testRun('2018-10-01T12:00:00', '2018-10-02T12:00:00', '1d0h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T12:01:00', '1d0h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T12:47:00', '1d0h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T13:29:00', '1d0h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T13:30:00', '1d0h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T13:31:00', '1d0h1m')
  testRun('2018-10-01T12:00:00', '2018-10-02T15:20:00', '1d1h50m')
  testRun('2018-10-01T12:00:00', '2018-10-02T19:20:00', '1d5h0m')
  testRun('2018-10-01T12:00:00', '2018-10-02T20:20:00', '1d5h0m')

  testRun('2018-10-01T12:01:00', '2018-10-02T00:00:00', '0d5h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T04:43:00', '0d5h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T07:29:00', '0d5h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T07:30:00', '0d5h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T07:31:00', '0d5h1m')
  testRun('2018-10-01T12:01:00', '2018-10-02T09:31:00', '0d7h1m')
  testRun('2018-10-01T12:01:00', '2018-10-02T11:59:00', '0d7h59m')
  testRun('2018-10-01T12:01:00', '2018-10-02T12:00:00', '1d0h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T12:01:00', '1d0h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T12:47:00', '1d0h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T13:29:00', '1d0h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T13:30:00', '1d0h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T13:31:00', '1d0h1m')
  testRun('2018-10-01T12:01:00', '2018-10-02T15:20:00', '1d1h50m')
  testRun('2018-10-01T12:01:00', '2018-10-02T19:20:00', '1d5h0m')
  testRun('2018-10-01T12:01:00', '2018-10-02T20:20:00', '1d5h0m')

  testRun('2018-10-01T13:29:00', '2018-10-02T00:00:00', '0d5h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T04:43:00', '0d5h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T07:29:00', '0d5h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T07:30:00', '0d5h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T07:31:00', '0d5h1m')
  testRun('2018-10-01T13:29:00', '2018-10-02T09:31:00', '0d7h1m')
  testRun('2018-10-01T13:29:00', '2018-10-02T11:59:00', '0d7h59m')
  testRun('2018-10-01T13:29:00', '2018-10-02T12:00:00', '1d0h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T12:01:00', '1d0h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T12:47:00', '1d0h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T13:29:00', '1d0h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T13:30:00', '1d0h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T13:31:00', '1d0h1m')
  testRun('2018-10-01T13:29:00', '2018-10-02T15:20:00', '1d1h50m')
  testRun('2018-10-01T13:29:00', '2018-10-02T19:20:00', '1d5h0m')
  testRun('2018-10-01T13:29:00', '2018-10-02T20:20:00', '1d5h0m')

  testRun('2018-10-01T13:30:00', '2018-10-02T00:00:00', '0d5h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T04:43:00', '0d5h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T07:29:00', '0d5h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T07:30:00', '0d5h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T07:31:00', '0d5h1m')
  testRun('2018-10-01T13:30:00', '2018-10-02T09:31:00', '0d7h1m')
  testRun('2018-10-01T13:30:00', '2018-10-02T11:59:00', '0d7h59m')
  testRun('2018-10-01T13:30:00', '2018-10-02T12:00:00', '1d0h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T12:01:00', '1d0h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T12:47:00', '1d0h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T13:29:00', '1d0h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T13:30:00', '1d0h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T13:31:00', '1d0h1m')
  testRun('2018-10-01T13:30:00', '2018-10-02T15:20:00', '1d1h50m')
  testRun('2018-10-01T13:30:00', '2018-10-02T19:20:00', '1d5h0m')
  testRun('2018-10-01T13:30:00', '2018-10-02T20:20:00', '1d5h0m')

  testRun('2018-10-01T13:31:00', '2018-10-02T00:00:00', '0d4h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T04:43:00', '0d4h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T07:29:00', '0d4h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T07:30:00', '0d4h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T07:31:00', '0d5h0m')
  testRun('2018-10-01T13:31:00', '2018-10-02T09:31:00', '0d7h0m')
  testRun('2018-10-01T13:31:00', '2018-10-02T11:59:00', '0d7h58m')
  testRun('2018-10-01T13:31:00', '2018-10-02T12:00:00', '0d7h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T12:01:00', '0d7h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T12:47:00', '0d7h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T13:29:00', '0d7h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T13:30:00', '0d7h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T13:31:00', '1d0h0m')
  testRun('2018-10-01T13:31:00', '2018-10-02T15:20:00', '1d1h49m')
  testRun('2018-10-01T13:31:00', '2018-10-02T19:20:00', '1d4h59m')
  testRun('2018-10-01T13:31:00', '2018-10-02T20:20:00', '1d4h59m')

  testRun('2018-10-01T15:31:00', '2018-10-02T00:00:00', '0d2h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T04:43:00', '0d2h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T07:29:00', '0d2h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T07:30:00', '0d2h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T07:31:00', '0d3h0m')
  testRun('2018-10-01T15:31:00', '2018-10-02T09:31:00', '0d5h0m')
  testRun('2018-10-01T15:31:00', '2018-10-02T11:59:00', '0d5h58m')
  testRun('2018-10-01T15:31:00', '2018-10-02T12:00:00', '0d5h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T12:01:00', '0d5h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T12:47:00', '0d5h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T13:29:00', '0d5h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T13:30:00', '0d5h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T13:31:00', '0d6h0m')
  testRun('2018-10-01T15:31:00', '2018-10-02T15:20:00', '0d7h49m')
  testRun('2018-10-01T15:31:00', '2018-10-02T19:20:00', '1d2h59m')
  testRun('2018-10-01T15:31:00', '2018-10-02T20:20:00', '1d2h59m')

  testRun('2018-10-01T19:31:00', '2018-10-02T00:00:00', '0d0h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T04:43:00', '0d0h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T07:29:00', '0d0h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T07:30:00', '0d0h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T07:31:00', '0d0h1m')
  testRun('2018-10-01T19:31:00', '2018-10-02T09:31:00', '0d2h1m')
  testRun('2018-10-01T19:31:00', '2018-10-02T11:59:00', '0d2h59m')
  testRun('2018-10-01T19:31:00', '2018-10-02T12:00:00', '0d3h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T12:01:00', '0d3h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T12:47:00', '0d3h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T13:29:00', '0d3h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T13:30:00', '0d3h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T13:31:00', '0d3h1m')
  testRun('2018-10-01T19:31:00', '2018-10-02T15:20:00', '0d4h50m')
  testRun('2018-10-01T19:31:00', '2018-10-02T19:20:00', '1d0h0m')
  testRun('2018-10-01T19:31:00', '2018-10-02T20:20:00', '1d0h0m')

  testRun('2018-10-01T19:29:00', '2018-10-02T00:00:00', '0d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T04:43:00', '0d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T07:29:00', '0d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T07:30:00', '0d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T07:31:00', '0d0h2m')
  testRun('2018-10-01T19:29:00', '2018-10-02T09:31:00', '0d2h2m')
  testRun('2018-10-01T19:29:00', '2018-10-02T11:59:00', '0d3h0m')
  testRun('2018-10-01T19:29:00', '2018-10-02T12:00:00', '0d3h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T12:01:00', '0d3h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T12:47:00', '0d3h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T13:29:00', '0d3h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T13:30:00', '0d3h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T13:31:00', '0d3h2m')
  testRun('2018-10-01T19:29:00', '2018-10-02T15:20:00', '0d4h51m')
  testRun('2018-10-01T19:29:00', '2018-10-02T19:20:00', '1d0h1m')
  testRun('2018-10-01T19:29:00', '2018-10-02T20:20:00', '1d0h1m')

  testRun('2018-10-01T19:30:00', '2018-10-02T00:00:00', '0d0h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T04:43:00', '0d0h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T07:29:00', '0d0h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T07:30:00', '0d0h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T07:31:00', '0d0h1m')
  testRun('2018-10-01T19:30:00', '2018-10-02T09:31:00', '0d2h1m')
  testRun('2018-10-01T19:30:00', '2018-10-02T11:59:00', '0d2h59m')
  testRun('2018-10-01T19:30:00', '2018-10-02T12:00:00', '0d3h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T12:01:00', '0d3h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T12:47:00', '0d3h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T13:29:00', '0d3h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T13:30:00', '0d3h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T13:31:00', '0d3h1m')
  testRun('2018-10-01T19:30:00', '2018-10-02T15:20:00', '0d4h50m')
  testRun('2018-10-01T19:30:00', '2018-10-02T19:20:00', '1d0h0m')
  testRun('2018-10-01T19:30:00', '2018-10-02T20:20:00', '1d0h0m')

  console.error(' >> ' + pass + ' / ' + total + ' <<')

  /**

  0..x...7:30___y__12......13:30______19:30......23:59  -> y - 7:30
  0..x...7:30______12...y..13:30______19:30......23:59  -> morning
  0..x...7:30______12......13:30___y__19:30......23:59  -> morning + y - 13:30
  
  0......7:30__xy__12......13:30______19:30......23:59  -> y - x
  0......7:30__x___12...y..13:30______19:30......23:59  -> 12 - x
  0......7:30__x___12......13:30___y__19:30......23:59  -> 12 - x + y - 13:30
  0......7:30__x___12......13:30______19:30...y..23:59  -> 12 - x + afternoon
  
  0......7:30______12..x...13:30___y__19:30......23:59  -> y - 13:30
  0......7:30______12..x...13:30______19:30...y..23:59  -> afternoon
  
  0......7:30______12......13:30__xy__19:30......23:59  -> y - x
  0......7:30______12......13:30__x___19:30...y..23:59  -> 19:30 - x

  0..xy..7:30______12......13:30______19:30......23:59  -> 0
  0......7:30______12..xy..13:30______19:30......23:59  -> 0
  0......7:30______12......13:30______19:30..xy..23:59  -> 0

  0..x...7:30______12......13:30______19:30...y..23:59  -> *
  
  */
}