import { Fade } from "react-reveal";
import "../../../css/component.css";
import Title from "../../utils/title";

function Navbar(params) {
  return (
    <div className="navbar-start">
      <div className="navbar-end">
        <Fade top>
        <Title width="2.25rem" fontColor=""></Title>
        </Fade>
      </div>
    </div>
  );
}

export default Navbar;