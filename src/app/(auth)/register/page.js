import RegisterForm from "@/components/auth/register-form";

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = params?.next || "/";

  return <RegisterForm nextPath={nextPath} />;
}
