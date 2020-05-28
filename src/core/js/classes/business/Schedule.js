/**
 * Encapsulates data and methods that correspond to
 * Routine repetition beyond day limits.
 */
class Schedule {
  /**
   *
   */
  constructor(tpm, tpw, intd, intw, intm) {
    // initialize properties via setters
    this.timesPerMonth = tpm;
    this.timesPerWeek = tpw;
    this.intervalDays = intd;
    this.intervalWeeks = intw;
    this.intervalMonths = intm;
    // initialize properties directly
    this[Symbol.toStringTag] = "Schedule";
    this.__routines = new SetWrap();
    // create descriptor
    let desc = Object.create(null);
    desc.writable = true;
    desc.enumerable = true;
    desc.configurable = false;
    // create public properties (for getters/setters)
    //  that follow project-wide naming convention
    Object.defineProperty(this, "__timesPerMonth", desc);
    Object.defineProperty(this, "__timesPerWeek", desc);
    Object.defineProperty(this, "__intervalDays", desc);
    Object.defineProperty(this, "__intervalWeeks", desc);
    Object.defineProperty(this, "__intervalMonths", desc);
    Object.defineProperty(this, "__routines", desc);
  }

  /**
   * @property {integer} Name Public field that holds
   * @deprecated By project convention should not be accessed directly, but with use of the {@link Schedule#timesPerMonth|getter / setter} function.
   */
  __timesPerMonth;

  /**
   * @property {integer} Name Public field that holds
   * @deprecated By project convention should not be accessed directly, but with use of the {@link Schedule#timesPerMonth|getter / setter} function.
   */
  __timesPerWeek;

  /**
   * @property {integer} Name Public field that holds
   * @deprecated By project convention should not be accessed directly, but with use of the {@link Schedule#timesPerMonth|getter / setter} function.
   */
  __intervalDays;

  /**
   * @property {integer} Name Public field that holds
   * @deprecated By project convention should not be accessed directly, but with use of the {@link Schedule#timesPerMonth|getter / setter} function.
   */
  __intervalWeeks;

  /**
   * @property {integer} Name Public field that holds
   * @deprecated By project convention should not be accessed directly, but with use of the {@link Schedule#timesPerMonth|getter / setter} function.
   */
  __intervalMonths;

  /**
   * @property {integer} Name Public field that holds
   * @deprecated By project convention should not be accessed directly, but with use of the {@link Schedule#timesPerMonth|getter / setter} function.
   */
  __routines;

  /* Prototype getters and setters */
  /**
   * @property {integer} timesPerMonth Public property that holds
   *  a list of Routines attached to the Schedule.<br>
   *  Utilizes the `__routines` field by `routines()` get and set methods.
   */
  get timesPerMonth() {
    return this.__timesPerMonth;
  }

  set timesPerMonth(v) {
    // parseFloat is used since parseInt cuts off the decimal part
    if (typeof v !== "number" && parseFloat(v) % 1 !== 0) {
      throw new SyntaxError(
        "Invalid argument. timesPerMonth must be an integer number."
      );
    }
    this.__timesPerMonth = v;
  }

  /**
   * @property {} Name Public property that holds
   *  a list of Routines attached to the Schedule.<br>
   *  Utilizes the `__routines` field by `routines()` get and set methods.
   */
  get timesPerWeek() {
    return this.__timesPerWeek;
  }

  set timesPerWeek(v) {
    // parseFloat is used since parseInt cuts off the decimal part
    if (typeof v !== "number" && parseFloat(v) % 1 !== 0) {
      throw new SyntaxError(
        "Invalid argument. timesPerWeek must be an integer number."
      );
    }
    this.__timesPerWeek = v;
  }

  /**
   * @property {} Name Public property that holds
   *  a list of Routines attached to the Schedule.<br>
   *  Utilizes the `__routines` field by `routines()` get and set methods.
   */
  get intervalDays() {
    return this.__intervalDays;
  }

  set intervalDays(v) {
    // parseFloat is used since parseInt cuts off the decimal part
    if (typeof v !== "number" && parseFloat(v) % 1 !== 0) {
      throw new SyntaxError(
        "Invalid argument. intervalDays must be an integer number."
      );
    }
    this.__intervalDays = v;
  }

  /**
   * @property {} Name Public property that holds
   *  a list of Routines attached to the Schedule.<br>
   *  Utilizes the `__routines` field by `routines()` get and set methods.
   */
  get intervalWeeks() {
    return this.__intervalWeeks;
  }

  set intervalWeeks(v) {
    // parseFloat is used since parseInt cuts off the decimal part
    if (typeof v !== "number" && parseFloat(v) % 1 !== 0) {
      throw new SyntaxError(
        "Invalid argument. intervalWeeks must be an integer number."
      );
    }
    this.__intervalWeeks = v;
  }

  /**
   * @property {} Name Public property that holds
   *  a list of Routines attached to the Schedule.<br>
   *  Utilizes the `__routines` field by `routines()` get and set methods.
   */
  get intervalMonths() {
    return this.__intervalMonths;
  }

  set intervalMonths(v) {
    // parseFloat is used since parseInt cuts off the decimal part
    if (typeof v !== "number" && parseFloat(v) % 1 !== 0) {
      throw new SyntaxError(
        "Invalid argument. intervalMonths must be an integer number."
      );
    }
    this.__intervalMonths = v;
  }

  /**
   * @property {SetWrap<Routine>} routines Public property that holds
   *  a Set of Routines attached to the Schedule.<br>
   *  Utilizes the `__routines` field by `routines()` get and set methods.
   */
  get routines() {
    return this.__routines;
  }

  set routines(v) {
    throw new TypeError("Routines property can't be reassigned.");
  }

  /**
   * Adds a Routine object to the list of attached routines
   *  if there is no other Routine object with the same content
   *  in the list already.
   *
   * @param {Routine} r Routine object to be attached to the schedule.
   * @returns {true|false}
   *  - _TRUE_ for the unique routine that was attached
   *  - _FALSE_ for the routine, being a duplicate
   *  (i.e., having a routine object with the same content
   *  that has been attached already).
   * @memberof Schedule
   */
  addRoutine(r) {
    // ternary - Routine obj supplied AND it's not present in __routines
    return r instanceof Routine &&
      !this.routines.setSelector(
        // FIXME: edit properties to correspond Routine object
        {
        timesPerMonth: r.timesPerMonth,
        timesPerWeek: r.timesPerWeek,
        intervalDays: r.intervalDays,
        intervalWeeks: r.intervalWeeks,
        intervalMonths: r.intervalMonths,
      }, "Routine")
      ? !!this.routines.add(r) // true for unique inserts
      : false; // false for duplicates

    // locally scoped utility function for code readability
    function getFromSet(set, tpm, tpw, intd, intw, intm) {
      for (const v of set) {
        //loop through the entire set
        if (
          v.timesPerMonth === tpm &&
          v.timesPerWeek === tpw &&
          v.intervalDays === intd &&
          v.intervalWeeks === intw &&
          v.intervalMonths === intm
        ) {
          return v; //object found in set
        }
      }
      return null; //object not found in set
    }
  }

  removeRoutine(r) {}
}
