import Logo from "../../assets/pentagon.svg";

function Title(props) {
  return (
    <div className="flex justify-start items-center">
      <img
        alt="Pentagon Logo"
        src={Logo}
        style={{ width: props.width, height: props.height,fill:props.color }}
        className="mr-2"
      />
      <h1 className="font-serif tracking-wider font-bg-color lg:text-2xl text-xl">
        PENTAGON
      </h1>
    </div>
  );
}

export default Title;