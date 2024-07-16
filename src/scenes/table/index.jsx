// src/components/CsvDataGrid.js
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import Papa from 'papaparse';
import Header from "../../components/Header";

const Table = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: "No", headerName: "NO", width: 90 },
    { field: "Timestamp", headerName: "Timestamp", width: 180 },
    { field: "Source_IP_Address", headerName: "Source IP Address", width: 180 },
    { field: "Source_IP_Country", headerName: "Source IP Country", width: 150 },
    { field: "Source_IP_Country_Code", headerName: "Source IP Country Code", width: 150 },
    { field: "Destination_IP_Address", headerName: "Destination IP Address", width: 180 },
    { field: "Destination_IP_Country", headerName: "Destination IP Country", width: 180 },
    { field: "Destination_IP_Country_Code", headerName: "Destination IP Country Code", width: 180 },
    { field: "LatLong_Source_IP", headerName: "LatLong Source IP", width: 180 },
    { field: "LatLong_Destination_IP", headerName: "LatLong Destination IP", width: 180 },
    { field: "Source_Port", headerName: "Source Port", width: 120 },
    { field: "Destination_Port", headerName: "Destination Port", width: 120 },
    { field: "Protocol", headerName: "Protocol", width: 120 },
    { field: "Packet_Length", headerName: "Packet Length", width: 150 },
    { field: "Packet_Type", headerName: "Packet Type", width: 150 },
    { field: "Traffic_Type", headerName: "Traffic Type", width: 150 },
    { field: "Malware_Indicators", headerName: "Malware Indicators", width: 180 },
    { field: "Anomaly_Scores", headerName: "Anomaly Scores", width: 150 },
    { field: "Alerts/Warnings", headerName: "Alerts/Warnings", width: 150 },
    { field: "Attack_Type", headerName: "Attack Type", width: 150 },
    { field: "Attack_Signature", headerName: "Attack Signature", width: 150 },
    { field: "Action_Taken", headerName: "Action Taken", width: 150 },
    { field: "Severity_Level", headerName: "Severity Level", width: 150 },
    { field: "Network_Segment", headerName: "Network Segment", width: 150 },
    { field: "Proxy_Information", headerName: "Proxy Information", width: 150 },
    { field: "Firewall_Logs", headerName: "Firewall Logs", width: 150 },
    { field: "IDS/IPS_Alerts", headerName: "IDS/IPS Alerts", width: 150 },
    { field: "Log_Source", headerName: "Log Source", width: 150 },
    { field: "Browser", headerName: "Browser", width: 120 },
    { field: "Device/OS", headerName: "Device/OS", width: 150 },
    { field: "Year", headerName: "Year", width: 100 },
    { field: "Month", headerName: "Month", width: 100 },
    { field: "Day", headerName: "Day", width: 100 },
    { field: "Hour", headerName: "Hour", width: 100 },
    { field: "Minute", headerName: "Minute", width: 100 },
    { field: "Second", headerName: "Second", width: 100 },
    { field: "DayOfWeek", headerName: "Day Of Week", width: 100 },
  ];
  useEffect(() => {
    const fetchCsv = async () => {
      try {
        const response = await axios.get('/Cyber_Security_Attack.csv');
        const parsedData = Papa.parse(response.data, { header: true });
        if (parsedData.data.length > 0) {
          const formattedRows = parsedData.data.map((row, index) => ({ id: index, ...row }));
          setRows(formattedRows);
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCsv();
  }, []);
  return (
    <Box m="20px">
      <Header title="TABLE" subtitle="Table of years 2021 - 2023 Cyber Security Attack" />
      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={100} rowsPerPageOptions={[100]} />
        )}
      </Box>
    </Box>
  );
};

export default Table;
