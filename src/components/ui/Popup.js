import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Popup({ isOpen, onClose, title, children }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div ref={popupRef} className="bg-white p-12 rounded-lg shadow-lg w-80 relative border border-orange">
        <button className="absolute top-2 right-2 text-orange" onClick={onClose}>
          <X size={24} />
        </button>
        {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}

        {/* Dynamic Content */}
        {children}
      </div>
    </div>
  );
}
