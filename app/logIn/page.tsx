import { SignIn } from "@stackframe/stack";

export default function LogIn() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className=" text-xl font-bold text-center mt-10 mb-[-150]">
        Please Sign In or Sign Up to Continue
      </h1>
      <SignIn fullPage />
    </div>
  );
}
