import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto px-4 py-8">{children}</div>;
};
