import {Link} from "react-router-dom";
import "../../../css/component.css";

function SecondaryButton(props) {
  return (
    <Link
      to={props.path}
      className="secondaryButton"
      style={{width: props.Width}}
    >
      {props.title}
    </Link>
  );
}

export default SecondaryButton;