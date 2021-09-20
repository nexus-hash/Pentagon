function SubmitButton(props) {
  return (
    <button
      type="submit"
      className="w-full py-2 rounded-lg text-center btn-bg-color text-white hover:shadow-lg"
      disabled={props.btnState}
      style={{ opacity: props.btnbg }}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default SubmitButton;