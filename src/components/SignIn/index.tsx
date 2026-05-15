import AuthLayout from "../common/layouts/auth-layout";
import SignInForm from "./components/SigninForm";
import { useState } from "react";

const SignInPage: React.FC = () => {
    const [isOpening, setIsOpening] = useState(false);

    return (
      <>
        <AuthLayout isOpening={isOpening}>
          <SignInForm onLoginSuccess={() => setIsOpening(true)} />
        </AuthLayout>
      </>
    );
  };
export default SignInPage;
