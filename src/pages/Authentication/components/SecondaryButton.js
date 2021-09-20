import {Link} from "react-router-dom";

function SecondaryButton(props) {
  return (
    <Link
      to={props.path}
      className="py-2 text-center border-2 border-gray-400 font-bg-color rounded-lg text-sm"
      style={{width: props.Width}}
    >
      {props.title}
    </Link>
  );
}

export default SecondaryButton;