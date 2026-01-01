import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Expert Listing",
  description: "Create your Expert Listing account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

