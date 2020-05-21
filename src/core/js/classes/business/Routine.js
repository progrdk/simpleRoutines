class Routine {
  constructor(tpm, tpw, intd, intw, intm) {
    if (
      tpm === undefined ||
      tpw === undefined ||
      intd === undefined ||
      intw === undefined ||
      intm === undefined
    ) {
      throw new SyntaxError("All function mandatory parameters are required.");
    }
    this[Symbol.toStringTag] = "Routine";
    this.timesPerMonth = tpm;
    this.timesPerWeek = tpw;
    this.intervalDays = intd;
    this.intervalWeeks = intw;
    this.intervalMonths = intm;
  }
}
