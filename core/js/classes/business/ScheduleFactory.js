// This class implements singleton pattern.
/* This class has a factory method getSchedule() that returns
either an existing Schedule object or a new Schedule object. */

class ScheduleFactory {
  constructor() {
    ScheduleFactory.getInstance();
  }

  static getInstance() {
    if (!ScheduleFactory._INSTANCE) {
      ScheduleFactory._INSTANCE = new ScheduleFactory();
      ScheduleFactory._INSTANCE.schedules = [];
    }
    return ScheduleFactory._INSTANCE;
  }

  getSchedule = (params) => {
    let error = new SyntaxError(
      `Incorrect function parameter.\r\ngetSchedule() requires an Array of 5 numbers that correlates with Schedule properties.\r\nSupplied with : ${typeof params}->${JSON.stringify(
        params
      )}`
    );
    // check that an array of exact lenth is supplied
    if (!Array.isArray(params) || params.length !== 5) {
      throw error;
    }
    // check that supplied params all are numbers that are not floats
    if (
      !params.every((e) => typeof e === "number" && parseFloat(e) % 1 === 0)
    ) {
      throw error;
    }
    let [
      timesPerMonth,
      timesPerWeek,
      intervalDays,
      intervalWeeks,
      intervalMonths,
    ] = params;
    let schedules = ScheduleFactory._INSTANCE.schedules;
    return (
      schedules.find((e) =>
        e.timesPerMonth === timesPerMonth &&
        e.timesPerWeek === timesPerWeek &&
        e.intervalDays === intervalDays &&
        e.intervalWeeks === intervalWeeks &&
        e.intervalMonths === intervalMonths
          ? true
          : false
      ) ||
      createSchedule(
        timesPerMonth,
        timesPerWeek,
        intervalDays,
        intervalWeeks,
        intervalMonths
      )
    );

    function createSchedule(tpm, tpw, intd, intw, intm) {
      let schedule = new Schedule(tpm, tpw, intd, intw, intm);
      schedules.push(schedule);
      return schedule;
    }
  };
}
