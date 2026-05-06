type NumberControlProps = {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  fractionDigits?: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function NumberControl({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
  fractionDigits = 1,
}: NumberControlProps) {
  const formattedValue = value.toFixed(fractionDigits);

  const updateValue = (nextValue: number) => {
    if (!Number.isFinite(nextValue)) {
      return;
    }

    onChange(clamp(nextValue, min, max));
  };

  return (
    <label className="number-control">
      <span className="number-control__label">{label}</span>
      <span className="number-control__row">
        <button
          className="number-control__button"
          type="button"
          aria-label={`Уменьшить ${label}`}
          onClick={() => updateValue(value - step)}
        >
          -
        </button>
        <input
          className="number-control__input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={formattedValue}
          onChange={(event) => updateValue(Number(event.target.value))}
        />
        <span className="number-control__unit">{unit}</span>
        <button
          className="number-control__button"
          type="button"
          aria-label={`Увеличить ${label}`}
          onClick={() => updateValue(value + step)}
        >
          +
        </button>
      </span>
    </label>
  );
}
