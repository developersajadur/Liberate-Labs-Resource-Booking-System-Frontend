"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Toaster richColors={true} position="top-right" />
        {children}
      </ThemeProvider>
  );
};

export default Providers;
