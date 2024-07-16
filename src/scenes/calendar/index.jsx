import Header from "../../components/Header";
import CalendarChart from "../../components/CalendarChart";
import { Box } from "@mui/material";

const Calendar= () => {
  return (
    <Box height="500px" width="1000px" m="20px">
        <Header title="Calender HeatMap" subtitle="Visualise the time-stamp that show frequency of cases day by day" />
      <Box height="75vh">
        <CalendarChart />
      </Box>
    </Box>
  );
};

export default Calendar;