import LoginForm from "@/components/auth/login-form";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = params?.next || "/";

  return <LoginForm nextPath={nextPath} />;
}
