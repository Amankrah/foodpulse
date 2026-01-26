interface ResultCardProps {
  label: string
  value: string | number
  unit?: string
  highlight?: boolean
  subtext?: string
}

export function ResultCard({
  label,
  value,
  unit,
  highlight = false,
  subtext,
}: ResultCardProps) {
  return (
    <div
      className={`p-4 rounded-xl ${
        highlight
          ? 'bg-green-50 border-2 border-green-200'
          : 'bg-neutral-50 border border-neutral-200'
      }`}
    >
      <p className="text-sm text-neutral-600 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold ${
          highlight ? 'text-green-700' : 'text-neutral-900'
        }`}
      >
        {value}
        {unit && <span className="text-lg font-normal ml-1">{unit}</span>}
      </p>
      {subtext && (
        <p className="text-sm text-neutral-500 mt-1">{subtext}</p>
      )}
    </div>
  )
}
