import React, { useState } from 'react';
import axios from 'axios';
// "https://carbon-calculator-dashboard-xwnq.onrender.com"
const postUrlTalk = import.meta.env.VITE_URL + "/api/saveTalk";
const postUrlProject = import.meta.env.VITE_URL + "/api/saveProject";
const postUrlPaper = import.meta.env.VITE_URL + "/api/savePaper";
const postUrlActivity = import.meta.env.VITE_URL + "/api/saveActivity";
const deleteUrl = import.meta.env.VITE_URL + "/api/delete";

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    speaker: '',
    link: '',
    id:'',
  });

  const [selectedTab, setSelectedTab] = useState('Talks');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Depending on the selected tab, update the corresponding talksInfo data
      const newInfo = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        ...(selectedTab !== 'Activities' && { speaker: formData.speaker }),
        link: formData.link,
      };

      // Make API call to save data
      let response;
      if ( selectedTab === 'Talks')
        response = await axios.post(postUrlTalk, newInfo);
      else if (selectedTab === 'Projects')
        response = await axios.post(postUrlProject, newInfo);
      else if (selectedTab === 'Papers')
        response = await axios.post(postUrlPaper, newInfo);
      else if (selectedTab === 'Activities')
        response = await axios.post(postUrlActivity, newInfo);

      console.log(response.data);
      console.log(selectedTab);
      // Reset form data
      setFormData({
        title: '',
        description: '',
        date: '',
        speaker: '',
        link: '',
        id:'',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const deleteId = formData.id;
      let response;
      response = await axios.post(deleteUrl, { id: deleteId, tab:selectedTab});
      console.log(response.data);

      setFormData({
        title: '',
        description: '',
        date: '',
        speaker: '',
        link: '',
        id:'',
      });
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        {['Talks', 'Projects', 'Papers', 'Activities'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${
              selectedTab === tab ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
            } p-2 rounded-md`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
      <div>
          <label className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        {selectedTab !== 'Activities' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Speaker</label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        )}
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
      <form onSubmit={handleDeleteSubmit} className="space-y-4 mt-4">
      <div>
          <label className="block text-sm font-medium text-gray-700">Unique Id</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Delete 
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
