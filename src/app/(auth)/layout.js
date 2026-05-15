import AuthPageTransition from "@/components/auth/auth-page-transition";

export default function AuthLayout({ children }) {
  return <AuthPageTransition>{children}</AuthPageTransition>;
}
