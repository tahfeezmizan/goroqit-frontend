import { AuthLayout } from "@/components/auth/auth-layout";
import SetNewPasswordForm from "@/components/auth/forgot-password-form";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SetNewPasswordForm />
      </AuthLayout>
    </div>
  );
}
