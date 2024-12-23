import React from 'react';

function getGreeting(){
  const now = new Date();
  const hours = now.getHours();
  let greeting;
  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  return greeting;
}


function WelcomeBanner() {
  return (
    <div className="relative bg-green-200 dark:bg-green-900 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Content */}
      <div className="flex flex-col justify-around xl:flex-row">
        {/* <img src={Icon}alt="Icon" className='w-16 b-6' /> */}
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
            {getGreeting()}👋
          </h1>
        <p className="dark:text-slate-200 text-2xl md:text-3xl">  Here is what’s happening today</p>
        {/* <img src={Icon}alt="Icon" className='w-16 b-6'/> */}
      </div>
    </div>
  );
}

export default WelcomeBanner;
