import type { SignUpRequest } from '@/types/api/authTypes';
import { Link } from 'react-router-dom';
import { LuLoaderCircle } from 'react-icons/lu';

interface SignUpCardProps {
  form: SignUpRequest;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignUpCard = ({ form, loading, onChange, onSubmit }: SignUpCardProps) => {
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
        Get Started Now
      </p>
      <h4 className="text-center text-2xl font-bold text-foreground mb-8">
        Registration
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
        <span>Register with google</span>
      </button>

      {/* Divider */}
      <div className="relative text-center my-6 text-sm text-theme-color3 dark:text-muted-foreground before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[38%] before:h-[1px] before:bg-theme-bg4 dark:before:bg-border after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-[38%] after:h-[1px] after:bg-theme-bg4 dark:after:bg-border">
        <span>Or</span>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-theme-color4 dark:text-foreground"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onChange}
            placeholder="Enter your full name"
            className="w-full h-12 px-4 rounded-md border border-theme-bcolor2 dark:border-border bg-theme-bg2 dark:bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-theme-color5 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="username"
            className="text-sm font-medium text-theme-color4 dark:text-foreground"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={form.username}
            onChange={onChange}
            placeholder="Enter your username"
            className="w-full h-12 px-4 rounded-md border border-theme-bcolor2 dark:border-border bg-theme-bg2 dark:bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-theme-color5 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
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

        <div className="flex flex-col gap-1.5">
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

        <div className="flex items-center gap-2 text-sm mt-2 mb-4">
          <input
            type="checkbox"
            id="terms"
            required
            defaultChecked
            className="w-4 h-4 accent-theme-color5 rounded"
          />
          <label htmlFor="terms" className="text-theme-color dark:text-foreground text-sm cursor-pointer">
            I agree to terms & conditions
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1890FF] hover:bg-[#007be5] text-white font-medium rounded-md transition-all flex items-center justify-center gap-2 text-base shadow-md mb-6 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <LuLoaderCircle className="w-5 h-5 animate-spin text-white" />
              Registering...
            </>
          ) : (
            'Register now'
          )}
        </button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-theme-color dark:text-muted-foreground">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className="text-theme-color5 font-semibold hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUpCard;
