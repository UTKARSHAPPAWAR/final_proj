import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04( {linkedinPosts, newsPaperArticles, twitterArticles }) {
  let linkedinPostsInt = []
  let labels = []
  linkedinPosts.forEach(pap => {
    // Check if pap exists and is a string
    if (pap && typeof pap === 'string') {
      // Extract the number outside <>
      const numberMatch = pap.match(/<[^>]+>(\d+)/);

      // Check if a number is found
      if (numberMatch && numberMatch[1]) {
        const papNumber = parseInt(numberMatch[1], 10);
        linkedinPostsInt.push(papNumber);
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
  let twitterArticlesInt = [];
  let newsPaperArticlesInt = [];
  newsPaperArticles.forEach(elem => {
    if(elem){
      newsPaperArticlesInt.push(parseInt(elem, 10));
    }
  })
  twitterArticles.forEach(elem => {
    if(elem){
      twitterArticlesInt.push(parseInt(elem, 10));
    }
  })

  const chartData = {
    labels: labels,
    datasets: [
      // dark green bars
      {
        label: 'Linkedin Posts',
        data: linkedinPostsInt,
        backgroundColor: tailwindConfig().theme.colors.green[600],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // green bars
      {
        label: 'Newspaper Articles',
        data: newsPaperArticlesInt,
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Twitter Articles',
        data: twitterArticlesInt,
        backgroundColor: tailwindConfig().theme.colors.red[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[450],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  const uniqueKey = JSON.stringify(chartData);

  return (
    <>
    {linkedinPosts.length > 0 &&
    <div className="flex flex-col col-span-full hover:scale-105 transition-transform duration-250 sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      {/* <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Direct VS Indirect</h2>
      </header> */}
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart key={uniqueKey} data={chartData} width={595} height={248} isSum={true}/>
    </div>
    }
    </>
  );
}

export default DashboardCard04;
