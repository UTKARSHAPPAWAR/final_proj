import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/joy';
import { faPencil, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import greenhouselogo from "D:/carbon-footprint-calculator-master/calculator/src/images/greenhouselogo.png";
import co2logo from "D:/carbon-footprint-calculator-master/calculator/src/images/co2logo.jpg";
import ckclogo from "D:/carbon-footprint-calculator-master/calculator/src/images/ckclogo.png";
import Calculating from "D:/carbon-footprint-calculator-master/calculator/src/components/Calculating";
import { Worker as PDFWorker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import jsPDF from 'jspdf';
import { pdfjs } from 'pdfjs-dist';

// To make the file input hidden for accessibility
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function Home(data) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [showCarbonInfo, setShowCarbonInfo] = useState(false);
  const [showRegulationInfo, setShowRegulationInfo] = useState(false);
  const [worker, setWorker] = useState(null); // State to hold the worker instance

  // Dynamically load the worker as a module
  useEffect(() => {
    const newWorker = new Worker(`${process.env.PUBLIC_URL}/workers/worker.js`, { type: 'module' });
    setWorker(newWorker);
  
    return () => {
      if (newWorker) {
        newWorker.terminate();
      }
    };
  }, []);
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setProcessedFile(null);
  };

  const handleProcessFile = async () => {
    data.setCalculating(true);
    if (worker && selectedFile) {
      try {
        worker.onmessage = (e) => {
          const { error, fossilData, fugitiveData, electricityData, waterData, wasteData, travelData, offsetData } = e.data;
          if (error) {
            data.setErr(1);
            setErrMsg(error);
            worker.terminate();
          } else {
            data.setFossilInstances([...data.fossilInstances, ...fossilData]);
            data.setFugitiveInstances([...data.fugitiveInstances, ...fugitiveData]);
            data.setElectricityInstances([...data.electricityInstances, ...electricityData]);
            data.setWaterInstances([...data.waterInstances, ...waterData]);
            data.setWasteInstances([...data.wasteInstances, ...wasteData]);
            data.setTravelInstances([...data.travelInstances, ...travelData]);
            data.setOffsetInstances([...data.offsetInstances, ...offsetData]);
            data.setErr(null);
          }
          setProcessedFile(1);
          data.setCalculating(false);
          worker.terminate();
        };

        worker.postMessage({ file: selectedFile });
      } catch (error) {
        data.setErr(1);
        setErrMsg(error);
        setProcessedFile(1);
        data.setCalculating(false);
      }
    } else {
      alert('Please select an Excel file first.');
    }
  };

  const LearnAbout = () => {
    const pdfPath = process.env.PUBLIC_URL + "/Regulations_and_Frameworks.pdf";

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="main">
        <div className="header">
          <div className="landingText">
            <h1><b>Learn About Carbon Footprint Regulations</b></h1>
            <h3 id="homeText">Click the button below to download detailed information about carbon footprint regulations in PDF format.</h3>
          </div>
        </div>

        <div className="homeAbout">
          <div className="aboutText">
            <h2 style={{ textAlign: "center", marginBottom: '30px' }}>Carbon Footprint Regulations</h2>
            <p>
              Carbon footprint regulations are essential in reducing global greenhouse gas emissions. These regulations are part of global efforts to mitigate climate change and promote sustainable practices...
            </p>
          </div>
        </div>

        <div className="calculateDiv">
          <Button
            component="a"
            href={pdfPath}
            download="Regulations_and_Frameworks.pdf"
            id="learnAboutBtn"
          >
            Download PDF with Regulations
          </Button>
        </div>

        {/* PDF viewer */}
        <div>
          <h3>View Regulations PDF</h3>
          <PDFWorker workerUrl="/pdf.worker.min.js">
            <Viewer fileUrl={pdfPath} />
          </PDFWorker>
        </div>
      </motion.div>
    );
  };

  const navigate = useNavigate();

  function transferToCalculator() {
    navigate("/Calculator");
  }

  function showResult(id) {
    navigate("/Result", { state: id });
    window.scrollTo(0, 0);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="main">
      <Calculating calculating={data.calculating} err={data.err} errMsg={errMsg}></Calculating>
      <div className="header">
        <div className="landingText">
          <h1><b>What is your Carbon Footprint?</b></h1>
          <h3 id="homeText">Get to know your Carbon Footprint using our Calculator.</h3>
        </div>
        <div className="logos">
          <img className="aboutImg" src={co2logo} alt="CO2 Logo" />
        </div>
      </div>

      {/* Section for Carbon Footprint Information */}
      <div className="homeAbout">
        <img className="aboutImg" src={greenhouselogo} alt="Greenhouse Logo" />
        <div className="aboutText">
          <h2 style={{ textAlign: "center", marginBottom: '30px' }}>About Carbon Footprint</h2>
          <p>A carbon footprint refers to the total amount of greenhouse gases, primarily carbon dioxide, emitted into the atmosphere as a result of human activities, including transportation, energy use, and food production. It is a key indicator of environmental impact, highlighting the role we play in climate change.</p>

          <Button onClick={() => setShowCarbonInfo(!showCarbonInfo)}>
            {showCarbonInfo ? "Hide Information" : "Read More"}
          </Button>

          {showCarbonInfo && (
            <div>
              <p>By reducing our carbon footprint—through energy conservation, sustainable transportation, waste reduction, and adopting eco-friendly practices—we can help mitigate global warming, protect natural resources, and contribute to a more sustainable future.</p>
              <p></p>

<h3>Carbon Footprint: Overview</h3>

<p>A <strong>carbon footprint</strong> refers to the total amount of greenhouse gases (GHGs) emitted into the atmosphere due to human activities. These emissions are measured in terms of equivalent tons of carbon dioxide (CO₂e) to account for the different warming potentials of various gases. These gases include <strong>carbon dioxide (CO₂)</strong>, <strong>methane (CH₄)</strong>, <strong>nitrous oxide (N₂O)</strong>, and other gases like <strong>fluorinated gases</strong> (e.g., HFCs, PFCs, SF₆, NF₃).</p>

<p>The carbon footprint is divided into two primary categories:</p>
<ol>
    <li><strong>Direct Emissions (Scope 1)</strong>: Emissions from sources that are directly owned or controlled by the individual or organization. This includes emissions from personal vehicles, fuel combustion in heating systems, and industrial processes.</li>
    <li><strong>Indirect Emissions (Scope 2 & 3)</strong>:
        <ul>
            <li><strong>Scope 2</strong>: Emissions from the generation of purchased electricity, heating, or cooling consumed by the individual or organization.</li>
            <li><strong>Scope 3</strong>: All other indirect emissions not covered in Scope 2, such as the emissions from the production of goods and services consumed, transportation of goods, waste disposal, and business travel.</li>
        </ul>
    </li>
</ol>

<p>Understanding your carbon footprint is crucial to implementing strategies for reducing environmental impact and contributing to global sustainability goals, such as those set out in the <strong>Paris Agreement</strong>.</p>

<h3>Carbon Calculator: What It Is and How It Works</h3>

<p>A <strong>carbon calculator</strong> is a tool that helps individuals, businesses, and organizations measure their carbon footprint. These calculators estimate the amount of CO₂e produced based on specific activities and behaviors. Carbon calculators work by taking user inputs and converting them into equivalent carbon emissions, allowing people to understand their environmental impact and take actions toward mitigation.</p>

<p>Here’s a detailed breakdown of the process and types of carbon calculators:</p>

<h4>1. Personal Carbon Calculators</h4>
<p>These calculators are designed for individuals to estimate their carbon footprint based on everyday activities, such as:</p>
<ul>
    <li><strong>Transportation</strong>: Type of vehicle (car, bike, bus, flight, etc.), frequency of travel, and fuel type.</li>
    <li><strong>Energy Consumption</strong>: Amount of electricity, heating, and cooling used in the home, and the source of energy (renewable vs. non-renewable).</li>
    <li><strong>Food</strong>: Type of diet (vegetarian, vegan, omnivore) and food waste, since agricultural practices, transportation, and refrigeration all contribute to emissions.</li>
    <li><strong>Waste</strong>: Amount of waste generated, recycling habits, and landfills.</li>
    <li><strong>Shopping and Consumption</strong>: The goods purchased, particularly energy-intensive products like electronics or clothing, which have high emissions during production and transportation.</li>
</ul>

<p><strong>Examples of Personal Carbon Calculators:</strong></p>
<ul>
    <li><strong>EPA Carbon Footprint Calculator</strong> (U.S. Environmental Protection Agency)</li>
    <li><strong>WWF’s Carbon Footprint Calculator</strong> (World Wildlife Fund)</li>
    <li><strong>CoolClimate Network’s Carbon Footprint Calculator</strong> (University of California, Berkeley)</li>
</ul>

<h4>2. Business/Organizational Carbon Calculators</h4>
<p>These calculators are more complex and cater to businesses or entire organizations. They include inputs like:</p>
<ul>
    <li><strong>Energy Use</strong>: Detailed energy consumption, including electricity, heating, cooling, and manufacturing processes.</li>
    <li><strong>Supply Chain Emissions</strong>: Emissions from sourcing materials, distribution, product life-cycle, and end-of-life disposal.</li>
    <li><strong>Transportation & Logistics</strong>: Emissions from employee travel, shipping goods, and business logistics.</li>
    <li><strong>Waste Management</strong>: Emissions related to waste disposal, recycling programs, and landfills.</li>
    <li><strong>Employee Commute</strong>: Carbon emissions from employees’ daily commute to work.</li>
</ul>

<p><strong>Examples of Business Carbon Calculators:</strong></p>
<ul>
    <li><strong>Greenhouse Gas Protocol (GHG Protocol) Tools</strong>: Offers guidelines for corporate carbon accounting.</li>
    <li><strong>Carbon Trust Footprint Calculator</strong>: Used by businesses to measure and reduce their carbon emissions.</li>
</ul>

<p>These tools often align with global standards such as the <strong>GHG Protocol</strong> and the <strong>ISO 14064</strong> standard, which set guidelines for measuring and reporting carbon emissions.</p>

<h3>Key Elements of Carbon Footprint Calculation</h3>

<p>1. <strong>Greenhouse Gas Emissions</strong>: Carbon footprint calculators rely on standard emission factors to convert the data provided by the user into carbon dioxide equivalents (CO₂e). The key gases include:</p>
<ul>
    <li><strong>Carbon Dioxide (CO₂)</strong>: The most common GHG from fossil fuel combustion.</li>
    <li><strong>Methane (CH₄)</strong>: Released from agriculture (livestock, rice cultivation), landfills, and natural gas systems.</li>
    <li><strong>Nitrous Oxide (N₂O)</strong>: Emitted from agricultural practices, wastewater treatment, and industrial processes.</li>
    <li><strong>Fluorinated Gases</strong>: Emissions from refrigerants, air conditioning, and industrial use.</li>
</ul>

<p>Each activity (such as driving a car or heating a home) has a specific <strong>emission factor</strong>, representing the amount of CO₂e released per unit of activity (e.g., miles driven, kWh of electricity used).</p>

<p>2. <strong>Calculation Methodologies</strong>: Carbon calculators typically follow established frameworks for calculating emissions:</p>
<ul>
    <li><strong>Top-down approach</strong>: Estimating emissions at a macro level, such as by using national or regional data on carbon intensity.</li>
    <li><strong>Bottom-up approach</strong>: Detailed, activity-specific data gathered from individuals or organizations.</li>
</ul>

<p>Some tools ask for specifics like the type of vehicle driven or the type of energy consumed to provide a more personalized estimate.</p>

<p>3. <strong>Measurement Metrics</strong>:</p>
<ul>
    <li><strong>CO₂ Equivalent (CO₂e)</strong>: Since different GHGs have different global warming potentials, emissions are often standardized into CO₂e. This helps measure the cumulative impact of various gases.</li>
    <li><strong>Carbon Intensity</strong>: Measured as grams of CO₂e per unit (e.g., per kWh of electricity or per mile traveled).</li>
</ul>

<p>4. <strong>Carbon Offsets</strong>: Many carbon calculators also offer suggestions for <strong>carbon offsetting</strong>—projects that reduce, avoid, or capture emissions to compensate for one's own emissions. These include:</p>
<ul>
    <li><strong>Reforestation Projects</strong>: Planting trees to capture CO₂.</li>
    <li><strong>Renewable Energy Projects</strong>: Supporting wind, solar, or hydropower projects that displace fossil fuel use.</li>
    <li><strong>Methane Capture Projects</strong>: Mitigating methane emissions from landfills or agricultural activities.</li>
</ul>

<h3>Carbon Footprint Reduction Strategies</h3>

<p>Once the carbon footprint is calculated, the next step is to <strong>reduce</strong> it. Some common strategies include:</p>

<ul>
    <li><strong>Energy Efficiency</strong>:
        <ul>
            <li>Upgrade to energy-efficient appliances: Using LED bulbs, energy-efficient heating, and cooling systems.</li>
            <li>Insulate homes and buildings to reduce heating and cooling needs.</li>
            <li>Switch to renewable energy sources, such as solar, wind, or geothermal.</li>
        </ul>
    </li>
    <li><strong>Transportation</strong>:
        <ul>
            <li>Switch to electric vehicles (EVs) or hybrid cars.</li>
            <li>Opt for public transport, walking, or cycling instead of driving.</li>
            <li>Carpool or use ride-sharing apps to reduce the number of vehicles on the road.</li>
        </ul>
    </li>
    <li><strong>Food Choices</strong>:
        <ul>
            <li>Adopt plant-based diets or reduce meat consumption (especially beef and lamb, which have higher emissions).</li>
            <li>Reduce food waste by proper meal planning and composting.</li>
        </ul>
    </li>
    <li><strong>Waste Management</strong>:
        <ul>
            <li>Recycle and compost waste to reduce landfill emissions.</li>
            <li>Buy in bulk and avoid single-use packaging.</li>
        </ul>
    </li>
    <li><strong>Sustainable Consumption</strong>:
        <ul>
            <li>Buy fewer, high-quality items with a lower carbon footprint.</li>
            <li>Support eco-friendly brands that prioritize sustainability and reduce carbon emissions in their manufacturing processes.</li>
        </ul>
    </li>
    <li><strong>Offset Your Emissions</strong>:
        <ul>
            <li>Invest in carbon offset programs like tree planting, renewable energy projects, or community-based initiatives that help neutralize emissions.</li>
        </ul>
    </li>
</ul>

<h3>Conclusion</h3>

<p>The carbon footprint concept and the tools available to measure it are integral parts of global efforts to combat climate change. By using carbon calculators, individuals and organizations can take proactive steps to reduce their emissions and work toward sustainability goals. These tools also provide insights into the high-impact areas where the most effective reductions can be made, making it possible to prioritize and act on emission reduction. With the adoption of cleaner technologies, energy efficiency measures, and sustainable lifestyles, we can collectively address the growing environmental challenges posed by climate change.</p>

            </div>
          )}
        </div>
      </div>

      {/* Section for Regulations */}
      <div className="homeRegulation">
        <h2 style={{ textAlign: "center", marginBottom: '30px' }}>Regulations and Standards</h2>
        <Button onClick={() => setShowRegulationInfo(!showRegulationInfo)}>
          {showRegulationInfo ? "Hide Regulations" : "Learn About Regulations"}
        </Button>

        {showRegulationInfo && (
          <div>
            <p>Here are some key regulations and frameworks that govern carbon footprints and greenhouse gas emissions. These regulations aim to reduce global carbon emissions and address climate change through national and international efforts.</p>
            <div>
    <h4>1. The Paris Agreement (2015)</h4>
    <p>Overview: A global agreement within the United Nations Framework Convention on Climate Change (UNFCCC), aimed at limiting global warming to below 2°C, and preferably 1.5°C, above pre-industrial levels.</p>
    <ul>
        <li>Countries must submit "Nationally Determined Contributions" (NDCs), outlining their efforts to reduce emissions.</li>
        <li>Aims for global carbon neutrality by mid-century (2050).</li>
        <li>Promotes climate finance to help developing countries mitigate climate change.</li>
        <li>Encourages transparency and monitoring of progress towards emission reduction targets.</li>
    </ul>

    <h4>2. European Union Emissions Trading System (EU ETS)</h4>
    <p>Overview: The EU ETS is the cornerstone of the European Union's policy to combat climate change by reducing industrial greenhouse gas emissions cost-effectively.</p>
    <ul>
        <li>Introduced in 2005, it covers over 11,000 power stations and industrial plants in 27 EU countries.</li>
        <li>A cap-and-trade system, where companies are given a set limit (cap) for carbon emissions and can buy or sell emission allowances (permits) within the market.</li>
        <li>Aims to reduce emissions by 43% by 2030 compared to 2005 levels.</li>
    </ul>

    <h4>3. Clean Air Act (U.S.)</h4>
    <p>Overview: A federal law in the United States that regulates air emissions from stationary and mobile sources.</p>
    <ul>
        <li>Enforced by the U.S. Environmental Protection Agency (EPA), the Act regulates pollutants that contribute to climate change, including carbon dioxide.</li>
        <li>In 2007, the U.S. Supreme Court ruled that the EPA could regulate carbon dioxide as a greenhouse gas under the Clean Air Act.</li>
        <li>The Clean Power Plan (proposed in 2015) aimed to reduce CO2 emissions from power plants by 32% by 2030 (though it was never fully implemented).</li>
    </ul>

    <h4>4. Carbon Pricing (Global)</h4>
    <p>Overview: A market-driven approach to reducing greenhouse gas emissions by assigning a price to carbon emissions.</p>
    <ul>
        <li>Carbon Tax: A direct tax on the carbon content of fossil fuels, encouraging industries to reduce emissions by adopting cleaner technologies.</li>
        <li>Cap-and-Trade: A system where a government caps the total amount of emissions allowed and allocates permits to companies. These permits can be traded among companies.</li>
        <li>Several countries (e.g., Canada, Sweden, and Japan) have implemented carbon taxes or cap-and-trade systems to incentivize emission reductions.</li>
    </ul>

    <h4>5. The Kyoto Protocol (1997)</h4>
    <p>Overview: An international treaty that commits industrialized countries to reduce greenhouse gas emissions based on the premise that (a) human-made CO2 emissions are causing global warming, and (b) industrialized nations should bear the brunt of reducing emissions.</p>
    <ul>
        <li>The Protocol established legally binding targets for 37 industrialized countries and the European Community to reduce greenhouse gas emissions.</li>
        <li>It set emission reduction targets averaging 5% below 1990 levels, to be achieved during the first commitment period (2008-2012).</li>
        <li>Though the Protocol came into force in 2005, it was eventually replaced by the Paris Agreement.</li>
    </ul>

    <h4>6. The Green New Deal (U.S.)</h4>
    <p>Overview: A proposal introduced by Congresswoman Alexandria Ocasio-Cortez in 2019 to address climate change, reduce carbon emissions, and promote green jobs.</p>
    <ul>
        <li>Calls for achieving net-zero greenhouse gas emissions by 2030.</li>
        <li>Aims to invest in renewable energy infrastructure, energy efficiency, and carbon-neutral technology to create millions of jobs.</li>
        <li>Focuses on social and economic justice, including policies that would guarantee employment for those affected by the transition to a green economy.</li>
    </ul>

    <h4>7. International Maritime Organization (IMO) Emissions Regulations</h4>
    <p>Overview: The IMO is responsible for regulating emissions from the international shipping industry.</p>
    <ul>
        <li>In 2020, the IMO introduced a global sulfur cap of 0.5% on marine fuel to reduce air pollution.</li>
        <li>The IMO has also set targets to reduce greenhouse gas emissions from ships by 50% by 2050, compared to 2008 levels.</li>
        <li>The organization is working on additional measures to reduce carbon emissions in the shipping industry, including promoting the use of low-carbon fuels.</li>
    </ul>

    <h4>8. The Carbon Neutrality Law (China)</h4>
    <p>Overview: China has committed to becoming carbon neutral by 2060.</p>
    <ul>
        <li>The goal is to reach peak carbon emissions before 2030, followed by a gradual reduction to achieve carbon neutrality by 2060.</li>
        <li>China has announced plans to boost renewable energy, increase energy efficiency, and reduce reliance on coal.</li>
        <li>The country is also expected to implement carbon pricing and explore emission trading systems as part of its commitment.</li>
    </ul>

    <h4>9. California Global Warming Solutions Act (AB 32)</h4>
    <p>Overview: California's landmark climate legislation passed in 2006 that aims to reduce greenhouse gas emissions.</p>
    <ul>
        <li>Targets a reduction of emissions to 1990 levels by 2020.</li>
        <li>The legislation created a cap-and-trade program for greenhouse gas emissions from the largest polluters.</li>
        <li>Sets ambitious long-term goals, including a 40% reduction in emissions by 2030, and an 80% reduction by 2050.</li>
    </ul>

    <h4>10. The Clean Development Mechanism (CDM)</h4>
    <p>Overview: A mechanism under the Kyoto Protocol that allows emission-reduction projects in developing countries to earn Certified Emission Reduction (CER) credits.</p>
    <ul>
        <li>Projects that reduce emissions or enhance carbon sequestration can be used to offset emissions in developed countries.</li>
        <li>It was one of the first international market-based mechanisms to enable countries to meet their carbon reduction targets.</li>
    </ul>

    <h4>11. Nationally Appropriate Mitigation Actions (NAMAs)</h4>
    <p>Overview: These are voluntary climate mitigation actions taken by developing countries to address climate change under the United Nations Framework Convention on Climate Change (UNFCCC).</p>
    <ul>
        <li>NAMAs are designed to help developing countries reduce their carbon footprints while also fostering sustainable development.</li>
        <li>They include actions like renewable energy projects, energy efficiency improvements, and deforestation prevention.</li>
    </ul>

    <h4>12. The Greenhouse Gas Protocol (GHG Protocol)</h4>
    <p>Overview: The GHG Protocol is a multi-stakeholder partnership convened by the World Resources Institute (WRI) and the World Business Council for Sustainable Development (WBCSD). It provides standards and guidance for companies and organizations preparing a greenhouse gas (GHG) emissions inventory.</p>
    <ul>
        <li>Divides emissions into three categories: 
            <ul>
                <li>Scope 1: Direct emissions from owned or controlled sources (e.g., fuel combustion, company-owned vehicles).</li>
                <li>Scope 2: Indirect emissions from the generation of purchased electricity consumed by the reporting company.</li>
                <li>Scope 3: All other indirect emissions, including supply chain emissions, business travel, waste disposal, and more.</li>
            </ul>
        </li>
        <li>Widely adopted by corporations, governments, and organizations to calculate and manage their carbon footprint.</li>
        <li>Supports companies in creating climate action strategies and demonstrating transparency in reporting emissions.</li>
    </ul>

    <h4>13. Carbon Footprint Standards and Certifications</h4>
    <ul>
        <li>ISO 14064-1: An international standard for quantifying and reporting greenhouse gas emissions and removals.</li>
        <li>Carbon Trust Standard: A certification awarded to organizations that demonstrate a commitment to measuring, managing, and reducing their carbon emissions.</li>
        <li>PAS 2050: A standard developed by the British Standards Institution (BSI) to measure the carbon footprint of products.</li>
    </ul>

    <h4>14. Carbon Border Adjustment Mechanism (CBAM) - EU Proposal</h4>
    <p>Overview: The EU proposed the Carbon Border Adjustment Mechanism to prevent carbon leakage, where businesses relocate to countries with laxer climate rules.</p>
    <ul>
        <li>It introduces a fee for imported goods based on the carbon emissions associated with their production, ensuring a level playing field between domestic and foreign products.</li>
        <li>Industries that face competition from outside the EU, such as cement, steel, and chemicals, will be affected.</li>
        <li>The mechanism will be implemented progressively, starting in 2023, and aims to encourage other countries to adopt more stringent climate policies.</li>
    </ul>

    <h4>15. Nationally Determined Contributions (NDCs)</h4>
    <p>Overview: Each party to the Paris Agreement is required to outline and regularly update its NDC, which sets the climate actions and targets that the country intends to meet.</p>
    <ul>
        <li>NDCs are voluntary but must align with the long-term goal of keeping global temperature rise well below 2°C.</li>
        <li>They cover a range of policies, such as emission reduction targets, renewable energy investments, and adaptation strategies.</li>
    </ul>

    <h4>16. The Kigali Amendment (2016)</h4>
    <p>Overview: An amendment to the Montreal Protocol, aimed at phasing out the use of hydrofluorocarbons (HFCs), which are potent greenhouse gases used in refrigeration and air conditioning.</p>
    <ul>
        <li>The amendment requires developed countries to reduce the consumption of HFCs by 85% over the next 15 years.</li>
        <li>Developing countries have different timelines to phase out HFCs, but they will also make gradual reductions.</li>
    </ul>

    <h4>17. The United Nations Framework Convention on Climate Change (UNFCCC)</h4>
    <p>Overview: An international environmental treaty aimed at addressing climate change through global cooperation. It was established in 1992 and currently has 197 parties.</p>
    <ul>
        <li>The UNFCCC provides a platform for annual negotiations, with the Conference of the Parties (COP) being the most significant event where countries agree on emissions reductions and climate finance.</li>
    </ul>

    <h4>18. The United States Clean Power Plan (CPP)</h4>
    <p>Overview: Introduced by the Obama administration in 2015, the CPP aimed to reduce carbon emissions from the U.S. power sector by 32% by 2030.</p>
    <ul>
        <li>The CPP sought to set state-specific carbon pollution reduction goals and allowed states to choose how they could achieve these reductions, such as improving energy efficiency and increasing renewable energy usage.</li>
    </ul>

    <h4>19. The Global Climate Coalition (GCC) and Other Lobby Groups</h4>
    <ul>
        <li>Some industry groups, particularly those in the fossil fuel, automotive, and manufacturing sectors, have lobbied against climate regulations and carbon pricing.</li>
    </ul>

    <h4>20. Sustainable Development Goals (SDGs)</h4>
    <p>Overview: The United Nations 2030 Agenda for Sustainable Development includes 17 SDGs, with several directly related to reducing carbon footprints, such as: </p>
    <ul>
        <li>Goal 7: Affordable and Clean Energy — Promotes energy efficiency and the use of renewable energy to reduce carbon emissions.</li>
        <li>Goal 12: Responsible Consumption and Production — Encourages the reduction of carbon footprints by minimizing waste and adopting sustainable production methods.</li>
        <li>Goal 13: Climate Action — Urges the global community to take urgent action to combat climate change and its impacts.</li>
    </ul>

    <h4>21. International Finance Corporation (IFC) Standards on Carbon Emissions</h4>
    <p>Overview: The IFC, a member of the World Bank, provides guidelines for private sector development and investments that support the reduction of carbon footprints.</p>
    <ul>
        <li>The IFC's Environmental and Social Performance Standards include requirements for assessing and managing greenhouse gas emissions from projects financed by the organization.</li>
    </ul>
</div>

          </div>
        )}
      </div>

      <div className="calculateDiv">
        <h1 id="calculate"><b>Calculate your Carbon Footprint</b></h1>
      </div>
      <div className="homeOptions">
        <div className="calculateByForm">
          <h2 style={{ textAlign: 'center' }}><b><FontAwesomeIcon icon={faPencil} />&nbsp;&nbsp;Fill out a Form</b></h2>
          <Button onClick={transferToCalculator} id="getStarted">Get Started</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}><h2><b>OR</b></h2></div>
        <div className="calculateByUpload">
          <h2 style={{ textAlign: 'center' }}><b><FontAwesomeIcon icon={faFileExcel} />&nbsp;&nbsp;Upload an Excel Sheet</b></h2>
          {selectedFile ? (
            <Button onChange={handleFileUpload} component="label" role={undefined} tabIndex={-1} id="getStarted"> Upload a different file <VisuallyHiddenInput type="file" /></Button>
          ) : (
            <Button onChange={handleFileUpload} component="label" role={undefined} tabIndex={-1} id="getStarted"> Upload file <VisuallyHiddenInput type="file" /></Button>
          )}

          {selectedFile && <p style={{ marginTop: '0px', marginBottom: "-15px" }}>Uploaded File: {selectedFile.name}</p>}

          {(selectedFile && !processedFile) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Button data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="getStarted" onClick={handleProcessFile}>Calculate</Button></motion.div>
          )}

          {(processedFile && data.err) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Button data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="getStarted" onClick={handleProcessFile}>Calculate</Button></motion.div>
          )}

          {(processedFile && !data.err) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Button onClick={() => showResult(2)} id="getStarted">Show Results</Button></motion.div>
          )}

          <Button id="getStarted"><a id="homeDownloadLink" href="/template.xlsx" download>Download Input Excel Template</a></Button>
        </div>
      </div>
    </motion.div>
  );
}
