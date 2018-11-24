(function(){
  function WorkingDateCounter () {
    var _this = this;

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

      _this.start = Math.floor(adjustedStart.getTime() / 60000);
      _this.end = Math.floor(adjustedEnd.getTime() / 60000);
      _this.startMID = _this.minuteInDay(adjustedStart);
      _this.endMID = _this.minuteInDay(adjustedEnd);
      _this.beginningDay = adjustedStart.getUTCDay();
      _this.endingDay = adjustedEnd.getUTCDay();

      if (_this.end - _this.start > 0) {
        if (_this.withinSingleDay()) {
          _this.minutes += _this.inDayCount(
                                            _this.startMID,
                                            _this.endMID,
                                            _this.beginningDay
                            );
        } else {
          _this.minutes += _this.inDayCount(
                                  _this.startMID, WHOLE_DAY, _this.beginningDay)
          _this.minutes += _this.inDayCount(
                                  0, _this.endMID, _this.endingDay)
          _this.countTheRemainingDays();
        }
      }

      return {
        format: _this.format,
        getMinutes: _this.getMinutes
      };
    }

    _this.getInRangeStart = function(baseStart) {
      var cfg = window.kit.cfg.get("wdc");
      var lowerBound = cfg ? (cfg.lowerBound || baseStart) : baseStart;
      return (baseStart.getTime() < lowerBound.getTime())
              ? lowerBound
              : baseStart;
    }

    _this.getInRangeEnd = function(baseEnd) {
      var cfg = window.kit.cfg.get("wdc");
      var upperBound = cfg ? (cfg.upperBound || baseEnd) : baseEnd;
      if (baseEnd.getTime() > upperBound.getTime())
        return upperBound;
      return baseEnd;
    }

    _this.withinSingleDay = function() {
      return _this.end - _this.start < WHOLE_DAY
          && _this.startMID <= _this.endMID;
    };

    _this.inDayCount = function(startMID, endMID, dayOfWeek) {
      if (dayOfWeek == 0 || dayOfWeek == 6)
        return 0;
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
                    + date.getMinutes()
                    + date.getTimezoneOffset();
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
    };

    _this.format = function() {
      var days = Math.floor(_this.minutes / ONE_DATE_MINUTES);
      var hours = Math.floor(_this.minutes / 60);
      var minutes = _this.minutes - hours*60;
      hours -= days*8;
      return days + 'd' + hours + 'h' + minutes + 'm';
    };

    _this.getMinutes = function() {
      return _this.minute;
    };

    return {
      count: _this.count
    };
  };

  window.kit = window.kit || {};
  window.kit.wdc = window.kit.wdc || new WorkingDateCounter();
})();

