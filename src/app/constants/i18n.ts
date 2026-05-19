export type Locale = "ko" | "en";

export type Theme = "light" | "dark";

export type MessageKey =
  | "app.description"
  | "common.explore"
  | "common.openMenu"
  | "common.closeMenu"
  | "nav.sections.overview"
  | "nav.sections.analysis"
  | "nav.sections.data"
  | "nav.sections.settings"
  | "nav.platformOverview"
  | "nav.platformOverviewDesc"
  | "nav.pcf"
  | "nav.pcfDesc"
  | "nav.companies"
  | "nav.companiesDesc"
  | "nav.activityData"
  | "nav.activityDataDesc"
  | "nav.emissionFactors"
  | "nav.emissionFactorsDesc"
  | "nav.settings"
  | "nav.settingsDesc"
  | "settings.title"
  | "settings.darkMode"
  | "settings.language"
  | "settings.themeLight"
  | "settings.themeDark"
  | "settings.localeKo"
  | "settings.localeEn";

type Messages = Record<MessageKey, string>;

const ko: Messages = {
  "app.description": "탄소 배출량 모니터링 및 분석",
  "common.explore": "탐색",
  "common.openMenu": "메뉴 열기",
  "common.closeMenu": "메뉴 닫기",
  "nav.sections.overview": "개요",
  "nav.sections.analysis": "분석",
  "nav.sections.data": "데이터",
  "nav.sections.settings": "설정",
  "nav.platformOverview": "플랫폼 소개",
  "nav.platformOverviewDesc":
    "PCF 개념과 대시보드 사용 방법을 안내합니다.",
  "nav.pcf": "PCF 계산",
  "nav.pcfDesc": "제품별 탄소 발자국 결과와 KPI·차트를 확인합니다.",
  "nav.companies": "회사",
  "nav.companiesDesc": "조직별 배출 현황과 계열사 비교를 제공합니다.",
  "nav.activityData": "활동 데이터",
  "nav.activityDataDesc":
    "원자재, 전기, 운송 등 활동량 입력 데이터를 관리합니다.",
  "nav.emissionFactors": "배출 계수",
  "nav.emissionFactorsDesc":
    "활동 데이터를 tCO2e로 변환하는 배출 계수를 조회합니다.",
  "nav.settings": "설정",
  "nav.settingsDesc": "다크 모드와 언어 설정을 변경합니다.",
  "settings.title": "설정",
  "settings.darkMode": "다크 모드",
  "settings.language": "언어",
  "settings.themeLight": "라이트",
  "settings.themeDark": "다크",
  "settings.localeKo": "한국어",
  "settings.localeEn": "English",
};

const en: Messages = {
  "app.description": "Carbon emissions monitoring and analysis",
  "common.explore": "Explore",
  "common.openMenu": "Open menu",
  "common.closeMenu": "Close menu",
  "nav.sections.overview": "Overview",
  "nav.sections.analysis": "Analysis",
  "nav.sections.data": "Data",
  "nav.sections.settings": "Settings",
  "nav.platformOverview": "Platform Overview",
  "nav.platformOverviewDesc":
    "Learn about PCF concepts and how to use the dashboard.",
  "nav.pcf": "PCF Calculation",
  "nav.pcfDesc":
    "View product carbon footprint results, KPIs, and charts.",
  "nav.companies": "Companies",
  "nav.companiesDesc":
    "Compare emissions across organizations and subsidiaries.",
  "nav.activityData": "Activity Data",
  "nav.activityDataDesc":
    "Manage activity input data such as materials, electricity, and transport.",
  "nav.emissionFactors": "Emission Factors",
  "nav.emissionFactorsDesc":
    "Browse emission factors used to convert activity data to tCO2e.",
  "nav.settings": "Settings",
  "nav.settingsDesc": "Change dark mode and language preferences.",
  "settings.title": "Settings",
  "settings.darkMode": "Dark mode",
  "settings.language": "Language",
  "settings.themeLight": "Light",
  "settings.themeDark": "Dark",
  "settings.localeKo": "Korean",
  "settings.localeEn": "English",
};

export const MESSAGES: Record<Locale, Messages> = {
  ko,
  en,
};

export const getMessage = (locale: Locale, key: MessageKey) => {
  return MESSAGES[locale][key];
};
