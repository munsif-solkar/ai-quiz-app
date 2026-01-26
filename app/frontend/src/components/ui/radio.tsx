import React from "react"

interface RadioOption {
  id: string
  label: string
  value: string
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  selectedValue?: string
  onChange: (value: string) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <ul className="flex flex-col sm:flex-row gap-2">
      {options.map((option, idx) => (
        <li
          key={option.id}
          className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg cursor-pointer"
        >
          <div className="relative flex items-start w-full">
            <div className="flex items-center h-5">
              <input
                id={option.id}
                name={name}
                type="radio"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                className="border-gray-200 rounded-full disabled:opacity-50"
              />
            </div>
            <label htmlFor={option.id} className="ms-3 block w-full text-sm text-gray-600">
              {option.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}
