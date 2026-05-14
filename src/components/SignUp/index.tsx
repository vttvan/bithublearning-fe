import AuthLayout from "../common/layouts/auth-layout";
import SignUpForm from "./components/SignupForm";

const SignUpPage: React.FC = () => {
    return (
      <>
        <AuthLayout>
          <SignUpForm />
        </AuthLayout>
      </>
    );
  };
export default SignUpPage;
