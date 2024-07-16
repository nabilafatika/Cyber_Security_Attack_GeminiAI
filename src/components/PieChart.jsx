import React, { useEffect, useState } from 'react';
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Papa from 'papaparse';

const PieChart1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [highSeverityData, setHighSeverityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const highSeverityFilteredData = data.filter(row => row.Severity_Level === 'High');
        const highSeverityCounts = {};
        highSeverityFilteredData.forEach(row => {
          const attackType = row.Attack_Type;
          if (attackType in highSeverityCounts) {
            highSeverityCounts[attackType]++;
          } else {
            highSeverityCounts[attackType] = 1;
          }
        });
        const highSeverityPieData = Object.keys(highSeverityCounts).map(attackType => ({
          id: attackType,
          label: attackType,
          value: highSeverityCounts[attackType],
        }));
        setHighSeverityData(highSeverityPieData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ height: '240px' }}>
      <ResponsivePie
        data={highSeverityData}
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
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 5,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 60,
            itemsSpacing: -20,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "hsl(344, 70%, 50%)",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

const PieChart2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lowSeverityData, setLowSeverityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const lowSeverityFilteredData = data.filter(row => row.Severity_Level === 'Low');
        const lowSeverityCounts = {};
        lowSeverityFilteredData.forEach(row => {
          const attackType = row.Attack_Type;
          if (attackType in lowSeverityCounts) {
            lowSeverityCounts[attackType]++;
          } else {
            lowSeverityCounts[attackType] = 1;
          }
        });
        const lowSeverityPieData = Object.keys(lowSeverityCounts).map(attackType => ({
          id: attackType,
          label: attackType,
          value: lowSeverityCounts[attackType],
        }));
        setLowSeverityData(lowSeverityPieData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ height: '240px', }}>
      <ResponsivePie
        data={lowSeverityData}
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
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 5,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 60,
            itemsSpacing: -20,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "hsl(344, 70%, 50%)",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

const PieChart3 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mediumSeverityData, setLowSeverityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const mediumSeverityFilteredData = data.filter(row => row.Severity_Level === 'Medium');
        const mediumSeverityCounts = {};
        mediumSeverityFilteredData.forEach(row => {
          const attackType = row.Attack_Type;
          if (attackType in mediumSeverityCounts) {
            mediumSeverityCounts[attackType]++;
          } else {
            mediumSeverityCounts[attackType] = 1;
          }
        });
        const mediumSeverityPieData = Object.keys(mediumSeverityCounts).map(attackType => ({
          id: attackType,
          label: attackType,
          value: mediumSeverityCounts[attackType],
        }));
        setLowSeverityData(mediumSeverityPieData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ height: '240px', }}>
      <ResponsivePie
        data={mediumSeverityData}
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
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 5,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 60,
            itemsSpacing: -20,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "hsl(344, 70%, 50%)",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export { PieChart1, PieChart2, PieChart3 };
