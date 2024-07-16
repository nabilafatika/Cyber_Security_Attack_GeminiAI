import Header from "../../components/Header";
import BumpChart from "../../components/BumpChart";
import { Box } from "@mui/material";

const Bump = () => {
  return (
    <Box height="500px" width="1000px" m="20px">
       <Header title="Bump Chart" subtitle="Show the Attack_Type, Action_Taken and Severity_Level then Visualize it Year by Year" />
      <Box height="75vh">
        <BumpChart />
      </Box>
    </Box>
  );
};
export default Bump;