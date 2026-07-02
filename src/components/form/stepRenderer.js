import Link from 'next/link';
import { info } from '@info';
import { Checkbox, Radio, Select } from '@/components/form/formAtoms';
import { restrictNumber } from '@/utils/formValidators';
import { useFormContext } from 'react-hook-form';

export default function StepRenderer({ step, index, currentStep, errors }) {
  const { register } = useFormContext();

  if (index !== currentStep) return null;

  const commonText = (
    <div className="mb-8">
      <p className="ft-4 font-bold" dangerouslySetInnerHTML={{ __html: step.title }} />
      {step.description && (
        <p className="ft-2 mt-4 text-neutral-600" dangerouslySetInnerHTML={{ __html: step.description }} />
      )}
    </div>
  );

  switch (step.type) {
    case 'text':
    case 'tel':
    case 'number':
      return (
        <div className="flex-grow">
          {commonText}
          <input
            {...register(step.name, step.inputOptions)}
            type={step.type}
            placeholder={step.placeholder}
            onKeyDown={step.type !== 'text' ? restrictNumber : undefined}
            className={errors[step.name]?.message ? '!border-brand-3 mt-8' : 'mt-8'}
          />
          {errors[step.name]?.message && (
            <p className="-ft-2 mt-2 text-brand-3 font-medium">{errors[step.name].message}</p>
          )}
        </div>
      );

    case 'textarea':
      return (
        <div className="flex-grow">
          {commonText}
          <textarea
            {...register(step.name, step.inputOptions)}
            placeholder={step.placeholder}
            rows={step.rows || 4}
            className={errors[step.name]?.message ? '!border-brand-3 mt-8' : 'mt-8'}
          />
        </div>
      );

    case 'radio':
      return (
        <div className="flex flex-col">
          {commonText}
          <Radio
            name={step.name}
            inputOptions={step.inputOptions}
            options={step.options}
            optCols={step.cols}
            className={errors[step.name]?.message ? '!border-brand-3' : undefined}
          />
          {errors[step.name]?.message && (
            <p className="-ft-2 mt-2 text-brand-3 font-medium">{errors[step.name].message}</p>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex flex-col">
          {commonText}
          <Checkbox
            name={step.name}
            inputOptions={step.inputOptions}
            options={step.options}
            optCols={step.cols}
          />
        </div>
      );

    case 'select':
      return (
        <div className="flex flex-col">
          {commonText}
          <Select
            name={step.name}
            inputOptions={step.inputOptions}
            placeholder={step.placeholder}
            options={step.options}
            className={errors[step.name]?.message ? '!border-brand-3' : undefined}
          />
        </div>
      );

    case 'opt-in':
      return (
        <div className="flex flex-col gap-6 bg-brand-1/5 border border-brand-1/20 p-8 rounded-3xl">
          <div>
            <p className="ft-4 font-bold text-brand-1" dangerouslySetInnerHTML={{ __html: step.title }} />
            {step.description && (
              <p className="ft-2 mt-3 text-brand-4" dangerouslySetInnerHTML={{ __html: step.description }} />
            )}
          </div>

          {step.fields.map((field) => (
            <div key={field.name}>
              <input
                type={field.type}
                {...register(field.name, field.inputOptions)}
                placeholder={field.title}
                onKeyDown={field.type === 'tel' ? restrictNumber : undefined}
                className={errors[field.name]?.message ? '!border-brand-3' : ''}
              />
              {errors[field.name]?.message && (
                <p className="-ft-2 mt-1 text-brand-3 font-medium">{errors[field.name].message}</p>
              )}
            </div>
          ))}

          <p className="-ft-3 text-center text-neutral-500">
            Tus datos no serán compartidos. Al continuar aceptas nuestra&nbsp;
            <Link href={info.privacyNotice}>
              <a className="underline hover:text-brand-1">política de privacidad</a>
            </Link>.
          </p>
        </div>
      );

    case 'checkpoint':
      return step.render ? step.render() : null;

    default:
      return null;
  }
}
