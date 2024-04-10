import { IoIosWarning } from "react-icons/io";
import "./index.css";

const FailureView = () => (
  <>
    <IoIosWarning className="warning-icon" />
    <h1 className="error-heading">Oops! Something went wrong try again</h1>
  </>
);

export default FailureView;
