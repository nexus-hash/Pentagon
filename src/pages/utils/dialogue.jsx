import "../../css/global.css";

function Dialogue(props){

  const stopOnclick = (e) => {
    e.stopPropagation();
  }

  return (
    <div hidden={!props.open}>
      <div onClick={props.handleClose} className="absolute z-50 top-0 left-0 h-screen w-screen backdrop-blur-xl bg-gray-700 bg-opacity-80 flex justify-center items-center">
        <div onClick={stopOnclick} className="relative w-1/2 h-1/2 btn-bg-color px-8 py-5 rounded-xl overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Dialogue;