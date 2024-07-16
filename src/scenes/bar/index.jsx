import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box height="500px" width="1000px" m="20px">
      <Header title="Bar Chart" subtitle="Bar chart of Log Source, Browser, and Device/OS based on Attack Types Malware, Intrusion, and DDoS in 2023" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};
export default Bar;
