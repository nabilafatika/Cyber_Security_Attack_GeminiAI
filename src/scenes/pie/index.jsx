import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import { PieChart1, PieChart2, PieChart3 } from '../../components/PieChart'; 

const Pie = () => {
  return (
    <Box height="500px" width="1000px" m="20px">
      <Header title="Pie Chart" subtitle="Level Severity of Cyber Security Attacks Based on Attack Types in the Years 2020 - 2023" />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn="span 4" gridRow="span 4">
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontWeight: 'bold' }}>
            Level Severity HIGH
          </Typography>
          <PieChart1 />
        </Box>
        <Box gridColumn="span 4" gridRow="span 4">
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontWeight: 'bold' }}>
            Level Severity MEDIUM
          </Typography>
          <PieChart2 />
        </Box>
        <Box gridColumn="span 4" gridRow="span 4">
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontWeight: 'bold' }}>
            Level Severity LOW
          </Typography>
          <PieChart3 />
        </Box>
      </Box>
    </Box>
  );
};

export default Pie;
