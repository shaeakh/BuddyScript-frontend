import type { SignInRequest } from '@/types/api/authTypes';
import { Link } from 'react-router-dom';
import { LuLoaderCircle } from 'react-icons/lu';

interface SignInCardProps {
  form: SignInRequest;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignInCard = ({ form, loading, onChange, onSubmit }: SignInCardProps) => {
  return (
    <div className="w-full bg-theme-bg2 dark:bg-card p-6 sm:p-12 rounded-md border border-border/50 shadow-md">
      {/* Logo */}
      <div className="mb-7 flex justify-center">
        <img
          src="/assets/images/logo.svg"
          alt="Buddy Script Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Title */}
      <p className="text-center text-theme-color dark:text-muted-foreground text-sm mb-2 font-normal">
        Welcome back
      </p>
      <h4 className="text-center text-2xl font-bold text-foreground mb-8">
        Login to your account
      </h4>

      {/* Google Sign In Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-theme-bcolor1 dark:border-border bg-theme-bg2 dark:bg-secondary rounded-md text-theme-color2 dark:text-secondary-foreground font-medium text-sm hover:shadow-sm transition-all mb-8 cursor-pointer"
      >
        <img
          src="/assets/images/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span>Or sign-in with google</span>
      </button>

      {/* Divider */}
      <div className="relative text-center my-6 text-sm text-theme-color3 dark:text-muted-foreground before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[38%] before:h-[1px] before:bg-theme-bg4 dark:before:bg-border after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-[38%] after:h-[1px] after:bg-theme-bg4 dark:after:bg-border">
        <span>Or</span>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-theme-color4 dark:text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-md border border-theme-bcolor2 dark:border-border bg-theme-bg2 dark:bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-theme-color5 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-theme-color4 dark:text-foreground"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
            className="w-full h-12 px-4 rounded-md border border-theme-bcolor2 dark:border-border bg-theme-bg2 dark:bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-theme-color5 transition-all"
          />
        </div>

        <div className="flex items-center justify-between text-sm mt-1 mb-4">
          <label className="flex items-center gap-2 text-theme-color dark:text-foreground text-sm cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              defaultChecked
              className="w-4 h-4 accent-theme-color5 rounded"
            />
            Remember me
          </label>
          <span className="text-theme-color5 dark:text-primary hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1890FF] hover:bg-[#007be5] text-white font-medium rounded-md transition-all flex items-center justify-center gap-2 text-base shadow-md mb-6 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <LuLoaderCircle className="w-5 h-5 animate-spin text-white" />
              Logging in...
            </>
          ) : (
            'Login now'
          )}
        </button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-theme-color dark:text-muted-foreground">
        Dont have an account?{' '}
        <Link
          to="/auth/registration"
          className="text-theme-color5 font-semibold hover:underline"
        >
          Create New Account
        </Link>
      </p>
    </div>
  );
};

export default SignInCard;
