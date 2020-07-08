import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

export interface LunarDatePickerProps {
  date: Date,
  onDateChange: (newDate: Date | null) => void
}

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    },
  },
})

const LunarDatePicker = (props: LunarDatePickerProps) => {
  return (
    <div>
      <MuiThemeProvider theme={customTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <div style={{ maxWidth: "100px" }}>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={props.date}
              onChange={props.onDateChange}
            />
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>

  );
};

export default LunarDatePicker;