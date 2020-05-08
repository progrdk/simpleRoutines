class Schedule {
  constructor() {
    // create object (clear from inheritance) for descriptor
    let descriptor = Object.create(null);
    descriptor.enumerable = true;
    descriptor.configurable = false;
    descriptor.writable = true;
    // create public properties for getters/setters
    Object.defineProperty(this, "__timesPerMonth", descriptor);
    Object.defineProperty(this, "__timesPerWeek", descriptor);
    Object.defineProperty(this, "__intervalDays", descriptor);
    Object.defineProperty(this, "__intervalWeeks", descriptor);
    Object.defineProperty(this, "__intervalMonths", descriptor);
    Object.defineProperty(this, "__routines", descriptor);
    // initialize routines with an empty protected array
    this.__routines = new ProtectedArray();
  }

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
