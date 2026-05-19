export type Locale = "ko" | "en";

export type Theme = "light" | "dark";

export type MessageKey =
  | "app.description"
  | "common.explore"
  | "common.openMenu"
  | "common.closeMenu"
  | "common.collapseSidebar"
  | "common.expandSidebar"
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
  | "settings.localeEn"
  | "country.KR"
  | "country.US"
  | "country.JP"
  | "country.DE"
  | "country.CN"
  | "overview.hero.badge"
  | "overview.hero.title"
  | "overview.hero.subtitle"
  | "overview.hero.imageAlt"
  | "overview.pcf.title"
  | "overview.pcf.description"
  | "overview.scope.title"
  | "overview.scope1.title"
  | "overview.scope1.description"
  | "overview.scope2.title"
  | "overview.scope2.description"
  | "overview.scope3.title"
  | "overview.scope3.description"
  | "overview.workflow.title"
  | "overview.workflow.step1.title"
  | "overview.workflow.step1.description"
  | "overview.workflow.step2.title"
  | "overview.workflow.step2.description"
  | "overview.workflow.step3.title"
  | "overview.workflow.step3.description"
  | "overview.unit.title"
  | "overview.unit.description"
  | "overview.quickLinks.title"
  | "pcf.toolbar.company"
  | "pcf.toolbar.country"
  | "pcf.toolbar.noCompany"
  | "pcf.toolbar.period"
  | "pcf.toolbar.refresh"
  | "pcf.loading"
  | "pcf.error"
  | "pcf.kpi.total"
  | "pcf.kpi.totalDesc"
  | "pcf.kpi.monthlyAvg"
  | "pcf.kpi.monthlyAvgDesc"
  | "pcf.kpi.topSource"
  | "pcf.kpi.topSourceDesc"
  | "pcf.kpi.monthOverMonth"
  | "pcf.kpi.monthOverMonthDesc"
  | "pcf.chart.monthlyTrend"
  | "pcf.chart.monthlyTrendDesc"
  | "pcf.chart.scopeBreakdown"
  | "pcf.chart.scopeBreakdownDesc"
  | "pcf.chart.sourceBreakdown"
  | "pcf.chart.sourceBreakdownDesc"
  | "pcf.chart.total"
  | "pcf.scope.scope1"
  | "pcf.scope.scope2"
  | "pcf.scope.scope3"
  | "pcf.source.gasoline"
  | "pcf.source.diesel"
  | "pcf.source.lpg"
  | "pcf.source.naturalGas"
  | "pcf.source.electricity"
  | "pcf.post.title"
  | "pcf.post.description"
  | "pcf.post.empty"
  | "pcf.post.add"
  | "pcf.post.edit"
  | "pcf.post.delete"
  | "pcf.post.save"
  | "pcf.post.cancel"
  | "pcf.post.fieldTitle"
  | "pcf.post.fieldMonth"
  | "pcf.post.fieldContent"
  | "pcf.post.readMore"
  | "pcf.post.readLess"
  | "pcf.post.charCount"
  | "pcf.post.saveSuccess"
  | "pcf.post.saveError"
  | "pcf.post.deleteSuccess"
  | "pcf.post.deleteError"
  | "pcf.unit"
  | "companies.toolbar.country"
  | "companies.toolbar.allCountries"
  | "companies.toolbar.period"
  | "companies.toolbar.refresh"
  | "companies.loading"
  | "companies.error"
  | "companies.kpi.companyCount"
  | "companies.kpi.companyCountDesc"
  | "companies.kpi.totalEmissions"
  | "companies.kpi.totalEmissionsDesc"
  | "companies.kpi.avgPerCompany"
  | "companies.kpi.avgPerCompanyDesc"
  | "companies.kpi.topCountry"
  | "companies.kpi.topCountryDesc"
  | "companies.chart.countryComparison"
  | "companies.chart.countryComparisonDesc"
  | "companies.chart.companyComparison"
  | "companies.chart.companyComparisonDesc"
  | "companies.table.title"
  | "companies.table.description"
  | "companies.table.company"
  | "companies.table.country"
  | "companies.table.total"
  | "companies.table.monthlyAvg"
  | "companies.table.empty"
  | "companies.detail.title"
  | "companies.detail.viewPcf"
  | "companies.detail.selectHint"
  | "companies.chart.emissions"
  | "companies.pagination.previous"
  | "companies.pagination.next"
  | "companies.pagination.summary"
  | "activityData.toolbar.company"
  | "activityData.toolbar.country"
  | "activityData.toolbar.noCompany"
  | "activityData.toolbar.month"
  | "activityData.toolbar.source"
  | "activityData.toolbar.allMonths"
  | "activityData.toolbar.selectMonth"
  | "activityData.toolbar.allSources"
  | "activityData.toolbar.period"
  | "activityData.toolbar.refresh"
  | "activityData.monthPicker.title"
  | "activityData.monthPicker.year"
  | "activityData.monthPicker.month"
  | "activityData.monthPicker.apply"
  | "activityData.loading"
  | "activityData.error"
  | "activityData.kpi.recordCount"
  | "activityData.kpi.recordCountDesc"
  | "activityData.kpi.totalEmissions"
  | "activityData.kpi.totalEmissionsDesc"
  | "activityData.kpi.sourceCount"
  | "activityData.kpi.sourceCountDesc"
  | "activityData.kpi.monthlyAvg"
  | "activityData.kpi.monthlyAvgDesc"
  | "activityData.table.title"
  | "activityData.table.description"
  | "activityData.table.month"
  | "activityData.table.source"
  | "activityData.table.scope"
  | "activityData.table.emissions"
  | "activityData.table.empty"
  | "activityData.pagination.previous"
  | "activityData.pagination.next"
  | "activityData.pagination.summary"
  | "emissionFactors.toolbar.scope"
  | "emissionFactors.toolbar.source"
  | "emissionFactors.toolbar.allScopes"
  | "emissionFactors.toolbar.allSources"
  | "emissionFactors.toolbar.formula"
  | "emissionFactors.toolbar.refresh"
  | "emissionFactors.loading"
  | "emissionFactors.error"
  | "emissionFactors.kpi.totalCount"
  | "emissionFactors.kpi.totalCountDesc"
  | "emissionFactors.kpi.scope1Count"
  | "emissionFactors.kpi.scope1CountDesc"
  | "emissionFactors.kpi.scope2Count"
  | "emissionFactors.kpi.scope2CountDesc"
  | "emissionFactors.kpi.latestUpdate"
  | "emissionFactors.kpi.latestUpdateDesc"
  | "emissionFactors.table.title"
  | "emissionFactors.table.description"
  | "emissionFactors.table.source"
  | "emissionFactors.table.scope"
  | "emissionFactors.table.region"
  | "emissionFactors.table.unit"
  | "emissionFactors.table.factor"
  | "emissionFactors.table.standard"
  | "emissionFactors.table.formula"
  | "emissionFactors.table.empty"
  | "emissionFactors.chart.scopeDistribution"
  | "emissionFactors.chart.scopeDistributionDesc"
  | "emissionFactors.chart.electricityComparison"
  | "emissionFactors.chart.electricityComparisonDesc"
  | "emissionFactors.region.global"
  | "emissionFactors.unitLabel";

