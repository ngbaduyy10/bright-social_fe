import CommonButton from "@/components/atoms/CommonButton";
import LoginForm from "@/components/organisms/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen flex-center bg-background">
      <div className="flex grid grid-cols-1 md:grid-cols-2 rounded-[30px] m-4 shadow-xl w-full md:max-w-[900px] bg-white">
        <div className="hidden md:block bg-primary p-8 rounded-l-[30px] rounded-r-[100px]">
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-white mb-4 font-bold text-3xl">Welcome to Bright!</h1>
            <p className="text-md text-white">To keep connected with us please sign in with your personal info.</p>
            <p className="text-md text-white mb-4">Don&apos;t have an account. Please create one.</p>
            <CommonButton 
              href="/register"
              className="border border-white bg-primary text-white hover:bg-white hover:text-primary"
            >
              Sign Up
            </CommonButton>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-8 rounded-[30px]">
          <h1 className="font-bold text-3xl">Sign In</h1>
          <p className="text-md text-muted-foreground mb-4">Please sign in with your personal info.</p>
          <LoginForm />
          <p className="text-sm text-muted-foreground mt-2 cursor-pointer hover:text-primary">Forgot password?</p>
        </div>
      </div>
    </div>
  )
}