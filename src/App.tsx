import React, { useState } from 'react';
import LunarDatePicker from './DatePicker';
import './App.css';

const rootImgPath: string = "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004768/frames/730x730_1x1_30p/";

function App() {
  const [date, changeDate] = useState(new Date());

  let imgNo = getImageNo(date);

  let handleDateChange = (newDate: Date | null) : void => {
    changeDate(newDate!);
  }

  return (
    <div className="App">
      <LunarDatePicker date={date} onDateChange={handleDateChange}/>
      <img id='moon_image' src={`${rootImgPath}moon.${imgNo}.jpg`} alt=""></img>
    </div>
  );
}

function getImageNo(currentDate : Date) : number {
  let januaryOne = Date.UTC(currentDate.getUTCFullYear(), 0, 1, 0, 0, 0);
  let imageNo = 1 + Math.round((currentDate.getTime() - januaryOne)/3600000.0);
  return imageNo;
}

export default App;
