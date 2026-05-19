import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Calculator,
  Database,
  FlaskConical,
} from "lucide-react";

export type NavSectionId = "overview" | "analysis" | "data";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  section: NavSectionId;
};

export const NAV_SECTIONS: { id: NavSectionId; label: string }[] = [
  { id: "overview", label: "개요" },
  { id: "analysis", label: "분석" },
  { id: "data", label: "데이터" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "플랫폼 소개",
    description: "PCF 개념과 대시보드 사용 방법을 안내합니다.",
    icon: BookOpen,
    section: "overview",
  },
  {
    href: "/pcf",
    label: "PCF 계산",
    description: "제품별 탄소 발자국 결과와 KPI·차트를 확인합니다.",
    icon: Calculator,
    section: "analysis",
  },
  {
    href: "/companies",
    label: "회사",
    description: "조직별 배출 현황과 계열사 비교를 제공합니다.",
    icon: Building2,
    section: "analysis",
  },
  {
    href: "/activity-data",
    label: "활동 데이터",
    description: "원자재, 전기, 운송 등 활동량 입력 데이터를 관리합니다.",
    icon: Database,
    section: "data",
  },
  {
    href: "/emission-factors",
    label: "배출 계수",
    description: "활동 데이터를 tCO2e로 변환하는 배출 계수를 조회합니다.",
    icon: FlaskConical,
    section: "data",
  },
];

export const getNavItemByPathname = (pathname: string) => {
  return (
    NAV_ITEMS.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? NAV_ITEMS[0]
  );
};
