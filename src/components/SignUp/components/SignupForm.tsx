import { EyeIcon, EyeClosedIcon, ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!agreed) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }
    // TODO: nối API đăng ký
    navigate("/");
  }

  return (
    <>
      <div className="px-5 pt-5 sm:px-8 sm:pt-8 lg:ml-10 lg:mt-10">
      <Link
          to="/"
          className="inline-flex items-center gap-2 text-body-md text-primary hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-start overflow-auto px-5 py-8 sm:justify-center sm:px-8 sm:py-12">
        <div className="mx-auto w-full max-w-[560px]">
          <header className="mb-8">
            <h1 className=" text-headline-lg font-semibold text-primary-container">
              Create Account
            </h1>
            <p className="mt-2 text-body-md text-primary-fixed-dim">
              Join the academy and start your learning journey.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-md">
            {/* Full Name */}
            <div className="space-y-xs">
              <label
                htmlFor="full_name"
                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
              >
                Full Name
              </label>
              <Input
                id="full_name"
                type="text"
                placeholder="John Doe"
                className="w-full h-11 rounded-lg border-outline-variant bg-white px-3 text-body-md text-on-background placeholder:text-primary-fixed-dim focus-visible:border-primary focus-visible:ring-primary/30"
              />
            </div>

            {/* Email */}
            <div className="space-y-xs">
              <label
                htmlFor="email"
                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full h-11 rounded-lg border-outline-variant bg-white px-3 text-body-md text-on-background placeholder:text-primary-fixed-dim focus-visible:border-primary focus-visible:ring-primary/30"
              />
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="space-y-xs">
                <label
                  htmlFor="password"
                  className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-11 rounded-lg border-outline-variant bg-white pr-11 text-body-md focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-on-primary-container/60 hover:text-primary transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeIcon className="size-4" /> : <EyeClosedIcon className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-xs">
                <label
                  htmlFor="password_confirmation"
                  className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-11 rounded-lg border-outline-variant bg-white pr-11 text-body-md focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-on-primary-container/60 hover:text-primary transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeIcon className="size-4" /> : <EyeClosedIcon className="size-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-sm py-xs">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-body-md text-on-surface-variant cursor-pointer"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary font-bold hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and the{" "}
                <Link to="/privacy" className="text-primary font-bold hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {error && (
              <p className="text-body-md text-error" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-primary font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-primary hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-body-md text-primary-fixed-dim">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-secondary-container hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
