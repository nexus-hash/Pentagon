import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function CircularIndicator(props) {
  return (
    <CheckCircleIcon
      fontSize="small"
      className=" mr-1"
      style={{ color: props.color}}
    ></CheckCircleIcon>
  );
}

export default CircularIndicator;
