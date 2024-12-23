import React, { useState } from 'react';
import Excel from 'exceljs';

const fetchURL = import.meta.env.VITE_URL + "/api/register";
// const fetchURL = "https://carbon-calculator-dashboard-xwnq.onrender.com" + "/api/register";
console.log(fetchURL);
const ExcelUploader = ({setLinkedinPosts, setTwitterArticles, setNewsPaperArticles,  setProjects, setPapers, setNetZeroIITKStatus, setNetZeroArmyCanttStatus,  setFunding1, setFunding2, setFunding3, setTalks, setLinkedinFollowers, setTwitterFollowers}) => {
    const data_from_excel = [];
    const name = "statistics";

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result;
            const [newLinkedinPosts, newTwitterArticles, newNewsPaperArticles, newProjects, newPapers,  newFunding1, newFunding2, newFunding3, newTalks] = [[],[], [], [], [], [], [], [], [], []];
            let [newNetZeroIITKStatus, newNetZeroArmyCanttStatus] = ["", ""];
            let [newLinkedinFollowers, newTwitterFollowers] = [0, 0];
            wb.xlsx.load(buffer).then( async (workbook) => {
                console.log(workbook, 'workbook instance');
                workbook.eachSheet((sheet, id) => {
                    sheet.eachRow((row) => {
                        data_from_excel.push(row.values);
                    });
                });
                // console.log("data from excel" + data_from_excel);
                data_from_excel.slice(1).forEach(data => {
                    newLinkedinPosts.push(data[1]);
                    newTwitterArticles.push(data[2]);
                    newNewsPaperArticles.push(data[3]);
                    newProjects.push(data[4]);
                    newPapers.push(data[5]);
                    newFunding1.push(data[8]);
                    newFunding2.push(data[9]);
                    newFunding3.push(data[10]);
                    newTalks.push(data[11]);
                })
                newNetZeroIITKStatus += data_from_excel[1][6];
                newNetZeroArmyCanttStatus += data_from_excel[1][7];
                newLinkedinFollowers += data_from_excel[1][12];
                newTwitterFollowers += data_from_excel[1][13];
                setLinkedinPosts(newLinkedinPosts);
                setTwitterArticles(newTwitterArticles);
                setNewsPaperArticles(newNewsPaperArticles);
                setProjects(newProjects);
                setPapers(newPapers);
                setNetZeroIITKStatus(newNetZeroIITKStatus);
                setNetZeroArmyCanttStatus(newNetZeroArmyCanttStatus);
                setFunding1(newFunding1);
                setFunding2(newFunding2);
                setFunding3(newFunding3);
                setTalks(newTalks);
                setLinkedinFollowers(newLinkedinFollowers);
                setTwitterFollowers(newTwitterFollowers);
                let result = await fetch(
                    fetchURL, {
                        method: "post",
                        body: JSON.stringify({name, newLinkedinPosts,newTwitterArticles, newNewsPaperArticles , newProjects, newPapers, newNetZeroIITKStatus, newNetZeroArmyCanttStatus,  newFunding1, newFunding2, newFunding3, newTalks, newLinkedinFollowers, newTwitterFollowers}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                result = await result.json();
                console.log(result);
                if(result)
                    console.log("Data saved succefully");
            });
        };
    };
    return (
        <div>
            <input 
                    type='file' 
                    onChange={(e) => handleChange(e)} 
                    id="excel-input" 
                    className="hidden" // Hide the default input appearance
                />
            <label 
                htmlFor="excel-input" // Associate label with the input element
                className="bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:bg-green-700"
            >
                Upload Excel File
            </label>


        </div>
    );
};

export default ExcelUploader;
