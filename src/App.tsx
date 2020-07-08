import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import LunarDatePicker from './MoonDatePicker';
import MoonInfo from './MoonInfo';
import MainMoonImage from './MainMoonImage';
import './App.css';


function App() {
  const [date, changeDate] = useState(new Date());

  let handleDateChange = (newDate: Date | null): void => {
    changeDate(newDate!);
  }

  let imgNo = getImageNo(date);

  return (
    <div className="App">
      <Grid container
        justify="center"
        spacing={0}>
        <Grid item lg={3} md={12}>
          <LunarDatePicker date={date} onDateChange={handleDateChange} />
        </Grid>
        <Grid item lg={6} md={12}>
          <MainMoonImage imageNo={imgNo} />
        </Grid>
        <Grid item lg={3} md={12} style={{paddingTop: "20px"}}>
          <MoonInfo imageNo={imgNo} />
        </Grid>
      </Grid>
    </div>
  );
}

function getImageNo(currentDate: Date): number {
  let januaryOne = Date.UTC(currentDate.getUTCFullYear(), 0, 1, 0, 0, 0);
  let imageNo = 1 + Math.round((currentDate.getTime() - januaryOne) / 3600000.0);
  return imageNo;
}

export default App;
