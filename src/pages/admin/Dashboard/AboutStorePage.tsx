import Input from '@/components/custom/form/input/InputField';
import Label from '@/components/custom/form/Label';
import Select from '@/components/custom/form/Select';
import { type RegisterStoreUser } from '@/schema/AuthSchema';
import { COUNTRIESPHONEDATA, CURRENCIES, RUBROSDATA } from '@/services/datas';
import { useFormContext } from 'react-hook-form';

export default function AboutStorePage() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterStoreUser>();

  return (
    <>
      {/* Encabezado */}
      <div className="mb-6 text-center">
        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          ¡Bienvenido a tu nueva tienda!
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Completa la información inicial para comenzar a trabajar con tu
          negocio en nuestra plataforma.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Nombre del negocio */}
        <div className="sm:col-span-2">
          <Label htmlFor="storeName" required>
            Nombre del negocio
          </Label>
          <Input
            id="storeName"
            type="text"
            placeholder="Ej. Zapatería El Paso"
            {...register('name_store')}
            error={!!errors.name_store}
            hint={errors.name_store?.message}
            required
          />
        </div>

        {/* Rubro */}
        <div className="sm:col-span-2">
          <Label htmlFor="rubro" required>
            Rubro del negocio
          </Label>
          <Select
            id="rubro"
            options={RUBROSDATA.map((r) => ({
              value: r.code,
              label: r.label,
            }))}
            {...register('rubro', { valueAsNumber: true })}
            error={!!errors.rubro}
            hint={errors.rubro?.message}
            required
          />
        </div>

        {/* Responsable */}
        <div>
          <Label htmlFor="ownerName" required>
            Nombre del responsable
          </Label>
          <Input
            id="ownerName"
            type="text"
            placeholder="Ej. Juan Pérez"
            {...register('name')}
            error={!!errors.name}
            hint={errors.name?.message}
            required
          />
        </div>

        {/* Apellido */}
        <div>
          <Label htmlFor="city">Apellidos (Opcional)</Label>
          <Input
            id="city"
            type="text"
            placeholder="Ej. Rodriguez Mendoza"
            {...register('surnames')}
            error={!!errors.surnames}
            hint={errors.surnames?.message}
            required
          />
        </div>

        {/* País */}
        <div>
          <Label htmlFor="country" required>
            País
          </Label>
          <Select
            id="country"
            options={COUNTRIESPHONEDATA.map((c) => ({
              value: c.code, // "+591"
              label: `${c.name} (${c.label})`,
            }))}
            {...register('country')}
            error={!!errors.country}
            hint={errors.country?.message}
          />
        </div>

        {/* Teléfono */}
        <div>
          <Label htmlFor="phone" required>
            Teléfono
          </Label>
          <Input
            id="phone"
            type="text"
            placeholder="Ej. +591 71234567"
            {...register('phone')}
            error={!!errors.phone}
            hint={errors.phone?.message}
            required
          />
        </div>

        {/* Moneda */}
        <div>
          <Label htmlFor="currency" required>
            Moneda
          </Label>
          <Select
            id="currency"
            options={CURRENCIES}
            {...register('currency')}
            error={!!errors.currency}
            hint={errors.currency?.message}
          />
        </div>
      </div>
    </>
  );
}
