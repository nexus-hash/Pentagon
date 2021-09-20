import "./component.css";

function InputField(props) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="inputField"
      onChange={props.onChange}
      value={props.value}
    ></input>
  );
}

export default InputField;