'use client'

interface SelectOption {
  value: string
  label: string
  description?: string
}

interface SelectInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  helpText?: string
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  helpText,
}: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p className="text-sm text-neutral-500">{helpText}</p>
      )}
    </div>
  )
}
