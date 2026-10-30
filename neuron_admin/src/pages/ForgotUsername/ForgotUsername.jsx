import { AtSign } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import RecoveryRequest from "../../components/auth/RecoveryRequest";
import { requestUsernameReminder } from "../../services/authService";

export default function ForgotUsername() {
  return (
    <AuthLayout>
      <RecoveryRequest
        icon={AtSign}
        title="Forgot Username"
        description="Your current username and a secure link to change it are emailed to the registered recovery inbox."
        steps={[
          "Send a username reminder to the registered recovery inbox.",
          "The email shows your current username.",
          "To change it, select Change Username in the email.",
        ]}
        actionLabel="Send Username Reminder"
        onRequest={requestUsernameReminder}
      />
    </AuthLayout>
  );
}
