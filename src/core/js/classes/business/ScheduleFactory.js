/**
 * Singleton factory class for Schedules.<br>
 *  Holds a list of Schedules.<br>
 *  Returns the existing one
 *    or creates a new and adds it to the list.
 *
 */
class ScheduleFactory {
  /**
   * Implements the Singleton pattern.
   * @hideconstructor
   */
  constructor() {
    if (ScheduleFactory._INSTANCE) {
      // prevent creation of multiple instances by throwing an error
      throw new Error("Can't create multiple instances of a singleton class.");
    }

    /**
     * @property {ScheduleFactory} _INSTANCE The only instance of the ScheduleFactory singleton class.
     * @memberof ScheduleFactory
     * @static
     * @private
     */
    ScheduleFactory._INSTANCE = this;

    /**
     * @property {Set<Schedule>} schedules A list of the Schedule objects.
     */
    this.schedules = new Set();

    /* Some questionable paranoic mutation protection */
    // descriptor against cloning (by Object.assign() and ...)
    let noClone = Object.create(null);
    noClone.enumerable = false;
    noClone.configurable = false;
    // descriptor against reassigning
    let noWrite = Object.create(null);
    noWrite.writable = false;
    noWrite.configurable = false;
    // protection
    Object.defineProperty(this, "schedules", noClone);
    Object.defineProperty(ScheduleFactory, "_INSTANCE", noWrite);
    // lock instance itself
    Object.freeze(this);
  }

  /**
   * Returns the ScheduleFactory single instance.<br>
   * Either creates a new instance if none, or returns the existing one.
   *
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
   * Identifies the Schedule object in the list by an array of its properties.<br>
   * Either creates a _new_ Schedule object and adds it to the list,
   *  or takes the _existing_ one from the list.
   *
   * @param {Array<number>} params Array of numbers that correspond to the
   *  Schedule - to be found or created - properties.<br>
   * Order matters :
   *  * timesPerMonth,
   *  * timesPerWeek,
   *  * intervalDays,
   *  * intervalWeeks,
   *  * intervalMonths.
   *
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
    // check that supplied params are all numbers that are not floats
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
