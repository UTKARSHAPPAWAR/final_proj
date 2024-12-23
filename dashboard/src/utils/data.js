const talksInfo = [
    {
      month: 'November 2023',
      talks: [
        {
          title: 'Talk 1',
          speaker: 'Speaker 1',
          date: '2023-01-01',
          description: 'Under the silvery moonlight, ... (description for Talk 1)',
        },
        {
          title: 'Talk 2',
          speaker: 'Speaker 2',
          date: '2023-02-01',
          description: 'Under the silvery moonlight, ... (description for Talk 2)',
        },
        {
          title: 'Talk 3',
          speaker: 'Speaker 3',
          date: '2023-02-02',
          description: 'Under the silvery moonlight, ... (description for Talk 3)',
        },
        // Add more talks as needed
      ],
    },
    {
      month: 'October 2023',
      talks: [
        {
          title: 'Talk 1',
          speaker: 'Speaker 1',
          date: '2023-01-01',
          description: 'Under the silvery moonlight, ... (description for Talk 1)',
        },
        {
          title: 'Talk 2',
          speaker: 'Speaker 2',
          date: '2023-02-01',
          description: 'Under the silvery moonlight, ... (description for Talk 2)',
        },
        {
          title: 'Talk 3',
          speaker: 'Speaker 3',
          date: '2023-02-02',
          description: 'Under the silvery moonlight, ... (description for Talk 3)',
        },
        // Add more talks as needed
      ],
    },
    // Add more months as needed
  ];

const updateTalksInfo = (newTalk, selectedMonth) => {
    const monthIndex = talksInfo.findIndex((month) => month.month === selectedMonth);

    if (monthIndex !== -1) {
        talksInfo[monthIndex].talks.push(newTalk);
    } else {
        const newMonth = {
        month: selectedMonth,
        talks: [newTalk],
        };

        talksInfo.push(newMonth);
    }
};
  
  export { talksInfo, updateTalksInfo };
  
  