import { AuthLayout } from "@/components/auth/auth-layout";
import ForgotPasswordForm from "@/components/auth/reset-password-form";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </div>
  );
}
