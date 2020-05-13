document.addEventListener("DOMContentLoaded", inputDatesTodayInjector);

function inputDatesTodayInjector() {
  const INPUTS = document.querySelectorAll(
    "input[type='date'][min='today'], input[type='date'][max='today']"
  );
  const TODAY = new Date();
  // ...Convert date to appropriate "input" format
  const TODAY_DATE = new Date(
    TODAY.getTime() - TODAY.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  // ...
  for (let i = 0; i < INPUTS.length; i++) {
    INPUTS[i].min = TODAY_DATE;
  }
}
