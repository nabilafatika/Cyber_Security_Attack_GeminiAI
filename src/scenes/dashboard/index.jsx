import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import {GeographyChart1, GeographyChart2 } from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import { PieChart1, PieChart2, PieChart3 } from '../../components/PieChart'; 
import StatBox from "../../components/StatBox";
import Ai from "../../AI.jsx";
import BumpChart from "../../components/BumpChart";
import CalendarChar from "../../Calendars.jsx";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrafficIcon from "@mui/icons-material/Traffic";
import PublicIcon from '@mui/icons-material/Public';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import React from 'react';
import { Casescount, SourceCountryCount,  DestinationCountryCount, SeverityLevelPercentages } from '../../components/Count';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box height="500px" width="1000px" m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="DASHBOARD" 
        subtitle={
          <Typography sx={{ color: colors.grey[100], fontSize: "17px"}}>
       Welcome to Cyber Security Attack Dashboard Visualization and AI
          </Typography>
        }
        />
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* BANYAKNYA KASUS */}
        <Box
         gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="15px"
        >
        <StatBox
         title={<Casescount />}
        subtitle={
        <Typography sx={{ color: colors.grey[100], fontSize: "13px"}}>
        Total incidents in 2023
        </Typography>
        }
         icon={<AnalyticsIcon />}
        />
        </Box>
         {/* TOTAL NEGARA ASAL */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
        >
          <StatBox
            title={<SourceCountryCount />} 
            subtitle={
              <Typography sx={{ color: colors.grey[100], fontSize: "13px"}}>
              Source Countries in 2023
                  </Typography>
            }
            icon={<PublicIcon/>}
          />
        </Box>    
         {/* TOTAL NEGARA TUJUAN */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
        >
          <StatBox
            title={<DestinationCountryCount />} 
            subtitle={
               <Typography sx={{ color: colors.grey[100], fontSize: "13px"}}>
                 Destination Countries in 2023
                   </Typography>
            }
            icon={<GpsFixedIcon/>
            }
          />
        </Box>
            {/* SEVERITY LEVEL PERCENTAGES */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
        >
          <StatBox
          subtitle={
              <Typography sx={{ color: colors.grey[100], fontSize: "12px" }}>
           Severity Level Percentages for 2023
           {<SeverityLevelPercentages />} 
                </Typography>
            }
            icon={<TrafficIcon/>
            }
          />
        </Box> 
          {/* AI */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor= "#a1a4ab"
          padding="17px"
          overflow="auto"
          borderRadius="15px"
        >
          <Box height="200px">
          <Ai />
          </Box>
        </Box>
        {/* LINE CHART */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
            <Typography 
              variant="h4" 
              fontWeight="BOLD">
              <span style={{ color: tokens("dark").blueAccent[700]}}>MALWARE INDICATOR </span> - 
              <span style={{ color: tokens("dark").redAccent[300] }}> ALERT </span> - 
              <span style={{ color: tokens("dark").greenAccent[600] }}> IDS/IPS ALERT</span>
              <span style={{ color: tokens("dark").grey[600] }}> in 2023</span>
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
          {/* BAR CHART */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 0px 0 30px"}}
          >
           Bar Chart <br/>
           of Log Source, Browser, and Device/OS based on Attack Types in 2023
          </Typography>
          <Box  mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* BUMP CHART */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "18px 0px 0 30px" }}
          >
            Bump Chart <br/>
            of Attack_Type, Action_Taken and Severity_Level 2020 to 2023
          </Typography>
          <Box height="400px" >
            <BumpChart isDashboard={true} />
          </Box>
        </Box>
        {/* CALENDAR HEATMAP */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "17px 30px 0 30px" }}
          >
            Calendar HeatMap 2020 -2023<br/>
            the time-stamp that show frequency of cases day by day
          </Typography>
          <Box height="400px">
            <CalendarChar isDashboard={true} />
          </Box>
        </Box>
          {/* PIE CHART HIGH */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Level Severity HIGH 2020 to 2023
          </Typography>
          <Box height="200px" mt="-17px">
            <PieChart1 isDashboard={true} />
          </Box>
        </Box>
        {/* PIE CHART MEDIUM */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 20px 0 30px" }}
          >
            Level Severity MEDIUM 2020 to 2023
          </Typography>
          <Box height="200px" mt="-17px">
            <PieChart2 isDashboard={true} />
          </Box>
        </Box>
            {/* PIE CHART LOW */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Level Severity LOW 2020 to 2023
          </Typography>
          <Box height="200px" mt="-17px">
            <PieChart3 isDashboard={true} />
          </Box>
        </Box>    
          {/* GEOGRAPHY CHART THREAT SOURCE */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="10px"
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "10px 30px 0 30px" }}
          >
            Geography Threat Source by Country 2020 to 2023
          </Typography>
          <Box height="200px" mt="20px">
            <GeographyChart1 isDashboard={true} />
          </Box>
        </Box>
         {/* GEOGRAPHY CHART TARGET SOURCE*/}
         <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="10px"
          borderRadius="15px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "10px 30px 0 30px" }}
          >
            Geography Target attack by country 2020 to 2023
          </Typography>
          <Box height="200px" mt="20px">
            <GeographyChart2 isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;