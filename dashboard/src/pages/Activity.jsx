import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

const Activities = ({isAuthenticated}) => {
  const [activitiesData, setactivitiesData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchurl = import.meta.env.VITE_URL + '/api/getActivities'

  useEffect(() => {
    const fetchactivities = async () => {
      try {
      const response = await axiosInstance.get('/api/getActivities');
      setTalksData(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
    };

    fetchactivities();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-roboto">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <h1 className="text-5xl text-center m-5 font-bold text-slate-700"> Outreach Activities </h1>
        {activitiesData.map((activity, idx) => (
          <div key={idx} className="mb-8"> {/* Added margin between cards */}
            <div className="mx-10 w-500 gap-20">
              <div key={idx} className="flex flex-wrap bg-white p-6 rounded-lg shadow-md">
                {/* <img
                  src={`https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=`} 
                  alt="activity Thumbnail"
                  className="w-64 h-40 object-cover rounded-lg"
                /> */}
                <div className="max-w-2xl mb-30 ml-6 mr-6">
                {isAuthenticated && (
                      <h4>Unique id: {activity._id}</h4>)}
                  <h2 className="text-xl font-semibold text-slate-800 my-2">{activity.title}</h2>
                  <p className="text-gray-600 my-1">Date: {activity.date}</p>
                  <p className="text-gray-700 my-1">{activity.description}</p>
                  <a href={activity.link} className="font-bold text-xl text-slate-500 hover:text-green-700 cursor-pointer">
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Activities;
