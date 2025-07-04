import PageMeta from '@/components/common/PageMeta';
import AuthLayout from './AuthLayout';
import SignInForm from '@/components/auth/SignInForm';

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Iniciar sesión | Control de Inventario y Ventas para Negocios - AISAKVELIZ"
        description="Accede a tu cuenta y gestiona inventario, ventas y reportes en tiempo real. Plataforma simple, segura y diseñada para pequeños negocios."
        ogTitle="Accede a tu sistema de inventario y ventas"
        ogDescription="Gestiona productos, controla ventas y lleva reportes en una plataforma intuitiva para emprendedores y comercios pequeños."
        ogImage="/images/meta/login-preview.png"
        ogUrl="https://tusitio.com/login"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
