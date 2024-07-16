import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import Papa from "papaparse";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = {
    DDoSColor: tokens("dark").redAccent[300],
    IntrusionColor: tokens("dark").blueAccent[300],
    MalwareColor: tokens("dark").greenAccent[600],
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Cyber_Security_Attack.csv");
      const text = await response.text();
      const parsedData = Papa.parse(text, { header: true }).data;
      const processedData = processData(parsedData);
      setData(processedData);
    };
    fetchData();
  },);
  const processData = (data) => {
    const result = {};
    data.forEach((row) => {
      const year = parseInt(row.Year, 10);
      const attackType = row.Attack_Type;
      const logSource = row["Log_Source"];
      const browser = row["Browser"];
      const deviceOS = row["Device/OS"];
      if (year === 2023 && (attackType === "DDoS" || attackType === "Intrusion" || attackType === "Malware")) {
        // Generate keys based on conditions
        let keys = [];
        if (["Firewall", "Server"].includes(logSource)) {
          keys.push(logSource);
        }
        if (["Mozilla", "Opera"].includes(browser)) {
          keys.push(browser);
        }
        if (["Android", "iPad", "iPhone", "iPod", "Linux", "Macintosh", "Windows"].includes(deviceOS)) {
          keys.push(deviceOS);
        }
        keys.forEach((key) => {
          if (!result[key]) {
            result[key] = {
              log: key,
              DDoSColor: colors.DDoSColor,
              IntrusionColor: colors.IntrusionColor,
              MalwareColor: colors.MalwareColor,
              DDoS: 0,
              Intrusion: 0,
              Malware: 0,
            };
          }
          switch (attackType) {
            case "DDoS":
              result[key].DDoS++;
              break;
            case "Intrusion":
              result[key].Intrusion++;
              break;
            case "Malware":
              result[key].Malware++;
              break;
            default:
              break;
          }
        });
      }
    });
    console.log(result); // Log the processed result for debugging
    const dataArray = Object.values(result);
    // Sort the dataArray based on the specified order
    const order = ["Firewall", "Server", "Mozilla", "Opera", "Android", "iPad", "iPhone", "iPod", "Windows", "Linux", "Macintosh"];
    dataArray.sort((a, b) => order.indexOf(a.log) - order.indexOf(b.log));
    return dataArray;
  };
  return (
    <div style={{ height: "270px" }}>
      <ResponsiveBar
        data={data}
        keys={["DDoS", "Intrusion", "Malware"]}
        indexBy="log"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={({ id, data }) => {
          switch (id) {
            case "DDoS":
              return data.DDoSColor;
            case "Intrusion":
              return data.IntrusionColor;
            case "Malware":
              return data.MalwareColor;
            default:
              return "#ffffff"; // Default color
          }
        }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Log Source, Browser, and Device/OS",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Cases",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.grey[100],
                strokeWidth: 1,
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.text.primary,
                fontSize: 12,
              },
            },
            legend: {
              text: {
                fill: theme.palette.text.primary,
                fontSize: 14,
                fontWeight: "bold",
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.text.primary, // Warna teks untuk legenda DDoS
            },
          },
          tooltip: {
            container: {
              background: "#333",
              color: "#FFFfff",
              fontSize: "13px",
              borderRadius: "3px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
              padding: "5px 8px",
            },
          },
        }}
      />
    </div>
  );
};
export default BarChart;