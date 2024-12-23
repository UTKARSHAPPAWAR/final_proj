import React from 'react';
import Excel from 'exceljs';

class ExcelDownload extends React.Component {
  downloadExcel = () => {
    const { linkedinPosts, twitterArticles, newsPaperArticles, projects, papers,  netZeroIITKStatus, netZeroArmyCanttStatus, funding1, funding2, funding3, talks, linkedinFollowers, twitterFollowers } = this.props;

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Define columns
    const columns = [
      { header: 'Linkedin Posts', key: 'linkedinPosts', width: 15},
      { header: 'Twitter Articles', key: 'twitterArticles', width: 15},
      { header: 'Newspaper Articles', key: 'newsPaperArticles', width: 15},
      { header: 'Projects', key: 'projects', width: 15},
      { header: 'Papers', key: 'papers', width: 15},
      { header: 'Funding 1', key: 'funding1', width: 15},
      { header: 'Funding 2', key: 'funding2', width: 15},
      { header: 'Funding 3', key: 'funding3', width: 15},
      { header: 'Talks', key: 'talks', width: 15},
      { header: 'Linkedin Followers', key: 'linkedinFollowers', width: 15},
      { header: 'Twitter Followers', key: 'twitterFollowers', width: 15},
    ];

    if (netZeroIITKStatus !== undefined && netZeroArmyCanttStatus !== undefined) {
      // Assuming 'columns' is the array you're working with
    const newColumns = [
    { header: 'Status of Net Zero IITK', key: 'netZeroIITKStatus', width: 15},
    { header: 'Status of Net Zero Army Cantt', key: 'netZeroArmyCanttStatus', width: 15}
    ];

    // Insert after the 7th element (index 6)
    columns.splice(5, 0, ...newColumns);
    }
    worksheet.columns = columns;

    linkedinPosts.forEach((val, index) => {
      const row = { linkedinPosts: val, twitterArticles: twitterArticles[index], newsPaperArticles: newsPaperArticles[index], 
        projects: projects[index], papers: papers[index],
        funding1: funding1[index], funding2: funding2[index], funding3: funding3[index], 
        talks: talks[index]};
    
      if (index === 0) {
        row.netZeroIITKStatus = netZeroIITKStatus;
        row.netZeroArmyCanttStatus = netZeroArmyCanttStatus;
        row.linkedinFollowers = linkedinFollowers;
        row.twitterFollowers = twitterFollowers;
      }

      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'current_data.xlsx';
      a.click();
    });
  };

  render() {
    return (
      <button onClick={this.downloadExcel} className='bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:bg-green-700'>
        Download Current Data
      </button>
    );
  }
}

export default ExcelDownload;
