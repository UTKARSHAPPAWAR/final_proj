import React, { useState, useEffect } from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function handleChange(array, setArray, value, index, field) {
    const updatedInstances = [...array];
    updatedInstances[index][field] = value;
    setArray(updatedInstances);
}

const FacilityYearMonth = (data) => {
    const [array, setArray] = useState(data.array || []);
    const [lastInstance, setLastInstance] = useState(data.lastInstance || {});

    // Debugging log: Check array and lastInstance
    useEffect(() => {
        console.log("Array:", array);
        console.log("Last Instance:", lastInstance);
    }, [array, lastInstance]);

    // Update the data passed to the component if it's updated
    useEffect(() => {
        setArray(data.array);
        setLastInstance(data.lastInstance);
    }, [data.array, data.lastInstance]);

    const handleFacilityChange = (value) => {
        console.log("Facility onChange triggered", value); // Debugging the value
        handleChange(array, setArray, value, array.length - 1, 'facilityName');
        setLastInstance((prevState) => ({
            ...prevState,
            FacilityName: value,
        }));
    };

    const handleYearChange = (value) => {
        console.log("Year onChange triggered", value); // Debugging the value
        handleChange(array, setArray, value, array.length - 1, 'year');
        setLastInstance((prevState) => ({
            ...prevState,
            year: value,
        }));
    };

    const handleMonthChange = (value) => {
        console.log("Month onChange triggered", value); // Debugging the value
        handleChange(array, setArray, value, array.length - 1, 'month');
        setLastInstance((prevState) => ({
            ...prevState,
            month: value,
        }));
    };

    return (
        <div className="calcForm">
            <div className='inputs'>
                <h3>Facility<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select
                    className="Select"
                    value={lastInstance.FacilityName || ''}
                    placeholder="Choose Facility"
                    onChange={(e, value) => handleFacilityChange(value)}  // Direct value passed
                >
                    <Option value='Residential Areas'>Residential Areas</Option>
                    <Option value='Hostels'>Hostels</Option>
                    <Option value='Academic Area'>Academic Area</Option>
                    <Option value='Health Centre'>Health Centre</Option>
                    <Option value='Schools'>Schools</Option>
                    <Option value="Visitor's Hostel">Visitor's Hostel</Option>
                    <Option value="Servant's Quarters">Servant's Quarters</Option>
                    <Option value="Shops/Bank/PO">Shops/Bank/PO</Option>
                    <Option value="Lawns and Horticulture">Lawns and Horticulture</Option>
                    <Option value="Dhobhighat">Dhobhighat</Option>
                    <Option value='Industries'>Industries</Option>
                    <Option value='Parking Areas'>Parking Areas</Option>
                    <Option value='Parking Garage'>Parking Garage</Option>
                    <Option value='Sports Complex'>Sports Complex</Option>
                    <Option value='Gymnasium'>Gymnasium</Option>
                    <Option value='Residential Blocks'>Residential Blocks</Option>
                    <Option value='Public Transport Station'>Public Transport Station</Option>
                    <Option value='Cafeteria/Canteen'>Cafeteria/Canteen</Option>
                    <Option value='Auditorium'>Auditorium</Option>
                    <Option value='Playgrounds'>Playgrounds</Option>
                    <Option value='Water Treatment Plant'>Water Treatment Plant</Option>
                    <Option value='Waste Disposal Area'>Waste Disposal Area</Option>
                    <Option value='Power Station/Generator'>Power Station/Generator</Option>
                    <Option value='Greenhouses'>Greenhouses</Option>
                    <Option value='Workshop Areas'>Workshop Areas</Option>
                    <Option value='Data Centers'>Data Centers</Option>
                    <Option value='Security Posts/Control Rooms'>Security Posts/Control Rooms</Option>
                    <Option value='Storage Facilities'>Storage Facilities</Option>
                    <Option value='Laboratories'>Laboratories</Option>
                    <Option value='Conference Rooms'>Conference Rooms</Option>
                    <Option value='Administrative Offices'>Administrative Offices</Option>
                </Select>
            </div>
            <div className='inputs'>
                <h3>Year<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select
                    value={lastInstance.year || ''}
                    onChange={(e, value) => handleYearChange(value)} // Direct value passed
                    className="Select"
                    placeholder='Choose Year'
                >
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                </Select>
            </div>
            <div className="inputs">
                <h3>Month<p style={{ display: 'inline', color: 'red' }}>*</p></h3>
                <Select
                    value={lastInstance.month || ''}
                    className="Select"
                    id="monthSelect"
                    placeholder="Choose Month"
                    onChange={(e, value) => handleMonthChange(value)}  // Direct value passed
                >
                    <Option value="January">January</Option>
                    <Option value="February">February</Option>
                    <Option value="March">March</Option>
                    <Option value="April">April</Option>
                    <Option value="May">May</Option>
                    <Option value="June">June</Option>
                    <Option value="July">July</Option>
                    <Option value="August">August</Option>
                    <Option value="September">September</Option>
                    <Option value="October">October</Option>
                    <Option value="November">November</Option>
                    <Option value="December">December</Option>
                </Select>
            </div>
        </div>
    );
};

export default FacilityYearMonth;