type Messages = Record<MessageKey, string>;

const ko: Messages = {
  "app.description": "탄소 배출량 모니터링 및 분석",
  "common.explore": "탐색",
  "common.openMenu": "메뉴 열기",
  "common.closeMenu": "메뉴 닫기",
  "common.collapseSidebar": "사이드바 접기",
  "common.expandSidebar": "사이드바 펼치기",
  "nav.sections.overview": "개요",
  "nav.sections.analysis": "분석",
  "nav.sections.data": "데이터",
  "nav.sections.settings": "설정",
  "nav.platformOverview": "플랫폼 소개",
  "nav.platformOverviewDesc": "PCF 개념과 대시보드 사용 방법을 안내합니다.",
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
  "country.KR": "대한민국",
  "country.US": "미국",
  "country.JP": "일본",
  "country.DE": "독일",
  "country.CN": "중국",
  "overview.hero.badge": "HanaLoop Platform",
  "overview.hero.title": "제품 탄소 발자국(PCF)을 한눈에 관리하세요",
  "overview.hero.subtitle":
    "HanaLoop은 원자재·전기·운송 등 활동 데이터를 입력하면 제품별 PCF를 자동 계산하는 탄소 관리 SaaS입니다. 경영진은 추세와 리스크를, 실무자는 입력·검증·감축 계획을 같은 플랫폼에서 수행합니다.",
  "overview.hero.imageAlt": "이끼 위에 놓인 지구본과 녹색 잎",
  "overview.pcf.title": "PCF(Product Carbon Footprint)란?",
  "overview.pcf.description":
    "PCF는 제품 하나가 원료 채취부터 생산, 유통, 사용, 폐기에 이르기까지 전 과정에서 발생하는 온실가스 배출량을 CO₂ 환산 톤(tCO2e)으로 표현한 지표입니다. 고객사·규제·공급망 요구에 대응하기 위한 핵심 탄소 회계 단위입니다.",
  "overview.scope.title": "GHG Protocol Scope 이해하기",
  "overview.scope1.title": "Scope 1 · 직접 배출",
  "overview.scope1.description":
    "회사가 직접 소유·통제하는 설비에서 발생하는 배출입니다. 공장 보일러, 회사 차량의 연료 연소(gasoline, diesel, lpg 등)가 대표적입니다.",
  "overview.scope2.title": "Scope 2 · 간접 배출(에너지)",
  "overview.scope2.description":
    "구매한 전기·열·증기 등 에너지 사용과 관련된 간접 배출입니다. electricity 사용량과 배출 계수를 곱해 산출합니다.",
  "overview.scope3.title": "Scope 3 · 기타 간접 배출",
  "overview.scope3.description":
    "공급망, 물류, 출장, 폐기물 처리 등 가치사슬 전반의 간접 배출입니다. PCF 전 과정 분석에서 비중이 커지는 영역입니다.",
  "overview.workflow.title": "대시보드 데이터 흐름",
  "overview.workflow.step1.title": "1. 활동 데이터 입력",
  "overview.workflow.step1.description":
    "월별·배출원별 활동량(연료 사용량, 전력 사용량 등)을 등록합니다.",
  "overview.workflow.step2.title": "2. 배출 계수 적용",
  "overview.workflow.step2.description":
    "활동 데이터에 배출 계수를 곱해 tCO2e로 환산합니다.",
  "overview.workflow.step3.title": "3. PCF 결과 확인",
  "overview.workflow.step3.description":
    "KPI·차트·회사별 비교로 배출 추세와 감축 포인트를 파악합니다.",
  "overview.unit.title": "tCO2e란?",
  "overview.unit.description":
    "tCO2e(CO₂ equivalent)는 메탄·아산화질소 등 다양한 온실가스를 CO₂ 기준으로 환산한 톤 단위입니다. 대시보드의 모든 배출량은 tCO2e로 통일해 표시합니다.",
  "overview.quickLinks.title": "바로가기",
  "pcf.toolbar.company": "회사",
  "pcf.toolbar.country": "국가",
  "pcf.toolbar.noCompany": "해당 국가에 회사 없음",
  "pcf.toolbar.period": "기간",
  "pcf.toolbar.refresh": "새로고침",
  "pcf.loading": "PCF 데이터를 불러오는 중입니다.",
  "pcf.error": "데이터를 불러오지 못했습니다. 다시 시도해 주세요.",
  "pcf.kpi.total": "총 PCF",
  "pcf.kpi.totalDesc": "선택 기간 누적 배출량",
  "pcf.kpi.monthlyAvg": "월평균",
  "pcf.kpi.monthlyAvgDesc": "월별 평균 tCO2e",
  "pcf.kpi.topSource": "주요 배출원",
  "pcf.kpi.topSourceDesc": "기간 내 최대 비중 배출원",
  "pcf.kpi.monthOverMonth": "전월 대비",
  "pcf.kpi.monthOverMonthDesc": "최근 월 대비 변화율",
  "pcf.chart.monthlyTrend": "월별 배출 추이",
  "pcf.chart.monthlyTrendDesc": "Scope별 월간 tCO2e 변화",
  "pcf.chart.scopeBreakdown": "Scope 구성",
  "pcf.chart.scopeBreakdownDesc": "GHG Protocol Scope별 비중",
  "pcf.chart.sourceBreakdown": "배출원별 배출량",
  "pcf.chart.sourceBreakdownDesc": "연료·전력 등 배출원별 tCO2e",
  "pcf.chart.total": "합계",
  "pcf.scope.scope1": "Scope 1",
  "pcf.scope.scope2": "Scope 2",
  "pcf.scope.scope3": "Scope 3",
  "pcf.source.gasoline": "휘발유",
  "pcf.source.diesel": "경유",
  "pcf.source.lpg": "LPG",
  "pcf.source.naturalGas": "천연가스",
  "pcf.source.electricity": "전력",
  "pcf.post.title": "감축 메모",
  "pcf.post.description": "감축 계획과 실행 메모를 기록합니다.",
  "pcf.post.empty": "등록된 감축 메모가 없습니다.",
  "pcf.post.add": "메모 추가",
  "pcf.post.edit": "수정",
  "pcf.post.delete": "삭제",
  "pcf.post.save": "저장",
  "pcf.post.cancel": "취소",
  "pcf.post.fieldTitle": "제목",
  "pcf.post.fieldMonth": "대상 월",
  "pcf.post.fieldContent": "내용",
  "pcf.post.readMore": "더보기",
  "pcf.post.readLess": "접기",
  "pcf.post.charCount": "{{current}}/{{max}}",
  "pcf.post.saveSuccess": "감축 메모가 저장되었습니다.",
  "pcf.post.saveError": "저장에 실패했습니다. 변경 사항을 되돌렸습니다.",
  "pcf.post.deleteSuccess": "감축 메모가 삭제되었습니다.",
  "pcf.post.deleteError": "삭제에 실패했습니다. 변경 사항을 되돌렸습니다.",
  "pcf.unit": "tCO2e",
  "companies.toolbar.country": "국가",
  "companies.toolbar.allCountries": "전체 국가",
  "companies.toolbar.period": "기간",
  "companies.toolbar.refresh": "새로고침",
  "companies.loading": "회사 데이터를 불러오는 중입니다.",
  "companies.error": "데이터를 불러오지 못했습니다. 다시 시도해 주세요.",
  "companies.kpi.companyCount": "회사 수",
  "companies.kpi.companyCountDesc": "선택 범위 내 조직 수",
  "companies.kpi.totalEmissions": "총 배출량",
  "companies.kpi.totalEmissionsDesc": "선택 기간 누적 tCO2e",
  "companies.kpi.avgPerCompany": "회사당 평균",
  "companies.kpi.avgPerCompanyDesc": "조직 1개당 평균 배출량",
  "companies.kpi.topCountry": "최대 배출 국가",
  "companies.kpi.topCountryDesc": "국가별 합산 기준 1위",
  "companies.chart.countryComparison": "국가별 배출 비교",
  "companies.chart.countryComparisonDesc": "국가 단위 tCO2e 합산",
  "companies.chart.companyComparison": "회사별 배출 비교",
  "companies.chart.companyComparisonDesc": "조직별 tCO2e 순위",
  "companies.table.title": "회사 목록",
  "companies.table.description": "배출량 순으로 정렬된 조직 목록입니다.",
  "companies.table.company": "회사",
  "companies.table.country": "국가",
  "companies.table.total": "총 배출량",
  "companies.table.monthlyAvg": "월평균",
  "companies.table.empty": "표시할 회사가 없습니다.",
  "companies.detail.title": "회사 상세",
  "companies.detail.viewPcf": "PCF 상세 보기",
  "companies.detail.selectHint":
    "목록에서 회사를 선택하면 Scope 구성을 확인할 수 있습니다.",
  "companies.chart.emissions": "배출량",
  "companies.pagination.previous": "이전",
  "companies.pagination.next": "다음",
  "companies.pagination.summary": "총 {{total}}개 중 {{from}}-{{to}}",
  "activityData.toolbar.company": "회사",
  "activityData.toolbar.country": "국가",
  "activityData.toolbar.noCompany": "해당 국가에 회사 없음",
  "activityData.toolbar.month": "월",
  "activityData.toolbar.source": "배출원",
  "activityData.toolbar.allMonths": "전체 월",
  "activityData.toolbar.selectMonth": "날짜 선택",
  "activityData.toolbar.allSources": "전체 배출원",
  "activityData.toolbar.period": "기간",
  "activityData.toolbar.refresh": "새로고침",
  "activityData.monthPicker.title": "월 선택",
  "activityData.monthPicker.year": "년",
  "activityData.monthPicker.month": "월",
  "activityData.monthPicker.apply": "적용",
  "activityData.loading": "활동 데이터를 불러오는 중입니다.",
  "activityData.error": "데이터를 불러오지 못했습니다. 다시 시도해 주세요.",
  "activityData.kpi.recordCount": "레코드 수",
  "activityData.kpi.recordCountDesc": "필터 조건에 해당하는 행 수",
  "activityData.kpi.totalEmissions": "합계 tCO2e",
  "activityData.kpi.totalEmissionsDesc": "선택 조건 누적 배출량",
  "activityData.kpi.sourceCount": "배출원 수",
  "activityData.kpi.sourceCountDesc": "포함된 배출원 종류",
  "activityData.kpi.monthlyAvg": "월평균",
  "activityData.kpi.monthlyAvgDesc": "월별 평균 tCO2e",
  "activityData.table.title": "활동 데이터",
  "activityData.table.description":
    "회사별 월·배출원 단위 tCO2e 원시 데이터입니다.",
  "activityData.table.month": "월",
  "activityData.table.source": "배출원",
  "activityData.table.scope": "Scope",
  "activityData.table.emissions": "tCO2e",
  "activityData.table.empty": "조건에 맞는 활동 데이터가 없습니다.",
  "activityData.pagination.previous": "이전",
  "activityData.pagination.next": "다음",
  "activityData.pagination.summary": "총 {{total}}개 중 {{from}}-{{to}}",
  "emissionFactors.toolbar.scope": "Scope",
  "emissionFactors.toolbar.source": "배출원",
  "emissionFactors.toolbar.allScopes": "전체 Scope",
  "emissionFactors.toolbar.allSources": "전체 배출원",
  "emissionFactors.toolbar.formula": "산출식",
  "emissionFactors.toolbar.refresh": "새로고침",
  "emissionFactors.loading": "배출 계수를 불러오는 중입니다.",
  "emissionFactors.error": "데이터를 불러오지 못했습니다. 다시 시도해 주세요.",
  "emissionFactors.kpi.totalCount": "등록 계수",
  "emissionFactors.kpi.totalCountDesc": "필터 조건에 해당하는 배출 계수 수",
  "emissionFactors.kpi.scope1Count": "Scope 1",
  "emissionFactors.kpi.scope1CountDesc": "직접 배출 관련 계수",
  "emissionFactors.kpi.scope2Count": "Scope 2",
  "emissionFactors.kpi.scope2CountDesc": "에너지 간접 배출 계수",
  "emissionFactors.kpi.latestUpdate": "최신 적용",
  "emissionFactors.kpi.latestUpdateDesc": "가장 최근 effective from",
  "emissionFactors.table.title": "배출 계수 목록",
  "emissionFactors.table.description":
    "활동량 × 배출 계수 = tCO2e 변환에 사용되는 기준값입니다.",
  "emissionFactors.table.source": "배출원",
  "emissionFactors.table.scope": "Scope",
  "emissionFactors.table.region": "지역",
  "emissionFactors.table.unit": "단위",
  "emissionFactors.table.factor": "배출 계수",
  "emissionFactors.table.standard": "기준",
  "emissionFactors.table.formula": "산출식",
  "emissionFactors.table.empty": "조건에 맞는 배출 계수가 없습니다.",
  "emissionFactors.chart.scopeDistribution": "Scope별 계수 분포",
  "emissionFactors.chart.scopeDistributionDesc": "필터 조건 내 Scope별 등록 수",
  "emissionFactors.chart.electricityComparison": "전력 배출 계수 비교",
  "emissionFactors.chart.electricityComparisonDesc":
    "국가별 electricity tCO2e/kWh",
  "emissionFactors.region.global": "글로벌",
  "emissionFactors.unitLabel": "tCO2e/{{unit}}",
};

