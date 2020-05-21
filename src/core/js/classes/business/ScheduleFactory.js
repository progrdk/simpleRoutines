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

    this.schedules = new Set();
    this[Symbol.toStringTag] = "ScheduleFactory";
    ScheduleFactory._INSTANCE = this;

    /* Some questionable paranoic mutation protection */

    // descriptor against cloning (by Object.assign() and ...)
    let noClone = Object.create(null);
    noClone.enumerable = false;
    noClone.configurable = false;
    // own properties protection
    Object.defineProperty(this, "schedules", noClone);
    // lock instance itself
    Object.freeze(this);

    // descriptor against reassigning
    let noWrite = Object.create(null);
    noWrite.writable = false;
    noWrite.configurable = false;
    // static properties protection
    Object.defineProperty(ScheduleFactory, "_INSTANCE", noWrite);
  }

  /**
   * @property {ScheduleFactory} _INSTANCE The only instance of the ScheduleFactory singleton class.
   * @memberof ScheduleFactory
   * @static
   * @private
   */
  static _INSTANCE;

  /**
   * @property {Set<Schedule>} schedules A list of the Schedule objects.
   */
  schedules;

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
   * Either creates a _new_ Schedule object and adds it to the list,
   *  or takes the _existing_ one from the list.
   * <br>
   * Identifies the Schedule object in the list by an array of its properties.
   *
   * @param {number} tpm `Schedule.timesPerMonth` value
   * @param {number} tpw `Schedule.timesPerWeek` value
   * @param {number} intd `Schedule.intervalDays` value
   * @param {number} intw `Schedule.intervalWeeks` value
   * @param {number} intm `Schedule.intervalMonths` value
   * @returns {Schedule} Schedule object.
   * @memberof ScheduleFactory
   */
  getSchedule(tpm, tpw, intd, intw, intm) {
    // check that supplied params are all numbers that are not floats
    if (
      // parseFloat is used since parseInt cuts off the decimal part
      [tpm, tpw, intd, intw, intm].some(
        (e) => typeof e !== "number" && parseFloat(e) % 1 !== 0
      )
    ) {
      throw new SyntaxError("Invalid argument. Expected 5 numbers.");
    }
    return (
      // either found the Schedule object
      getFromSet(this.schedules, tpm, tpw, intd, intw, intm) ||
      // or created a new one
      createSchedule(tpm, tpw, intd, intw, intm)
    );

    // locally scoped utility function for code readability
    function getFromSet(set, tpm, tpw, intd, intw, intm) {
      for (const v of set) {
        if (
          v.timesPerMonth === tpm &&
          v.timesPerWeek === tpw &&
          v.intervalDays === intd &&
          v.intervalWeeks === intw &&
          v.intervalMonths === intm
        ) {
          return v;
        }
      }
      return null;
    }
    // locally scoped utility function for code readability
    function createSchedule(tpm, tpw, intd, intw, intm) {
      let schedule = new Schedule(tpm, tpw, intd, intw, intm);
      ScheduleFactory._INSTANCE.schedules.add(schedule);
      return schedule;
    }
  }

  // TODO: implement `deleteSchedule()` to remove Schedule from the list, letting it to be garbage collected.
}
