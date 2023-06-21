import SignupImage from "../../assets/images/signup.svg";
import Illustration from "../Illustration";
import SignupForm from "../Signupform";

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration imageSrc={SignupImage} />

        <SignupForm />
      </div>
    </>
  );
}
