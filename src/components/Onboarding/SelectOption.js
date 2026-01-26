"use client"

export default function SelectionOption({ label, selected, onClick, icon }) {
  return (
    <div
      className="flex items-center justify-between bg-white w-full p-3 rounded-lg transition cursor-pointer"
      onClick={onClick}
    >
      {/* Icon + Label */}
      <div className="flex items-center space-x-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="text-regular font-16">{label}</span>
      </div>

      {/* Checkbox */}
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
          selected ? "bg-[#0D9488] border-[#0D9488] text-white" : "border-gray-300 bg-transparent"
        }`}
      >
        {selected && <span className="text-white text-sm">✓</span>}
      </div>
    </div>
  )
}

