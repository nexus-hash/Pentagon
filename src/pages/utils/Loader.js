import {HashLoader} from 'react-spinners';

function Loader(props){  
  return (
      <div className="h-screen w-full overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center mt-64">
          <HashLoader color={"#EB5757"} loading={true} size={80} />
          <text className="font-bold font-bg-color lg:text-2xl text-lg mt-5">
            {props.message}
          </text>
        </div>
      </div>
  );
}

export default Loader;