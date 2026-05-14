import AuthLayout from "../common/layouts/auth-layout";
import SignInForm from "./components/SigninForm";

const SignInPage: React.FC = () => {
    return (
      <>
        <AuthLayout>
          <SignInForm />
        </AuthLayout>
      </>
    );
  };
export default SignInPage;
