class Schedule {
  constructor() {
    // create object (clear from inheritance) for descriptor
    let propDecriptor = Object.create(null);
    propDecriptor.enumerable = true;
    propDecriptor.configurable = false;
    propDecriptor.writable = true;
    // create public properties for getters/setters
    Object.defineProperty(this, "__timesPerMonth", {
      enumerable: true,
      configurable: false,
      writable: true,
    });
    Object.defineProperty(this, "__timesPerWeek", {
      enumerable: true,
      configurable: false,
      writable: true,
    });
    Object.defineProperty(this, "__intervalDays", {
      enumerable: true,
      configurable: false,
      writable: true,
    });
    Object.defineProperty(this, "__intervalWeeks", {
      enumerable: true,
      configurable: false,
      writable: true,
    });
    Object.defineProperty(this, "__intervalMonths", {
      enumerable: true,
      configurable: false,
      writable: true,
    });
    Object.defineProperty(this, "__routines", {
      enumerable: true,
      configurable: false,
      writable: true,
    });
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
    throw new TypeError(
      "Routines property can't be reassigned."
    );
  }

  // TODO: finish implementing the class.
}
