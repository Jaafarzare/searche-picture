import React from "react";
import { Input } from "@/components/ui/input";

interface InputCustomProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}

export default function InputCustom({
  label,
  error,
  ...props
}: InputCustomProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-medium">{label}</label>}
      <Input {...props} />
      {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
    </div>
  );
}
