import "./component.css";

function SubmitButton(props) {
  return (
    <button
      type="submit"
      className="submitButton"
      disabled={props.btnState}
      style={{ opacity: props.btnbg }}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default SubmitButton;