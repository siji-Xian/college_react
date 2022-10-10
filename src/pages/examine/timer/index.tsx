import React, { useState, FC, useRef, useEffect } from 'react';
import moment from 'moment';

interface Props {
  e_time: any;
  onTimer: () => void;
}

// 组件四、时间组件
const LeftTime: FC<Props> = (props) => {
  const { e_time, onTimer } = props;

  const [current, setTime] = useState(' 00 : 00 : 00 ');

  const timerID: any = useRef();

  const deadLine = moment(e_time);

  const deadLineTime = deadLine.diff(moment());

  let durationTime = moment.duration(deadLineTime);

  let isArrived = deadLineTime < 0;

  function fix(num: number, length: number) {
    return ('' + num).length < length
      ? (new Array(length + 1).join('0') + num).slice(-length)
      : '' + num;
  }

  useEffect(() => {
    timerID.current = setInterval(() => {
      let arriveTime = `${fix(durationTime.hours(), 2)} : ${fix(
        durationTime.minutes(),
        2,
      )} : ${fix(durationTime.seconds(), 2)} `;
      if (!isArrived) {
        durationTime = moment.duration(deadLine.diff(moment()));
        setTime(() => arriveTime); // make pretty
      }
    }, 1000);
    return () => {
      clearInterval(timerID.current);
    };
  }, []);

  useEffect(() => {
    if (isArrived) {
      clearInterval(timerID.current);
      onTimer();
    }
  });

  return <div>{current}</div>;
};

export default LeftTime;
