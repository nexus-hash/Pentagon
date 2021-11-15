import "../../../css/component.css";

function SubmitButton(props) {
  return (
    <button
      type="submit"
      className="submitButton"
      disabled={props.btnState}
      style={{ opacity: props.btnbg,cursor: props.cursor} }
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default SubmitButton;