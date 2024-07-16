import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import Papa from 'papaparse';

const CustomTooltip = ({ point }) => {
  const cleanId = point.id.replace(/\.\d+$/, "");
  return (
    <div style={{ color: point.serieColor, background: 'rgba(0, 0, 0, 0.75)', padding: '5px', borderRadius: '3px' }}>
      <div>{cleanId}</div>
      <div>In {point.data.x}</div>
      <div>{point.data.y} Cases</div>
    </div>
  );
};
const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fetchData = async () => {
    const response = await fetch('/Cyber_Security_Attack.csv');
    const text = await response.text();
    return Papa.parse(text, { header: true }).data;
  };
  const processData = (data) => {
    const result = {
      'IoC Detected': { id: 'IoC Detected', color: tokens("dark").blueAccent[600], data: [] },
      'No Detection': { id: 'No Detection', color: tokens("dark").blueAccent[200], data: [] },
      'Yes Alert': { id: 'Yes Alert', color: tokens("dark").redAccent[500], data: [] },
      'No Alert': { id: 'No Alert', color: tokens("dark").redAccent[200], data: [] },
      'Alert Data': { id: 'Alert Data', color: tokens("dark").greenAccent[600], data: [] },
      'No Data': { id: 'No Data',  color: tokens("dark").greenAccent[300], data: [] }
    };
    const monthCounts = {
      'IoC Detected': {},
      'No Detection': {},
      'Yes Alert': {},
      'No Alert': {},
      'Alert Data': {},
      'No Data': {}
    };
    data.forEach(row => {
      const year = parseInt(row.Year, 10);
      const month = row.Month;
      if (year === 2023) {
        const monthName = monthNames[parseInt(month, 10) - 1];
        if (row['Malware_Indicators'] === 'IoC Detected' || row['Malware_Indicators'] === 'No Detection') {
          const category = row['Malware_Indicators'] === 'IoC Detected' ? 'IoC Detected' : 'No Detection';
          if (!monthCounts[category][monthName]) {
            monthCounts[category][monthName] = 0;
          }
          monthCounts[category][monthName] += 1;
        }
        if (row['Alerts/Warnings'].toLowerCase() === 'yes' || row['Alerts/Warnings'].toLowerCase() === 'no') {
          const category = row['Alerts/Warnings'].toLowerCase() === 'yes' ? 'Yes Alert' : 'No Alert';
          if (!monthCounts[category][monthName]) {
            monthCounts[category][monthName] = 0;
          }
          monthCounts[category][monthName] += 1;
        }
        if (row['IDS/IPS_Alerts'] === 'Alert Data' || row['IDS/IPS_Alerts'] === 'No Data') {
          const category = row['IDS/IPS_Alerts'] === 'Alert Data' ? 'Alert Data' : 'No Data';
          if (!monthCounts[category][monthName]) {
            monthCounts[category][monthName] = 0;
          }
          monthCounts[category][monthName] += 1;
        }
      }
    });
    Object.keys(monthCounts['IoC Detected']).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)).forEach(month => {
      result['IoC Detected'].data.push({ x: month, y: monthCounts['IoC Detected'][month] });
    });
    Object.keys(monthCounts['No Detection']).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)).forEach(month => {
      result['No Detection'].data.push({ x: month, y: monthCounts['No Detection'][month] });
    });
    Object.keys(monthCounts['Yes Alert']).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)).forEach(month => {
      result['Yes Alert'].data.push({ x: month, y: monthCounts['Yes Alert'][month] });
    });
    Object.keys(monthCounts['No Alert']).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)).forEach(month => {
      result['No Alert'].data.push({ x: month, y: monthCounts['No Alert'][month] });
    });
    Object.keys(monthCounts['Alert Data']).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)).forEach(month => {
      result['Alert Data'].data.push({ x: month, y: monthCounts['Alert Data'][month] });
    });
    Object.keys(monthCounts['No Data']).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)).forEach(month => {
      result['No Data'].data.push({ x: month, y: monthCounts['No Data'][month] });
    });
    return Object.values(result);
  };
  useEffect(() => {
    const loadData = async () => {
      const csvData = await fetchData();
      const processedData = processData(csvData);
      setData(processedData);
    };
    loadData();
  },);
  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Cases",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={CustomTooltip}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
