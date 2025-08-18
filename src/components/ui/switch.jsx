// components/Switch.jsx
import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export function Switch({ checked, onChange, label }) {
  return (
    <div className="flex items-center space-x-3">
      <SwitchPrimitive.Root
        className={`w-11 h-6 bg-gray-200 rounded-full relative 
                    data-[state=checked]:bg-blue-500 transition-colors duration-200`}
        checked={checked}
        onCheckedChange={onChange}
      >
        <SwitchPrimitive.Thumb
          className="block w-5 h-5 bg-white rounded-full shadow-md
                     transform transition-transform duration-200
                     data-[state=checked]:translate-x-5"
        />
      </SwitchPrimitive.Root>
      {label && <span className="text-gray-800 font-medium">{label}</span>}
    </div>
  );
}
