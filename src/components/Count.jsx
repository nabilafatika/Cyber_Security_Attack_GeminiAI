import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Casescount = () => {
  const [totalCases, setTotalCases] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Cyber_Security_Attack.csv');
        const text = await response.text();
        const { data } = Papa.parse(text, { header: true });
        // Filter data for the year 2023
        const filteredData2023 = data.filter(row => row.Year === '2023');
        // Count the total number of entries
        const totalCount = filteredData2023.length;
        setTotalCases(totalCount);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div >
      <p>{totalCases}</p>
    </div>
  );
};

const SourceCountryCount = () => {
    const [uniqueCountries, setUniqueCountries] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/Cyber_Security_Attack.csv');
          const text = await response.text();
          const { data } = Papa.parse(text, { header: true });
          let countriesSet = new Set();
          data.forEach(row => {
            const country = row.Source_IP_Country_Code;
            if (country) {
              countriesSet.add(country);
            }
          });
          const totalUniqueCountries = countriesSet.size;
          setUniqueCountries(totalUniqueCountries);
        } catch (error) {
          console.error('Error fetching or parsing data:', error);
        }
      };
      fetchData();
    }, []);
    return (
      <div >
        <p>{uniqueCountries}</p>
      </div>
    );
  };

  const DestinationCountryCount = () => {
    const [uniqueCountries, setUniqueCountries] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/Cyber_Security_Attack.csv');
          const text = await response.text();
          const { data } = Papa.parse(text, { header: true });
          let countriesSet = new Set();
          data.forEach(row => {
            const country = row.Destination_IP_Country_Code;
            if (country) {
              countriesSet.add(country);
            }
          });
          const totalUniqueCountries = countriesSet.size;
          setUniqueCountries(totalUniqueCountries);
        } catch (error) {
          console.error('Error fetching or parsing data:', error);
        }
      };
      fetchData();
    }, []);
    return (
      <div >
        <p>{uniqueCountries}</p>
      </div>
    );
  };

  const SeverityLevelPercentages = () => {
    const [percentages, setPercentages] = useState({ high: 0, medium: 0, low: 0 });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/Cyber_Security_Attack.csv');
                const text = await response.text();
                const { data } = Papa.parse(text, { header: true });
                const filteredData = data.filter(row => row.Year === '2023');
                const total = filteredData.length;
                const highCount = filteredData.filter(row => row.Severity_Level === 'High').length;
                const mediumCount = filteredData.filter(row => row.Severity_Level === 'Medium').length;
                const lowCount = filteredData.filter(row => row.Severity_Level === 'Low').length;
                const highPercent = (highCount / total) * 100;
                const mediumPercent = (mediumCount / total) * 100;
                const lowPercent = (lowCount / total) * 100;
                setPercentages({
                    high: highPercent.toFixed(2),
                    medium: mediumPercent.toFixed(2),
                    low: lowPercent.toFixed(2)
                });
            } catch (error) {
                console.error('Error fetching or parsing data:', error);
            }
        };
        fetchData();
    }, []);
    const styles = {
        high: { color: '#e2726e' },
        medium: { color: 'orange' },
        low: { color: '#3da58a' }
    };
    return (
        <div>
           <p> <b style={styles.high}>High: {percentages.high}%</b></p>
            <b style={styles.medium}>Medium: {percentages.medium}%</b><p></p>
            <b style={styles.low}>Low: {percentages.low}%</b>
        </div>
    );
};
export { Casescount, SourceCountryCount, DestinationCountryCount, SeverityLevelPercentages};
