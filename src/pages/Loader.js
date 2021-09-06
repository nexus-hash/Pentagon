import {HashLoader} from 'react-spinners';

function Loader(props){  
  return (
    <div className="app-bg-color w-full sm:h-screen overflow-y-scroll h-auto sm:overflow-hidden flex flex-col justify-between items-center lg:space-y-0 space-y-10">
      <div className="w-full lg:h-16 flex justify-center items-center ">
        <div className="w-full max-w-7xl py-3 2xl:px-0 px-4 flex justify-start items-center font-serrif tracking-wider font-bg-color lg:text-4xl text-3xl">
          PENTAGON
        </div>
      </div>
      <div className="h-screen w-full overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center mt-64">
          <HashLoader color={"#EB5757"} loading={true} size={80} />
          <text className="font-bold font-bg-color lg:text-2xl text-lg mt-5">
            {props.message}
          </text>
        </div>
      </div>
    </div>
  );
}

export default Loader;