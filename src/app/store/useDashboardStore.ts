import { create } from "zustand";
import { persist } from "zustand/middleware";

type DashboardState = {
  isDrawerOpen: boolean;
  isSidebarCollapsed: boolean;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      isDrawerOpen: false,
      isSidebarCollapsed: false,
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      toggleSidebarCollapsed: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: "hana-loop-dashboard",
      partialize: (state) => ({ isSidebarCollapsed: state.isSidebarCollapsed }),
    },
  ),
);
