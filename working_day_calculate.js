'use strict';
(function(){
  function WorkingDateCounter () {
    var _this = this;
    var test = false;

    var ONE_DATE_MINUTES = 480;
    var MORNING_MINUTES = 180;
    var SEVEN_THIRTY = 450;
    var TWELVE = 720;
    var AFTERNOON_MINUTES = 300;
    var THIRTEEN_THIRTY = 810;
    var NINETEEN_THIRTY = 1170;
    var WHOLE_DAY = 1440;

    _this.count = function(start, end) {
      _this.minutes = 0;

      var adjustedStart = _this.getInRangeStart(start);
      var adjustedEnd = _this.getInRangeEnd(end);

      _this.start = _this.getLocaleTime(adjustedStart);
      _this.end = _this.getLocaleTime(adjustedEnd);
      _this.startMID = _this.minuteInDay(adjustedStart);
      _this.endMID = _this.minuteInDay(adjustedEnd);
      _this.beginningDay = adjustedStart.getDay();
      _this.endingDay = adjustedEnd.getDay();
      _this.excluded = _this.getExcludedRanges();

      if (test)
        console.log(
          start,
          start.toLocaleString(),
          end,
          end.toLocaleString()
        );
      if (test)
        console.log(" adjusted: ",
          adjustedStart,
          _this.start,
          adjustedStart.toLocaleString(),
          adjustedEnd,
          _this.end,
          adjustedEnd.toLocaleString(),
          _this.startMID,
          _this.endMID,
          _this.beginningDay,
          _this.endingDay
        );

      if (_this.end - _this.start > 0) {
        if (_this.withinSingleDay()) {
          _this.minutes += _this.inDayCount(
                                            _this.start,
                                            _this.end,
                                            _this.beginningDay,
                                            _this.start - _this.startMID
                            );
        } else {
          _this.minutes += _this.inDayCount(
                                            _this.start,
                                            _this.start + WHOLE_DAY,
                                            _this.beginningDay,
                                            _this.start - _this.startMID
                            );
          _this.minutes += _this.inDayCount(
                                            _this.end - _this.endMID,
                                            _this.end,
                                            _this.endingDay,
                                            _this.end - _this.endMID
                            );
          _this.countTheRemainingDays_v2();
        }
      }

      return {
        format: _this.format,
        getMinutes: _this.getMinutes
      };
    }

    _this.getExcludedRanges = function() {
      var exc = _this.getConfig("except", []);
      var rs = [];
      var ilen = exc.length;
      for (var i = 0; i < ilen; i++) {
        var ranges = _this.splitRangeToInDayRanges(exc[i][0], exc[i][1]);
        var jlen = ranges.length;
        for (var j = 0; j < jlen; j++) {
          rs[rs.length] = ranges[j];
        }
      }
      return rs;
    }

    _this.splitRangeToInDayRanges = function(lowerBound, upperBound) {
      var lb = _this.getLocaleTime(lowerBound);
      var ub = _this.getLocaleTime(upperBound);

      if (lb >= ub || ! _this.related(lb, ub))
        return [];
      var day = lowerBound.getDay();
      var lbMID = _this.minuteInDay(lowerBound);
      if (day === 0) {
        lb += WHOLE_DAY - lbMID;
        day++;
      }
      if (day === 6) {
        lb += WHOLE_DAY - lbMID + WHOLE_DAY;
        day = 1;
      }
      var rs = [];
      while (lb < ub) {
        if (day !== 0 && day !== 6) {
          rs[rs.length] = lb + WHOLE_DAY < ub
                          ? [lb, lb + WHOLE_DAY]
                          : [lb, ub];
        }
        lb += WHOLE_DAY;
        day++;
        if (day > 6)
          day = 0;
      }
      return rs;
    }

    _this.related = function(lb, ub) {
      return (lb < _this.start && _this.start < ub)
          || (lb < _this.end && _this.end < ub)
          || (_this.start < lb && lb < _this.end)
          || (_this.start < ub && ub < _this.end)
    }

    _this.getConfig = function(key, fallback) {
      var cfg = window.kit.cfg.get("wdc")
      return cfg ? (cfg[key] || fallback) : fallback;
    }

    _this.getInRangeStart = function(baseStart) {
      var lowerBound = _this.getConfig("lowerBound", baseStart);
      return (_this.getLocaleTime(baseStart) < _this.getLocaleTime(lowerBound))
              ? lowerBound
              : baseStart;
    }

    _this.getInRangeEnd = function(baseEnd) {
      var upperBound = _this.getConfig("upperBound", baseEnd);
      if (_this.getLocaleTime(baseEnd) > _this.getLocaleTime(upperBound))
        return upperBound;
      return baseEnd;
    }

    _this.getLocaleTime = function(input) {
      return Math.floor( (input.getTime() - input.getTimezoneOffset()) / 60000 );
    }

    _this.withinSingleDay = function() {
      return _this.end - _this.start < WHOLE_DAY
          && _this.startMID <= _this.endMID;
    };

    _this.inDayCount = function(start, end, dayOfWeek, beginningOfDate) {
      if (dayOfWeek == 0 || dayOfWeek == 6)
        return 0;
      var countable = _this.getCountablePairs(start, end);
      var countableInMinutes = _this.toMinutes(countable, beginningOfDate);
      var len = countableInMinutes.length;
      var rs = 0;
      for (var i = 0; i < len; i++) {
        rs += _this.rangeCount(countableInMinutes[i][0], countableInMinutes[i][1]);
      }
      return rs;
    };

    _this.getCountablePairs = function(start, end) {
      var queue = [];
      queue[0] = [start, end];
      var ilen = _this.excluded.length;
      for (var i = 0; i < ilen; i++) {
        //console.log("excluded: ", i, _this.excluded[i], "queue: ", queue);
        var subQueue = [];
        var jlen = queue.length;
        for (var j = 0; j < jlen; j++) {
          //console.log("queue: ", j, queue[j], "subQueue: ", subQueue);
          var splitted = _this.getCountableRanges(queue[j], _this.excluded[i]);
          var klen = splitted.length;
          //console.log("splitted: ", splitted);
          for (var k = 0; k < klen; k++) {
            subQueue[subQueue.length] = splitted[k];
          }
        }
        queue = subQueue;
      }
      return queue;
    };

    _this.getCountableRanges = function(basePair, excludePair) {
      var a = basePair[0];
      var b = basePair[1];
      var x = excludePair[0];
      var y = excludePair[1];
      if (x <= a) {
        if (y <= a) {
          return [basePair];
        } else {
          if (y >= b) {
            return [];
          } else {
            return [[y, b]];
          }
        }
      } else {
        if (x >= b) {
          return [basePair];
        } else {
          if (y >= b) {
            return [[a, x]];
          } else {
            return [[a, x], [y, b]];
          }
        }
      }
    };

    _this.toMinutes = function(countable, beginningOfDate) {
      var rs = [];
      var len = countable.length;
      for (var i = 0; i < len; i++) {
        rs[rs.length] = [
                          countable[i][0] - beginningOfDate,
                          countable[i][1] - beginningOfDate
                        ];
      }
      return rs;
    };

    _this.rangeCount = function(startMID, endMID) {
      var startPhase = _this.phaseOfDay(startMID);
      var endPhase = _this.phaseOfDay(endMID);

      if (startPhase === endPhase && (
            startPhase === 1
        ||  startPhase === 3
        ||  startPhase === 5
      )) {
        // out of working hours
        return 0;
      }

      if (startPhase === 1 && endPhase === 5) {
        return ONE_DATE_MINUTES;
      }
      var countedMinute = 0;
      if (startPhase < 3)
        countedMinute += _this.morningCount(
                                startMID, startPhase, endMID, endPhase);
      if (endPhase > 3)
        countedMinute += _this.afternoonCount(
                                startMID, startPhase, endMID, endPhase);
      return Math.min(countedMinute, ONE_DATE_MINUTES);
    };

    _this.minuteInDay = function(date) {
      var minute = date.getHours()*60
                    + date.getMinutes();
      if (minute < 0)
        return WHOLE_DAY + minute;
      return minute;
    };

    _this.phaseOfDay = function(minuteInDay) {
      if (0 <= minuteInDay && minuteInDay <= 450)
        return 1;
      if (450 < minuteInDay && minuteInDay < 720)
        return 2;
      if (720 <= minuteInDay && minuteInDay <= 810)
        return 3;
      if (810 < minuteInDay && minuteInDay < 1170)
        return 4;
      if (minuteInDay >= 1170)
        return 5;
      return -1;
    };

    _this.morningCount = function(x, xp, y, yp) {
      if (xp === 1 && yp > 2) {
        return MORNING_MINUTES;
      }
      var lowerBound = Math.max(x, SEVEN_THIRTY);
      var upperBound = Math.min(y, TWELVE);
      return upperBound - lowerBound;
    };

    _this.afternoonCount = function(x, xp, y, yp) {
      if (yp === 5 && xp < 4) {
        return AFTERNOON_MINUTES;
      }
      var lowerBound = Math.max(x, THIRTEEN_THIRTY);
      var upperBound = Math.min(y, NINETEEN_THIRTY);
      return upperBound - lowerBound;
    };

    _this.countTheRemainingDays = function() {
      /*
      var weekDayIndicate = _this.beginningDay;
      var remainingMinutes = _this.end - _this.start;
      remainingMinutes -= _this.endMID;
      remainingMinutes -= WHOLE_DAY - _this.startMID;
      var remainingDays = Math.floor(remainingMinutes / WHOLE_DAY);
      for (var i = 0; i < remainingDays; i++) {
        weekDayIndicate++;
        if (weekDayIndicate > 6)
          weekDayIndicate = 0;
        if (weekDayIndicate != 0 && weekDayIndicate != 6) {
          _this.minutes += ONE_DATE_MINUTES;
        }
      }
      */
      console.error("calling legacy code");
    };

    _this.countTheRemainingDays_v2 = function() {
      var weekDayIndicate = _this.beginningDay;
      var pot = _this.start + WHOLE_DAY - _this.startMID;
      var endPoint = _this.end - _this.endMID;

      while (pot < endPoint) {
        weekDayIndicate++;
        if (weekDayIndicate > 6) {
          weekDayIndicate = 0;
        }
        _this.minutes += _this.inDayCount(
                                            pot,
                                            pot + WHOLE_DAY,
                                            weekDayIndicate,
                                            pot
                          );
        pot += WHOLE_DAY;
      }
      
    }

    _this.format = function() {
      var days = Math.floor(_this.minutes / ONE_DATE_MINUTES);
      var hours = Math.floor(_this.minutes / 60);
      var minutes = _this.minutes - hours*60;
      hours -= days*8;
      return days + 'd' + hours + 'h' + minutes + 'm';
    };

    _this.getMinutes = function() {
      return _this.minutes;
    };

    return {
      count: _this.count
    };
  };

  window.kit = window.kit || {};
  window.kit.wdc = window.kit.wdc || new WorkingDateCounter();
})();

