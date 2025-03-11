import React from "react";
import { Button } from "@/components/ui/button";

interface ButtonCustomProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function ButtonCustom({
  loading,
  children,
  ...props
}: ButtonCustomProps) {
  return (
    <Button {...props}>{loading ? "در حال بارگذاری..." : children}</Button>
  );
}
