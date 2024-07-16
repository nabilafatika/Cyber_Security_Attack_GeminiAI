import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import Papa from 'papaparse';

const GeographyChart1 = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const aggregatedData = data.reduce((acc, row) => {
          const countryCode = row.Source_IP_Country_Code;
          if (countryCode) {
            if (acc[countryCode]) {
              acc[countryCode].value += 1;
            } else {
              acc[countryCode] = { id: countryCode, value: 1 };
            }
          }
          return acc;
        }, {});
        const formattedData = Object.values(aggregatedData);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <ResponsiveChoropleth
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
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 10000]}
      unknownColor="#c2c2c2"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      colors={[
        colors.redAccent[200],
        colors.redAccent[400],
        colors.redAccent[500],
        colors.redAccent[600],
        colors.redAccent[800]
      ]}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

const GeographyChart2 = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const aggregatedData = data.reduce((acc, row) => {
          const countryCode = row.Destination_IP_Country_Code;
          if (countryCode) {
            if (acc[countryCode]) {
              acc[countryCode].value += 1;
            } else {
              acc[countryCode] = { id: countryCode, value: 1 };
            }
          }
          return acc;
        }, {});
        const formattedData = Object.values(aggregatedData);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <ResponsiveChoropleth
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
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 10000]}
      unknownColor="#c2c2c2"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      colors={[
        colors.blueAccent[200],
        colors.blueAccent[400],
        colors.blueAccent[500],
        colors.blueAccent[600],
        colors.blueAccent[900]
      ]}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export { GeographyChart1, GeographyChart2};


