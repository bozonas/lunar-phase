import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiThemeProvider,  createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

export interface LunarDatePickerProps {
  date: Date,
  onDateChange: (newDate: Date | null) => void
}

export const customTheme = createMuiTheme({
	palette: {
		primary: {
      main: '#424242',
      // contrastText: "#941313"
			// light:  '#43a047',
			// dark: '#43a047'
		},
	},
})

const LunarDatePicker = (props: LunarDatePickerProps) => {
  return (
    <div style={{ position: "absolute" }}>
      <MuiThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <DatePicker
          size='small'
          autoOk
          variant="static"
          openTo="date"
          value={props.date}
          onChange={props.onDateChange}
        />
      </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>

  );
};

export default LunarDatePicker;