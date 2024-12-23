import React from 'react';
import { Link, redirect } from 'react-router-dom';
// import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
// import Icon from '/ckc/carbon-calculator-dashboard/';
import EditMenu from '../../components/DropdownEditMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleArrowRight } from '@fortawesome/fontawesome-svg-core/import.macro'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import BarChart02 from '../../charts/BarChart02';

function DashboardCard03({subjects, name}) {

  let sum=0;
  const extractedNumbers = [];
  const labels = [];

  subjects.forEach(pap => {
    // Check if pap exists and is a string
    if (pap && typeof pap === 'string') {
      // Extract the number outside <>
      const numberMatch = pap.match(/<[^>]+>(\d+)/);

      // Check if a number is found
      if (numberMatch && numberMatch[1]) {
        const papNumber = parseInt(numberMatch[1], 10);
        sum += papNumber;
        extractedNumbers.push(papNumber);
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

  // console.log(extractedNumbers);
  // console.log(labels);
  const chartData = {
    // labels: [
    //   '2012', '2013',
    //   '2014', '2015', '2016',
    //   '2017', '2018', '2019',
    //   '2020', '2021', '2022',
    //   '2023'
    // ],
    labels: labels,
    datasets: [
      // green line
      {
        data:extractedNumbers,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.green[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.green[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,          
          clip: 20,
      },
    ],
  };
  const uniqueKey = JSON.stringify(chartData);
  let redirectLink = '/ckc/carbon-calculator-dashboard/'+name;
  // console.log("Name: " + name + "\nArray: " + subjects + "\nSum: " + sum);
  return (
    <>
    {subjects.length > 0 && 
    <div className="flex flex-col col-span-full hover:scale-105 transition-transform duration-250 sm:col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        {name === 'talks' && (
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Number of Chandrakanta Kesavan lectures conducted
          </h2>
        )}
        {name === 'projects' && (
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Funding for Faculty Research Proposals (in Lakhs)
          </h2>
        )}
        {name === 'papers' && (
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Number of Reasearch Papers published
          </h2>
        )}
          {/* Icon */}
          {/* <FontAwesomeIcon icon={faCircleArrowRight} /> */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 03" /> */}
          {/* <img src={''} width="32" height="32"/> */}
          {/* Menu button */}
          {/* <EditMenu align="right" className="relative inline-flex"> */}
            {/* <li> */}
              <Link className="font-bold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to={redirectLink}>
                View More
              </Link>
            {/* </li> */}
          {/* </EditMenu> */}
        </header>
        {/* <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Total</div> */}
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{sum}</div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart key={uniqueKey} data={chartData} width={389} height={128} /> */}
        {name == 'projects' && ( 
        <BarChart02 key={uniqueKey} data={chartData} width={389} height={128} isSkip={false}/>
        )} 
        {name != 'projects' && ( 
        <BarChart02 key={uniqueKey} data={chartData} width={389} height={128} isSkip={true}/>
        )} 
      </div>
    </div>
    }
    </>
  );
}

export default DashboardCard03;
