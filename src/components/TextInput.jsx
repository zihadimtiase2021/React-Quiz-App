import classes from "../styles/Textinput.module.css";

// eslint-disable-next-line react/prop-types
export default function TextInput({ icon, ...rest }) {
  return (
    <div className={classes.textInput}>
      <input {...rest} />
      <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}
