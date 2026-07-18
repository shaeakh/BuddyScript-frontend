import SignUpCard from '@/components/auth/signUpCard';
import { useSignUp } from '@/hooks/auth/useSignUp';

const Registration = () => {
  const { form, loading, handleChange, handleSubmit } = useSignUp();

  return (
    <div className="min-h-screen w-full bg-theme-bg1 dark:bg-background font-poppins relative py-12 md:py-24 px-4 flex items-center justify-center overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 -z-10 pointer-events-none">
        <img src="/assets/images/shape1.svg" alt="" className="dark:hidden" />
        <img src="/assets/images/dark_shape.svg" alt="" className="hidden dark:block" />
      </div>
      <div className="absolute top-0 right-5 -z-10 pointer-events-none">
        <img src="/assets/images/shape2.svg" alt="" className="dark:hidden" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="hidden dark:block opacity-60" />
      </div>
      <div className="absolute bottom-0 right-12 md:right-80 -z-10 pointer-events-none">
        <img src="/assets/images/shape3.svg" alt="" className="dark:hidden" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="hidden dark:block opacity-60" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Illustration */}
          <div className="lg:col-span-8 flex justify-center items-center">
            <img
              src="/assets/images/registration.png"
              alt="Registration Illustration"
              className="dark:hidden max-w-full h-auto object-contain max-h-[550px]"
            />
            <img
              src="/assets/images/registration1.png"
              alt="Registration Illustration Dark"
              className="hidden dark:block max-w-full h-auto object-contain max-h-[550px]"
            />
          </div>

          {/* Right Registration Form */}
          <div className="lg:col-span-4 w-full">
            <SignUpCard
              form={form}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
