/**
 * Class describes a Schedule entity.
 *
 * `Schedule` encapsulates data and methods that correspond to
 * Routine repetition beyond day limits.
 *
 * @class Schedule
 */
class Schedule {
  constructor() {
    // create clear (from inheritance) object for descriptor
    let descriptor = Object.create(null);
    descriptor.writable = true;
    descriptor.enumerable = true;
    descriptor.configurable = false;
    // create public properties (for getters/setters)
    //  that follow project-wide naming convention
    Object.defineProperty(this, "__timesPerMonth", descriptor);
    Object.defineProperty(this, "__timesPerWeek", descriptor);
    Object.defineProperty(this, "__intervalDays", descriptor);
    Object.defineProperty(this, "__intervalWeeks", descriptor);
    Object.defineProperty(this, "__intervalMonths", descriptor);
    Object.defineProperty(this, "__routines", descriptor);
    // initialize routines with an empty secured array
    this.__routines = new SecuredArray();
  }

  /* Prototype getters and setters */
  get timesPerMonth() {
    return this.__timesPerMonth;
  }
  set timesPerMonth(v) {
    // TODO: implement validation
    this.__timesPerMonth = v;
  }
  get timesPerWeek() {
    return this.__timesPerWeek;
  }
  set timesPerWeek(v) {
    // TODO: implement validation
    this.__timesPerWeek = v;
  }
  get intervalDays() {
    return this.__intervalDays;
  }
  set intervalDays(v) {
    // TODO: implement validation
    this.__intervalDays = v;
  }
  get intervalWeeks() {
    return this.__intervalWeeks;
  }
  set intervalWeeks(v) {
    // TODO: implement validation
    this.__intervalWeeks = v;
  }
  get intervalMonths() {
    return this.__intervalMonths;
  }
  set intervalMonths(v) {
    // TODO: implement validation
    this.__intervalMonths = v;
  }
  get routines() {
    return this.__routines;
  }
  set routines(v) {
    throw new TypeError("Routines property can't be reassigned.");
  }

  // TODO: finish implementing the class.
}
