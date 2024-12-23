import { Link } from "react-router-dom";

const OutreachLink = () => {
    return (<div className="flex items-center flex-col p-5 col-span-full bg-opacity-100 sm:col-span-12  dark:bg-slate-800 rounded-sm" >
        <Link to='/ckc/carbon-calculator-dashboard/outreach' >
        <h1 className="bg-green-600 text-xl text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:text-2xl hover:bg-green-70"> 
        Click to view Outreach Activities</h1>
        </Link>
    </div> );
}
 
export default OutreachLink;