'use client'

interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit?: string
  units?: { value: string; label: string }[]
  onUnitChange?: (unit: string) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  helpText?: string
}

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  units,
  onUnitChange,
  min,
  max,
  step = 1,
  placeholder,
  helpText,
}: NumberInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
        {units && units.length > 0 ? (
          <select
            value={unit}
            onChange={(e) => onUnitChange?.(e.target.value)}
            aria-label={`${label} unit`}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
          >
            {units.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        ) : unit ? (
          <span className="px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-600">
            {unit}
          </span>
        ) : null}
      </div>
      {helpText && (
        <p className="text-sm text-neutral-500">{helpText}</p>
      )}
    </div>
  )
}
