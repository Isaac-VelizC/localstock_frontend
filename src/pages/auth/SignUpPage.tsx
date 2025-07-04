import PageMeta from '@/components/common/PageMeta';
import AuthLayout from './AuthLayout';
import SignUpForm from '@/components/auth/SignUpFrom';

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Crear cuenta | Plataforma de Inventario y Ventas para Negocios - AISAKVELIZ"
        description="Regístrate gratis en nuestra plataforma y empieza a gestionar inventario, ventas, productos y reportes en segundos. Ideal para tiendas pequeñas y emprendedores."
        ogTitle="Crea tu cuenta gratis y gestiona tu negocio fácilmente"
        ogDescription="Digitaliza tu tienda o emprendimiento: controla inventario y ventas con una herramienta pensada para pequeños negocios."
        ogImage="/images/meta/signup-preview.png"
        ogUrl="https://tusitio.com/signup"
      />

      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
