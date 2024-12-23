import { Link } from "react-router-dom";

const UpdatePages = () => {

    return (
    <div>
        <Link to={'/ckc/carbon-calculator-dashboard/update'} >
            <button className='bg-green-600 text-xl text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:bg-green-700'>
                Update Pages
            </button>
        </Link>
    </div>  );
}
 
export default UpdatePages;