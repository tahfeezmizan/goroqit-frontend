import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/auth/sing-up-form";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </div>
  );
}
