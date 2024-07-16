
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { GeographyChart1, GeographyChart2 } from "../../components/GeographyChart";

const Geography = () => {
  return (  
<Box height="500px" width="1000px" m="20px">
<Header title="Geography" subtitle="Threat Source by Country that visualize with Geography Map 2020 to 2023" />
<Box
  display="grid"
  gridTemplateColumns="repeat(6, 1fr)"
  gridAutoRows="140px"
  gap="20px"
>
  <Box gridColumn="span 6" gridRow="span 3" >
  <Box height="500px" width="1000px" mt="-17px">
  <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, mb: 2, fontWeight: 'bold' }}>
    Threat Source by Country that visualize with Geography Map
    </Typography>
    <GeographyChart1 />
    </Box>
  </Box>
  <Box gridColumn="span 6" gridRow="span 3">
  <Box height="500px" width="1000px" mt="-17px">
  <Typography variant="h4" sx={{ textAlign: 'center', mt: 17, mb: 2, fontWeight: 'bold' }}>
  Target attack by country that visualize with Geography Map
    </Typography>
    <GeographyChart2 />
    </Box>
  </Box>
</Box>
</Box>
  );
};

export default Geography;