const en: Messages = {
  "app.description": "Carbon emissions monitoring and analysis",
  "common.explore": "Explore",
  "common.openMenu": "Open menu",
  "common.closeMenu": "Close menu",
  "common.collapseSidebar": "Collapse sidebar",
  "common.expandSidebar": "Expand sidebar",
  "nav.sections.overview": "Overview",
  "nav.sections.analysis": "Analysis",
  "nav.sections.data": "Data",
  "nav.sections.settings": "Settings",
  "nav.platformOverview": "Platform Overview",
  "nav.platformOverviewDesc":
    "Learn about PCF concepts and how to use the dashboard.",
  "nav.pcf": "PCF Calculation",
  "nav.pcfDesc": "View product carbon footprint results, KPIs, and charts.",
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
  "country.KR": "South Korea",
  "country.US": "United States",
  "country.JP": "Japan",
  "country.DE": "Germany",
  "country.CN": "China",
  "overview.hero.badge": "HanaLoop Platform",
  "overview.hero.title": "Manage product carbon footprints at a glance",
  "overview.hero.subtitle":
    "HanaLoop is a carbon management SaaS that automatically calculates product-level PCF from activity data such as materials, electricity, and transport. Executives track trends and risks; practitioners handle input, validation, and reduction planning in one place.",
  "overview.hero.imageAlt": "Globe on moss with green leaves",
  "overview.pcf.title": "What is PCF (Product Carbon Footprint)?",
  "overview.pcf.description":
    "PCF expresses the total greenhouse gas emissions across a product's life cycle—from raw materials and manufacturing to distribution, use, and disposal—as CO₂ equivalent tons (tCO2e). It is the core carbon accounting unit for customers, regulations, and supply chain requirements.",
  "overview.scope.title": "Understanding GHG Protocol Scopes",
  "overview.scope1.title": "Scope 1 · Direct emissions",
  "overview.scope1.description":
    "Emissions from sources owned or controlled by the company, such as factory boilers and company fleet fuel combustion (gasoline, diesel, lpg, etc.).",
  "overview.scope2.title": "Scope 2 · Indirect energy emissions",
  "overview.scope2.description":
    "Indirect emissions from purchased electricity, heat, or steam. Calculated by multiplying electricity usage by an emission factor.",
  "overview.scope3.title": "Scope 3 · Other indirect emissions",
  "overview.scope3.description":
    "Indirect emissions across the value chain including supply chain, logistics, business travel, and waste. Often the largest share in full PCF analysis.",
  "overview.workflow.title": "Dashboard data flow",
  "overview.workflow.step1.title": "1. Enter activity data",
  "overview.workflow.step1.description":
    "Register monthly activity volumes by emission source (fuel, electricity, etc.).",
  "overview.workflow.step2.title": "2. Apply emission factors",
  "overview.workflow.step2.description":
    "Multiply activity data by emission factors to convert to tCO2e.",
  "overview.workflow.step3.title": "3. Review PCF results",
  "overview.workflow.step3.description":
    "Use KPIs, charts, and company comparisons to identify trends and reduction opportunities.",
  "overview.unit.title": "What is tCO2e?",
  "overview.unit.description":
    "tCO2e (CO₂ equivalent) converts various greenhouse gases such as methane and nitrous oxide into a CO₂ basis, measured in metric tons. All emissions in this dashboard are shown in tCO2e.",
  "overview.quickLinks.title": "Quick links",
  "pcf.toolbar.company": "Company",
  "pcf.toolbar.country": "Country",
  "pcf.toolbar.noCompany": "No companies in this country",
  "pcf.toolbar.period": "Period",
  "pcf.toolbar.refresh": "Refresh",
  "pcf.loading": "Loading PCF data...",
  "pcf.error": "Failed to load data. Please try again.",
  "pcf.kpi.total": "Total PCF",
  "pcf.kpi.totalDesc": "Cumulative emissions in selected period",
  "pcf.kpi.monthlyAvg": "Monthly average",
  "pcf.kpi.monthlyAvgDesc": "Average tCO2e per month",
  "pcf.kpi.topSource": "Top source",
  "pcf.kpi.topSourceDesc": "Highest-share emission source",
  "pcf.kpi.monthOverMonth": "Month over month",
  "pcf.kpi.monthOverMonthDesc": "Change vs. previous month",
  "pcf.chart.monthlyTrend": "Monthly trend",
  "pcf.chart.monthlyTrendDesc": "Monthly tCO2e by Scope",
  "pcf.chart.scopeBreakdown": "Scope breakdown",
  "pcf.chart.scopeBreakdownDesc": "Share by GHG Protocol Scope",
  "pcf.chart.sourceBreakdown": "Emissions by source",
  "pcf.chart.sourceBreakdownDesc": "tCO2e by fuel, electricity, etc.",
  "pcf.chart.total": "Total",
  "pcf.scope.scope1": "Scope 1",
  "pcf.scope.scope2": "Scope 2",
  "pcf.scope.scope3": "Scope 3",
  "pcf.source.gasoline": "Gasoline",
  "pcf.source.diesel": "Diesel",
  "pcf.source.lpg": "LPG",
  "pcf.source.naturalGas": "Natural gas",
  "pcf.source.electricity": "Electricity",
  "pcf.post.title": "Reduction notes",
  "pcf.post.description":
    "Record reduction plans and actions. Changes roll back automatically on save failure.",
  "pcf.post.empty": "No reduction notes yet.",
  "pcf.post.add": "Add note",
  "pcf.post.edit": "Edit",
  "pcf.post.delete": "Delete",
  "pcf.post.save": "Save",
  "pcf.post.cancel": "Cancel",
  "pcf.post.fieldTitle": "Title",
  "pcf.post.fieldMonth": "Target month",
  "pcf.post.fieldContent": "Content",
  "pcf.post.readMore": "Read more",
  "pcf.post.readLess": "Show less",
  "pcf.post.charCount": "{{current}}/{{max}}",
  "pcf.post.saveSuccess": "Reduction note saved.",
  "pcf.post.saveError": "Save failed. Your changes were rolled back.",
  "pcf.post.deleteSuccess": "Reduction note deleted.",
  "pcf.post.deleteError": "Delete failed. Your changes were rolled back.",
  "pcf.unit": "tCO2e",
  "companies.toolbar.country": "Country",
  "companies.toolbar.allCountries": "All countries",
  "companies.toolbar.period": "Period",
  "companies.toolbar.refresh": "Refresh",
  "companies.loading": "Loading company data...",
  "companies.error": "Failed to load data. Please try again.",
  "companies.kpi.companyCount": "Companies",
  "companies.kpi.companyCountDesc": "Organizations in selected scope",
  "companies.kpi.totalEmissions": "Total emissions",
  "companies.kpi.totalEmissionsDesc": "Cumulative tCO2e in period",
  "companies.kpi.avgPerCompany": "Average per company",
  "companies.kpi.avgPerCompanyDesc": "Mean emissions per organization",
  "companies.kpi.topCountry": "Top country",
  "companies.kpi.topCountryDesc": "Highest total by country",
  "companies.chart.countryComparison": "Emissions by country",
  "companies.chart.countryComparisonDesc": "Country-level tCO2e totals",
  "companies.chart.companyComparison": "Emissions by company",
  "companies.chart.companyComparisonDesc": "Organization ranking by tCO2e",
  "companies.table.title": "Company list",
  "companies.table.description": "Organizations sorted by total emissions.",
  "companies.table.company": "Company",
  "companies.table.country": "Country",
  "companies.table.total": "Total",
  "companies.table.monthlyAvg": "Monthly avg.",
  "companies.table.empty": "No companies to display.",
  "companies.detail.title": "Company detail",
  "companies.detail.viewPcf": "View PCF details",
  "companies.detail.selectHint":
    "Select a company from the list to view Scope breakdown.",
  "companies.chart.emissions": "Emissions",
  "companies.pagination.previous": "Previous",
  "companies.pagination.next": "Next",
  "companies.pagination.summary": "{{from}}-{{to}} of {{total}}",
  "activityData.toolbar.company": "Company",
  "activityData.toolbar.country": "Country",
  "activityData.toolbar.noCompany": "No companies in this country",
  "activityData.toolbar.month": "Month",
  "activityData.toolbar.source": "Source",
  "activityData.toolbar.allMonths": "All months",
  "activityData.toolbar.selectMonth": "Select date",
  "activityData.toolbar.allSources": "All sources",
  "activityData.toolbar.period": "Period",
  "activityData.toolbar.refresh": "Refresh",
  "activityData.monthPicker.title": "Select month",
  "activityData.monthPicker.year": "Year",
  "activityData.monthPicker.month": "Month",
  "activityData.monthPicker.apply": "Apply",
  "activityData.loading": "Loading activity data...",
  "activityData.error": "Failed to load data. Please try again.",
  "activityData.kpi.recordCount": "Records",
  "activityData.kpi.recordCountDesc": "Rows matching current filters",
  "activityData.kpi.totalEmissions": "Total tCO2e",
  "activityData.kpi.totalEmissionsDesc": "Cumulative emissions in selection",
  "activityData.kpi.sourceCount": "Sources",
  "activityData.kpi.sourceCountDesc": "Distinct emission sources",
  "activityData.kpi.monthlyAvg": "Monthly average",
  "activityData.kpi.monthlyAvgDesc": "Average tCO2e per month",
  "activityData.table.title": "Activity data",
  "activityData.table.description":
    "Raw monthly tCO2e records by company and emission source.",
  "activityData.table.month": "Month",
  "activityData.table.source": "Source",
  "activityData.table.scope": "Scope",
  "activityData.table.emissions": "tCO2e",
  "activityData.table.empty": "No activity data matches the filters.",
  "activityData.pagination.previous": "Previous",
  "activityData.pagination.next": "Next",
  "activityData.pagination.summary": "{{from}}-{{to}} of {{total}}",
  "emissionFactors.toolbar.scope": "Scope",
  "emissionFactors.toolbar.source": "Source",
  "emissionFactors.toolbar.allScopes": "All scopes",
  "emissionFactors.toolbar.allSources": "All sources",
  "emissionFactors.toolbar.formula": "Formula",
  "emissionFactors.toolbar.refresh": "Refresh",
  "emissionFactors.loading": "Loading emission factors...",
  "emissionFactors.error": "Failed to load data. Please try again.",
  "emissionFactors.kpi.totalCount": "Factors",
  "emissionFactors.kpi.totalCountDesc": "Emission factors matching filters",
  "emissionFactors.kpi.scope1Count": "Scope 1",
  "emissionFactors.kpi.scope1CountDesc": "Direct emission factors",
  "emissionFactors.kpi.scope2Count": "Scope 2",
  "emissionFactors.kpi.scope2CountDesc": "Energy indirect emission factors",
  "emissionFactors.kpi.latestUpdate": "Latest effective",
  "emissionFactors.kpi.latestUpdateDesc": "Most recent effective-from date",
  "emissionFactors.table.title": "Emission factors",
  "emissionFactors.table.description":
    "Reference values used in activity × factor = tCO2e conversion.",
  "emissionFactors.table.source": "Source",
  "emissionFactors.table.scope": "Scope",
  "emissionFactors.table.region": "Region",
  "emissionFactors.table.unit": "Unit",
  "emissionFactors.table.factor": "Factor",
  "emissionFactors.table.standard": "Standard",
  "emissionFactors.table.formula": "Formula",
  "emissionFactors.table.empty": "No emission factors match the filters.",
  "emissionFactors.chart.scopeDistribution": "Factors by scope",
  "emissionFactors.chart.scopeDistributionDesc": "Registered factors per scope",
  "emissionFactors.chart.electricityComparison":
    "Electricity factor comparison",
  "emissionFactors.chart.electricityComparisonDesc":
    "Country electricity tCO2e/kWh",
  "emissionFactors.region.global": "Global",
  "emissionFactors.unitLabel": "tCO2e/{{unit}}",
};

export const MESSAGES: Record<Locale, Messages> = {
  ko,
  en,
};

export const getMessage = (locale: Locale, key: MessageKey) => {
  return MESSAGES[locale][key];
};
