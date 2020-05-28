class Routine {
  constructor(
    name,
    description,
    timesPerDay,
    intervalMinutes,
    duration,
    startAt,
    previousOccasion,
    nextOccasion,
    finishedOccasions,
    deferredOccasions,
    failedOccasions,
    initialPlan,
    realPlan
  ) {
    this[Symbol.toStringTag] = "Routine";
    /* Defining fields */
    this.__name;
    this.__description;
    this.__timesPerDay;
    this.__intervalMinutes;
    this.__duration;
    this.__startAt;
    this.__previousOccasion;
    this.__nextOccasion;
    this.__finishedOccasions;
    this.__deferredOccasions;
    this.__failedOccasions;
    this.__initialPlan;
    this.__realPlan;
    /* Initializing fields via setters */
    this.name = name;
    this.description = description;
    this.timesPerDay = timesPerDay;
    this.intervalMinutes = intervalMinutes;
    this.duration = duration;
    this.startAt = startAt;
    this.previousOccasion = previousOccasion;
    this.nextOccasion = nextOccasion;
    this.finishedOccasions = finishedOccasions;
    this.deferredOccasions = deferredOccasions;
    this.failedOccasions = failedOccasions;
    this.initialPlan = initialPlan;
    this.realPlan = realPlan;
  }

  name;
  description;
  timesPerDay;
  intervalMinutes;
  duration;
  startAt;
  previousOccasion;
  nextOccasion;
  finishedOccasions;
  deferredOccasions;
  failedOccasions;
  initialPlan;
  realPlan;

  get name() {
    return this.__name;
  }
  set name(v) {
    if (typeof v === "string") {
      this.__name = v;
    } else {
      throw new TypeError("Routine.name accepts only plain string.");
    }
  }
  get description() {
    return this.__description;
  }
  set description(v) {
    if (typeof v === "string") {
      this.__description = v;
    } else {
      throw new TypeError("Routine.description accepts only plain string.");
    }
  }
  get timesPerDay() {
    return this.__timesPerDay;
  }
  set timesPerDay(v) {
    if (typeof v === "number" && Number.parseFloat(v) % 1 === 0) {
      this.__timesPerDay = v;
    } else {
      throw new TypeError("Routine.timesPerDay accepts only plain integers.");
    }
  }
  get intervalMinutes() {
    return this.__intervalMinutes;
  }
  set intervalMinutes(v) {
    if (typeof v === "number" && Number.parseFloat(v) % 1 === 0) {
      this.__intervalMinutes = v;
    } else {
      throw new TypeError(
        "Routine.intervalMinutes accepts only plain integers."
      );
    }
  }
  get duration() {
    return this.__duration;
  }
  set duration(v) {
    if (typeof v === "number" && Number.parseFloat(v) % 1 === 0) {
      this.__duration = v;
    } else {
      throw new TypeError("Routine.duration accepts only plain integers.");
    }
  }
  get startAt() {
    return this.__startAt;
  }
  set startAt(v) {
    if (typeof v === "Object" && v instanceof Date) {
      this.__startAt = v;
    } else {
      throw new TypeError("Routine.startAt accepts only Date objects.");
    }
  }
  get previousOccasion() {
    return this.__previousOccasion;
  }
  set previousOccasion(v) {
    if (typeof v === "Object" && v instanceof Occasion) {
      this.__previousOccasion = v;
    } else {
      throw new TypeError(
        "Routine.previousOccasion accepts only Occasion objects."
      );
    }
  }
  get nextOccasion() {
    return this.__nextOccasion;
  }
  set nextOccasion(v) {
    if (typeof v === "Object" && v instanceof Occasion) {
      this.__nextOccasion = v;
    } else {
      throw new TypeError(
        "Routine.nextOccasion accepts only Occasion objects."
      );
    }
  }
  get finishedOccasions() {
    return this.__finishedOccasions;
  }
  set finishedOccasions(v) {
    if (typeof v === "number" && Number.parseFloat(v) % 1 === 0) {
      this.__finishedOccasions = v;
    } else {
      throw new TypeError(
        "Routine.finishedOccasions accepts only plain integers."
      );
    }
  }
  get deferredOccasions() {
    return this.__deferredOccasions;
  }
  set deferredOccasions(v) {
    if (typeof v === "number" && Number.parseFloat(v) % 1 === 0) {
      this.__deferredOccasions = v;
    } else {
      throw new TypeError(
        "Routine.deferredOccasions accepts only plain integers."
      );
    }
  }
  get failedOccasions() {
    return this.__failedOccasions;
  }
  set failedOccasions(v) {
    if (typeof v === "number" && Number.parseFloat(v) % 1 === 0) {
      this.__failedOccasions = v;
    } else {
      throw new TypeError(
        "Routine.failedOccasions accepts only plain integers."
      );
    }
  }
  get initialPlan() {
    return this.__initialPlan;
  }
  set initialPlan(v) {
    if (
      this.__initialPlan === undefined &&
      Array.isArray(v) &&
      v.every((v) => typeof v === "object" && v instanceof Occasion)
        ? true
        : false
    ) {
      this.__initialPlan = v;
    } else {
      throw new TypeError("Routine.initialPlan accepts only ");
    }
  }
  get realPlan() {
    return this.__realPlan;
  }
  set realPlan(v) {
    if (
      this.__realPlan === undefined &&
      Array.isArray(v) &&
      v.every((v) => typeof v === "object" && v instanceof Occasion)
        ? true
        : false
    ) {
      this.__initialPlan = v;
    } else {
      throw new TypeError("Routine.initialPlan accepts only ");
    }
  }
}
