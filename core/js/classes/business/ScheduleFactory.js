/**
 * Singleton factory class for Schedules.
 *  Holds a list of Schedules. Returns the existing one
 *  or creates a new and adds it to the list.
 *
 * @class ScheduleFactory
 */
class ScheduleFactory {
  /**
   * Implements the Singleton pattern.
   * @memberof ScheduleFactory
   */
  constructor() {
    if (!ScheduleFactory._INSTANCE) {
      // initialize a list for Schedules
      this.schedules = [];
      // initialize descriptor to protect from Object.assign() and ...
      let desc = Object.create(null);
      desc.enumerable = false;
      // make properties !enumerable
      Object.defineProperty(this, "schedules", desc);
      // prevent singleton instance mutation
      Object.freeze(this);
      ScheduleFactory._INSTANCE = this;
      return this;
    }
    // prevent creation of multiple instances by throwing an error
    throw new Error("Can't create multiple instances of a singleton class.");
  }

  /**
   * Returns the ScheduleFactory single instance.
   *
   * Either creates a new instance if none, or returns the existing one.
   *
   * @static
   * @returns {ScheduleFactory} ScheduleFactory instance.
   * @memberof ScheduleFactory
   */
  static getInstance() {
    if (!ScheduleFactory._INSTANCE) {
      return new ScheduleFactory();
    }
    return ScheduleFactory._INSTANCE;
  }

  /**
   * Returns the Schedule object, identified by an array of its properties.
   * 
   * Either creates a _new_ Schedule object and adds it to the list, 
   *  or takes the _existing_ one from the list.
   *
   * @param {Array<number>} params Array of numbers that correspond to the
   *  Schedule - to be found or created - properties. 
   * Order matters : `[ timesPerMonth,
                        timesPerWeek,
                        intervalDays,
                        intervalWeeks,
                        intervalMonths, ]`.
   * @returns {Schedule} Schedule object.
   * @memberof ScheduleFactory
   */
  getSchedule(params) {
    let error = new SyntaxError(
      "Incorrect function parameter.\r\ngetSchedule() requires an Array of 5 numbers that correlates with Schedule properties.\r\nSupplied with : " +
        typeof params +
        "->" +
        JSON.stringify(params)
    );
    // check that an array of exact lenth is supplied
    if (!Array.isArray(params) || params.length !== 5) {
      throw error;
    }
    // check that supplied params all are numbers that are not floats
    if (
      // parseFloat is used since parseInt cuts off the decimal part
      !params.every((e) => typeof e === "number" && parseFloat(e) % 1 === 0)
    ) {
      throw error;
    }
    // desctructing assignment
    let [
      timesPerMonth,
      timesPerWeek,
      intervalDays,
      intervalWeeks,
      intervalMonths,
    ] = params;
    let schedules = ScheduleFactory._INSTANCE.schedules;
    return (
      // either found the Schedule object
      schedules.find((e) =>
        e.timesPerMonth === timesPerMonth &&
        e.timesPerWeek === timesPerWeek &&
        e.intervalDays === intervalDays &&
        e.intervalWeeks === intervalWeeks &&
        e.intervalMonths === intervalMonths
          ? true
          : false
      ) ||
      // or created a new one
      createSchedule(
        timesPerMonth,
        timesPerWeek,
        intervalDays,
        intervalWeeks,
        intervalMonths
      )
    );
    // locally scoped utility function for code readability
    function createSchedule(tpm, tpw, intd, intw, intm) {
      let schedule = new Schedule(tpm, tpw, intd, intw, intm);
      schedules.push(schedule);
      return schedule;
    }
  }
}
