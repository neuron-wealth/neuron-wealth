import { KeyRound } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import RecoveryRequest from "../../components/auth/RecoveryRequest";
import { requestPasswordReset } from "../../services/authService";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <RecoveryRequest
        icon={KeyRound}
        title="Forgot Password"
        description="Your password can only be reset through a secure link emailed to the registered recovery inbox."
        steps={[
          "Send a reset link to the registered recovery inbox.",
          "Open the email and select Reset Password.",
          "Choose a new password. All existing sessions are signed out.",
        ]}
        actionLabel="Send Password Reset Link"
        onRequest={requestPasswordReset}
      />
    </AuthLayout>
  );
}
