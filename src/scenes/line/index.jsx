import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Box height="500px" width="1000px" m="20px">
      <Header title="Line Chart" subtitle="Line Chart of Malware Indicators, Alerts, and IDS/IPS Alerts based on cases from January to October 2023." />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;