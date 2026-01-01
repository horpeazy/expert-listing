import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Expert Listing",
  description: "Sign in to your Expert Listing account",
};

export default function LoginPage() {
  return <LoginForm />;
}

