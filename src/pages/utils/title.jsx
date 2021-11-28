import Logo from "../../assets/pentlogolight.svg";
import { useHistory } from "react-router";

function Title(props) {
  var history = useHistory();
  return (
    <div
      onClick={() => history.push("/")}
      className="flex justify-start cursor-pointer items-center"
    >
      <img
        alt="mpm Logo"
        src={Logo}
        style={{ width: props.width, height: props.height, fill: props.color }}
        className="mr-2"
      />
      <h1
        className={` font-mono font-extrabold tracking-wider ${
          props.fontColor.length ? props.fontColor : "font-bg-color"
        } ${props.isTeamNav ? "text-xl" : "lg:text-4xl text-2xl"} `}
      >
        mpm
      </h1>
    </div>
  );
}

export default Title;