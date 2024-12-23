import React from 'react';
import LineChart from '../../charts/LineChart02';
import BarChart from '../../charts/BarChart01';


// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard08( {funding1, funding2, funding3}) {
  let fundingNumbers = [];
  let labels = [];
  funding1.forEach(pap => {
    // Check if pap exists and is a string
    if (pap && typeof pap === 'string') {
      // Extract the number outside <>
      const numberMatch = pap.match(/<[^>]+>(\d+)/);

      // Check if a number is found
      if (numberMatch && numberMatch[1]) {
        const papNumber = parseInt(numberMatch[1], 10);
        fundingNumbers.push(papNumber);
      }

      // Extract the text inside <>
      const textInsideBrackets = pap.match(/<([^>]+)>/);

      // Check if text inside <> is found
      if (textInsideBrackets && textInsideBrackets[1]) {
        const labelText = textInsideBrackets[1];
        labels.push(labelText);
      }
    }
  });
  // Line chart data
  // const chartData = {
  //   labels: labels,
  //   datasets: [
  //     // Indigo line
  //     {
  //       label: 'Total funding',
  //       data: fundingNumbers,
  //       borderColor: tailwindConfig().theme.colors.red[500],
  //       fill: false,
  //       borderWidth: 2,
  //       tension: 0,
  //       pointRadius: 0,
  //       pointHoverRadius: 3,
  //       pointBackgroundColor: tailwindConfig().theme.colors.red[500],
  //       pointHoverBackgroundColor: tailwindConfig().theme.colors.red[500],
  //       pointBorderWidth: 0,
  //       pointHoverBorderWidth: 0,
  //       clip: 20,
  //     },
  //     // Blue line
  //     {
  //       label: 'Yearly budget',
  //       data: funding2,
  //       borderColor: tailwindConfig().theme.colors.blue[400],
  //       fill: false,
  //       borderWidth: 2,
  //       tension: 0,
  //       pointRadius: 0,
  //       pointHoverRadius: 3,
  //       pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
  //       pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
  //       pointBorderWidth: 0,
  //       pointHoverBorderWidth: 0,
  //       clip: 20,
  //     },
  //     // emerald line
  //     {
  //       label: 'Expenditure of budget',
  //       data: funding3,
  //       borderColor: tailwindConfig().theme.colors.emerald[500],
  //       fill: false,
  //       borderWidth: 2,
  //       tension: 0,
  //       pointRadius: 0,
  //       pointHoverRadius: 3,
  //       pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
  //       pointHoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
  //       pointBorderWidth: 0,
  //       pointHoverBorderWidth: 0,
  //       clip: 20,
  //     },
  //   ],
  // };
  const funding2Numbers = funding2.map(Number);
  const funding3Numbers = funding3.map(Number);
  const funding4 = fundingNumbers.map((value, index) => value + funding2Numbers[index] - funding3Numbers[index]);
  console.log(fundingNumbers);
  console.log(funding2Numbers);
  console.log(funding3Numbers);
  console.log(funding4);
  const chartData = {
    labels: labels,
    datasets: [
      // dark green bars
      {
        label: 'Opening Funds',
        data: fundingNumbers,
        backgroundColor: tailwindConfig().theme.colors.green[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // green bars
      {
        label: 'Received fund',
        data: funding2Numbers,
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Expenditure',
        data: funding3Numbers,
        backgroundColor: tailwindConfig().theme.colors.red[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Total funds available',
        data: funding4,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      }
    ],
  };

  const uniquekey = JSON.stringify(chartData);

  return (
    <>
      {funding1.length > 0 && (
        <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Funding</h2>
          </header>
          {/* <LineChart key={uniquekey} data={chartData} width={595} height={248} /> */}
          <BarChart key={uniquekey} data={chartData} width={595} height={248} isSum={false}/>
        </div>
      )}
    </>
  );
}  

export default DashboardCard08;
