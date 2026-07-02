import { useFormContext } from 'react-hook-form';

// ─── Select ───────────────────────────────────────────────────────────────────
export const Select = ({ name, inputOptions, options, placeholder, className = '' }) => {
  const { register } = useFormContext();

  return (
    <div className="select">
      <select
        {...register(name, inputOptions)}
        className={`rounded-lg ${className}`}
        defaultValue=""
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
};

// ─── Radio ────────────────────────────────────────────────────────────────────
export const Radio = ({ name, inputOptions, options, optCols = 1, className = '' }) => {
  const { register } = useFormContext();

  return (
    <div className="radio">
      <fieldset
        className="w-full grid gap-4"
        style={{ gridTemplateColumns: `repeat(${optCols}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-stretch">
            <input
              {...register(name, inputOptions)}
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
            />
            <label htmlFor={`${name}-${opt.value}`} className={className}>
              {opt.label}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

// ─── Checkbox ─────────────────────────────────────────────────────────────────
export const Checkbox = ({ name, inputOptions, options, optCols = 1, className = '' }) => {
  const { register } = useFormContext();

  return (
    <div className="checkbox">
      <fieldset
        className="w-full grid gap-4"
        style={{ gridTemplateColumns: `repeat(${optCols}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-4">
            <input
              {...register(name, inputOptions)}
              type="checkbox"
              id={`${name}-${opt.value}`}
              value={opt.value}
              className="!w-6 !h-6 cursor-pointer"
            />
            <label htmlFor={`${name}-${opt.value}`} className={`cursor-pointer ${className}`}>
              {opt.label}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};
