import { EyeIcon, EyeClosedIcon, ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";

import { useAuth } from "../../../features/Auth/context/AuthContext";
import { toast } from "sonner";

const doorAnimationDuration = 980;

const SignInForm: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    if (!email.trim() || !password) {
      setError("Please enter username and password.");
      return;
    }

    setIsLoading(true);
    const user = await login(email, password);
    setIsLoading(false);

    if (user) {
      toast.success("Login successful!");
      onLoginSuccess?.();
      await new Promise((resolve) => window.setTimeout(resolve, doorAnimationDuration));
      navigate(user.role === "admin" ? "/dashboard/admin" : "/dashboard");
    } else {
      setError("Invalid username or password. Try customer / 123 or admin / 123");
    }
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
        <div className="mx-auto w-full max-w-[420px]">
          <header className="mb-8">
            <h1 className="text-headline-lg font-semibold text-primary-container">
              Sign In
            </h1>
            <p className="mt-2 font-body-md text-body-md text-primary-fixed-dim">
              Welcome back to the academy. Please enter your credentials.
            </p>
          </header>

          <div className="relative my-7 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#fcf9f8] px-3 font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-primary-container/70 sm:px-4">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="signin-email"
                className="font-body-md text-body-md font-medium text-primary"
              >
                Email / Username
              </label>
              <Input
                id="signin-email"
                name="email"
                type="text"
                autoComplete="email"
                placeholder="e.g. nicolas.tesla@bithub.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" w-full h-11 rounded-lg border-outline-variant bg-white px-3 font-body-md text-body-md text-on-background placeholder:text-primary-fixed-dim focus-visible:border-primary focus-visible:ring-primary/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="signin-password"
                  className="font-body-md text-body-md font-medium text-primary"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="shrink-0 font-body-md text-sm font-medium text-secondary-container transition-colors hover:underline sm:text-body-md"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="signin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" w-full h-11 rounded-lg border-outline-variant bg-white pr-11 font-body-md text-body-md focus-visible:border-primary focus-visible:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-on-primary-container/60 transition-colors hover:text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="size-5" />
                  ) : (
                    <EyeClosedIcon className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
                className="mt-1 size-4 shrink-0 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <span className="font-body-md text-body-md text-on-background">
                Keep me signed in for 30 days
              </span>
            </label>

            {error ? (
              <p className="font-body-md text-body-md text-error" role="alert">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-primary font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-primary hover:bg-primary/90"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 text-center font-body-md text-body-md text-primary-fixed-dim">
            New to the academy?{" "}
            <Link
              to="/signup"
              className="font-semibold text-secondary-container transition-colors hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
