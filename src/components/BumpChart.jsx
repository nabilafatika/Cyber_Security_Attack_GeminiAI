import React, { useEffect, useState } from 'react';
import { ResponsiveBump } from "@nivo/bump";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Papa from 'papaparse';

const BumpChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use tokens to get colors based on theme mode
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const filteredData = data.filter(row => 
          (row.Attack_Type === 'DDoS' || row.Attack_Type === 'Intrusion' || row.Attack_Type === 'Malware') &&
          (row.Action_Taken === 'Blocked' || row.Action_Taken === 'Ignored' || row.Action_Taken === 'Logged') &&
          (row.Severity_Level === 'Low' || row.Severity_Level === 'Medium' || row.Severity_Level === 'High')
        );
        const groupByTypeAndYear = (rows, type) => {
          const yearCounts = {};
          rows.filter(row => row.Attack_Type === type).forEach(row => {
            const year = row.Year;
            if (!yearCounts[year]) {
              yearCounts[year] = 0;
            }
            yearCounts[year]++;
          });
          return {
            id: type,
            data: Object.keys(yearCounts).map(year => ({
              x: year,
              y: yearCounts[year],
            })),
            color: getColorById(type),
          };
        };
        const groupBySourceAndYear = (rows, source) => {
          const yearCounts = {};
          rows.filter(row => row.Action_Taken === source).forEach(row => {
            const year = row.Year;
            if (!yearCounts[year]) {
              yearCounts[year] = 0;
            }
            yearCounts[year]++;
          });
          return {
            id: source,
            data: Object.keys(yearCounts).map(year => ({
              x: year,
              y: yearCounts[year],
            })),
            color: getColorById(source),
          };
        };
        const groupByLevelAndYear = (rows, Severity_Level) => {
          const yearCounts = {};
          rows.filter(row => row.Severity_Level === Severity_Level).forEach(row => {
            const year = row.Year;
            if (!yearCounts[year]) {
              yearCounts[year] = 0;
            }
            yearCounts[year]++;
          });
          return {
            id: Severity_Level,
            data: Object.keys(yearCounts).map(year => ({
              x: year,
              y: yearCounts[year],
            })),
            color: getColorById(Severity_Level),
          };
        };
        const getColorById = (id) => {
          switch (id) { 
            case 'Intrusion':
            case 'Blocked':
            
              return '#4CAF50';
            case 'High':
            case 'DDoS':
            case 'Logged':
              return '#2196F3'; 
            case 'Ignored':
            case 'Medium':
            case 'Low':
              return '#db4f4a'; 
            case 'Malware':
              return '#FF9800'; 
            default:
              return '#2a2d64'; 
          }
        };
        const types = ['DDoS', 'Intrusion', 'Malware'];
        const sources = ['Blocked', 'Ignored', 'Logged'];
        const levels = ['Low', 'High', 'Medium'];
        const formattedData = [
          ...types.map(type => groupByTypeAndYear(filteredData, type)),
          ...sources.map(source => groupBySourceAndYear(filteredData, source)),
          ...levels.map(Severity_Level => groupByLevelAndYear(filteredData, Severity_Level)),
        ];
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <ResponsiveBump
      data={chartData}
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
        grid: {
          line: {
            stroke: colors.grey[300], // Customize grid line color here
            strokeWidth: 0.2,
          },
        },
      }}
      colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      lineWidth={5}
      activeLineWidth={9}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: 'serie.color' }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'Year',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'Cases',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      axisRight={null}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
export default BumpChart;
