import React from 'react';

function DashboardCard12({ outreachActivities }) {
  const activityElements = [];

  outreachActivities.forEach((activity, index) => {
    const backgroundColor = index % 2 === 0 ? 'bg-green-50 dark:bg-green-900' : 'bg-green-100 dark:bg-green-800';
    const textColor = 'text-slate-800 dark:text-white';

    if (activity) {
      activityElements.push(
        <li className={`flex px-2 ${backgroundColor}`} key={index}>
          <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3">
            <svg className="svg-icon" viewBox="0 0 20 20" fill='white'>
              <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
          <div className={`grow flex items-center dark:border-slate-700 text-sm py-2 ${textColor}`}>
            <div className="grow flex justify-between">
              <div className="self-center">
                <a className={`font-medium hover:text-slate-900`} href="#0">
                  {activity}
                </a>
              </div>
            </div>
          </div>
        </li>
      );
    }
  });

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 text-3xl dark:text-slate-100">Outreach Activities</h2>
      </header>
      <div className="p-3 overflow-y-scroll h-[300px]">
        <div>
          <ul className="my-1">
            {activityElements}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
