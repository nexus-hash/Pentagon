import Logo from "../../assets/pentlogolight.svg";

function Title(props) {
  return (
    <div className="flex justify-start items-center">
      <img
        alt="Pentagon Logo"
        src={Logo}
        style={{ width: props.width, height: props.height,fill:props.color }}
        className="mr-2"
      />
      <h1 className={`font-serif tracking-wider ${props.fontColor.length?props.fontColor:"font-bg-color"} lg:text-2xl text-xl`}>
        PENTAGON
      </h1>
    </div>
  );
}

export default Title;