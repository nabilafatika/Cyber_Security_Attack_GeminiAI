import React, { useState, useEffect } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { useTheme } from '@mui/material';
import { tokens } from './theme';
import Papa from 'papaparse';

const CalendarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [calendarData, setCalendarData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        const formattedData = data.map(row => ({
          day: row.Timestamp.split(' ')[0], 
          value: 1, 
        }));
        const aggregatedData = formattedData.reduce((acc, curr) => {
          const existing = acc.find(item => item.day === curr.day);
          if (existing) {
            existing.value += 1;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        setCalendarData(aggregatedData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
<div style={{ height: '500px', width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'-45px', marginLeft:'-5px'}}>
<ResponsiveCalendar
        data={calendarData}
        from="2020-01-01"
        to="2023-12-31"
        emptyColor="#eeeeee"
        colors={[colors.redAccent[900], colors.redAccent[700], colors.redAccent[500], colors.redAccent[300]]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#a3a3a3"
        monthBorderWidth={1}
        dayBorderWidth={1}
        dayBorderColor="#a3a3a3"
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.primary[100],
              },
            },
            legend: {
              text: {
                fill: '#FFFF00',
              },
            },
            ticks: {
              line: {
                stroke: colors.primary[100],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.text.primary, 
              },
            },
          },
          labels: {
            text: {
              fill: theme.palette.text.primary, 
            },
          },
          legends: {
            text: {
              fill: '#FFFF00',
            },
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#000000',
              fontSize: 12,
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </div>
  );
};

export default CalendarChart;
