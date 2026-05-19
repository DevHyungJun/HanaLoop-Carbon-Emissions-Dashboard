import { DashboardShell } from "@/app/components/layout";
import { ReactNode } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
