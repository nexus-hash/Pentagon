import "../../../css/component.css";

function InputField(props) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className={props.css?props.css: "inputField"}
      onChange={props.onChange}
      value={props.value}
    ></input>
  );
}

export default InputField;