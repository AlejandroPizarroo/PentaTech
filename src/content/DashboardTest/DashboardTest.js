import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './_DashboardTest.scss';

const DashboardTest = () => {

  const chartRef1 = useRef(null);

  const fetchData = () => {
    // Make an API request to fetch the data dynamically
    fetch('http://localhost:5000/api/ibm/certifications/count/org')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        renderChart(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const renderChart = (data) => {
    console.log('Rendering chart:', data);
    if (chartRef1.current) {
      chartRef1.current.destroy();
    }

    const donutChart1 = document.getElementById('donutChart1');
    chartRef1.current = new Chart(donutChart1, {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.group),
        datasets: [
          {
            data: data.map(item => item.value),
            backgroundColor: ['#005d5d', '#1192e8', '#6929c4'],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Work Location',
            font: {
              family: 'IBM Plex Sans',
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, []); // Add fetchData as a dependency here

  useEffect(() => {
    return () => {
      if (chartRef1.current) {
        chartRef1.current.destroy();
      }
    };
  }, []);

  return (
    <div className="dashboard-container">

    <div className="chart-container">
        <div className="canvas-container">
            <canvas id="donutChart1"></canvas>
        </div>
    </div>
    </div>
  );
};


export default DashboardTest;



  