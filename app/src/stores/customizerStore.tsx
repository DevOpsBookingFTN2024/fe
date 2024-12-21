import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface StateType {
  activeDir?: string | any;
  activeMode?: string; // This can be light or dark
  activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  isLayout?: string;
  isSidebarHover?: boolean;
  isMobileSidebar?: boolean;
  isHorizontal?: boolean;
  isLanguage?: string;
  isCardShadow?: boolean;
  borderRadius?: number | any;
  setDarkMode: (mode: string) => void;
  setLanguage: (language: string) => void;
  toggleSidebar: () => void;
  hoverSidebar: (value: boolean) => void;
  toggleMobileSidebar: () => void;
  toggleLayout: (layout: string) => void;
}

export const useCustomizerStore = create<StateType>()(
    persist(
        (set) => ({
          activeDir: "ltr",
          activeMode: localStorage.getItem("my_benefit_theme") ?? "light",
          activeTheme: "ORANGE_THEME",
          SidebarWidth: 270,
          MiniSidebarWidth: 87,
          TopbarHeight: 70,
          isLayout: "full",
          isCollapse: false,
          isSidebarHover: false,
          isMobileSidebar: false,
          isHorizontal: false,
          isLanguage: localStorage.getItem("my_benefit_lang") ?? "en",
          isCardShadow: true,
          borderRadius: 7,
          setDarkMode: (mode: string) => {
            localStorage.setItem("my_benefit_theme", mode);
            set(() => ({activeMode: mode}));
          },
          setLanguage: (language: string) => {
            localStorage.setItem("my_benefit_lang", language);
            set(() => ({isLanguage: language}));
          },
          toggleSidebar: () => set((state) => ({isCollapse: !state.isCollapse})),
          hoverSidebar: (value: boolean) => set(() => ({isSidebarHover: value})),
          toggleMobileSidebar: () =>
              set((state) => ({isMobileSidebar: !state.isMobileSidebar})),
          toggleLayout: (layout: string) => set(() => ({isLayout: layout})),
        }),
        {name: "customizer-storage"}
    )
);
