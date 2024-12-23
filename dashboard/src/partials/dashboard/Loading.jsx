const Loading = ({funding1}) => {
    return ( 
        <>
        {funding1.length <= 0 &&
        <div>
            <h1 className="text-bold text-5xl mb-10">Fetching data...</h1>
        </div>}
        </>
     );
}
 
export default Loading;