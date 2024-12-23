import React from 'react';
// import { Link } from 'react-router-dom';
// import LineChart from '../../charts/LineChart01';
// import Icon from '../../images/icon-01.svg';
// import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashBoardNetZeroArmyCantt({netZeroArmyCanttStatus}) {
  const percentage = netZeroArmyCanttStatus;

  return (
    <div className="flex flex-col rounded-lg col-span-full hover:scale-105 transition-transform duration-250 sm:col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <div className='flex flex-col flex-wrap justify-between items-center'>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 xl:text-2xl">Status of Net Zero Army Cantt</h2>
          <p className='text-xl text-center text-slate-700 font-serif dark:text-white'>{netZeroArmyCanttStatus}</p>                
        </div>
      </div>
    </div>
  );
}
export default DashBoardNetZeroArmyCantt;