import { useState } from "react";

const AppTimers = () => {
  const [counterSeconds, setCounterSeconds] = useState(0);
  const [counterTenths, setCounterTenths] = useState(0);

  // const number = () =>
  //   counterSeconds < 59
  //     ? setCounterSeconds(counterSeconds + 1)
  //     : setCounterSeconds(0);

  // const number = function () {
  //   if (counterSeconds < 59) {
  //     return counterSeconds + 1;
  //   } else {
  //     return 0;
  //   }
  // };

  const seconds = () =>
    function () {
      if (counterSeconds >= 59) {
        setCounterSeconds(0);
      } else {
        setCounterSeconds(counterSeconds + 1);
      }
    };

  const maxTime = (max, state, setState) =>
    function () {
      if (state >= max - 1) {
        setState(0);
      } else {
        setState(state + 1);
      }
    };
  setTimeout(seconds(), 1000);
  setTimeout(maxTime(10, counterTenths, setCounterTenths), 100);

  return (
    <div>
      {counterSeconds} : {counterTenths}
    </div>
  );
};

export default AppTimers;
