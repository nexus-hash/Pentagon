import CircularIndicator from "./circularIndicator"

function PasswordValidationIdentifier(props) {
  return (
    <div className="w-full sm:spcae-y-0 space-y-1">
      <div className="w-full px-2 sm:flex justify-start items-center sm:tracking-tight sm:space-x-1 space-y-1 lg:space-y-0 text-sm">
        <div className="text-green-600 sm:w-1/2 w-full flex items-center">
          <CircularIndicator
            color={props.oneSpecialColor}
          ></CircularIndicator>
          {"   "}
          At least one special character
        </div>
        <div className="text-green-600 sm:w-1/2 flex items-center">
          <CircularIndicator color={props.oneCapColor}></CircularIndicator>
          {"   "}
          Minimum one capital alphabet
        </div>
      </div>
      <div className="w-full px-2 sm:flex justify-start items-center sm:tracking-tight sm:space-x-1 space-y-1 lg:space-y-0 text-sm">
        <div className="text-green-600 w-1/2 flex items-center">
          <CircularIndicator color={props.oneNumColor}></CircularIndicator>
          {"   "}
          At least one number
        </div>
        <div className="text-green-600 w-1/2 flex items-center">
          <CircularIndicator
            color={props.lengthEightColor}
          ></CircularIndicator>
          {"   "}
          Minimum 8 characters
        </div>
      </div>
    </div>
  );
}

export default PasswordValidationIdentifier;