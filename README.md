# HanaLoop Carbon Emissions Dashboard

탄소 배출량을 측정·관리·감축하는 SaaS 플랫폼 **HanaLoop**의 PCF(Product Carbon Footprint) 전 과정 데이터를 시각화하는 인터랙티브 대시보드입니다.

- **대상 사용자:** 실무자(활동 데이터 입력·검증) · 경영자(기간·회사별 PCF 추세·리스크 파악)
- **과제 목적:** 탄소 도메인 이해, UI 설계·구현, 설계 결정 설명 능력을 보여주는 프론트엔드 채용 과제

<img width="1353" height="896" alt="Image" src="https://github.com/user-attachments/assets/b9f22d5e-1298-43a9-8e26-d9ab6b2d292a" />

---

## 실행 방법

### 사전 요구사항

- Node.js 20+
- npm

### 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 기타 스크립트

| 명령어          | 설명               |
| --------------- | ------------------ |
| `npm run dev`   | 개발 서버 실행     |
| `npm run build` | 프로덕션 빌드      |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint`  | ESLint 검사        |

---

## 구현 기능

| 페이지      | 경로                | 역할                                                            |
| ----------- | ------------------- | --------------------------------------------------------------- |
| 플랫폼 소개 | `/`                 | PCF, GHG Scope 1·2·3, tCO2e 개념 및 데이터 흐름 안내            |
| PCF 계산    | `/pcf`              | 회사·기간별 KPI, 월별 추이, Scope/배출원 차트, 활동 데이터 CRUD |
| 회사        | `/companies`        | 국가·회사별 누적 배출 비교, 순위, 상세 패널                     |
| 활동 데이터 | `/activity-data`    | 회사·월·배출원별 활동 기록 조회·필터                            |
| 배출 계수   | `/emission-factors` | Scope·배출원별 기준 계수 조회 (데스크톱 테이블 / 모바일 카드)   |

### 공통 UX

- 네비게이션 드로어 + 헤더 + 메인 콘텐츠 레이아웃
- 사이드바 하단: 다크 모드, 한국어/English 전환
- 기간 선택 (`DateRangePicker`) — PCF·회사 페이지에 적용
- 로딩 스켈레톤, 에러 상태, 새로고침
- 반응형 (모바일 드로어, 배출 계수 모바일 UI)
- `createOrUpdatePost` 15% 실패 시 낙관적 업데이트 롤백 + 토스트

---

## 기술 스택

| 항목       | 선택                                            |
| ---------- | ----------------------------------------------- |
| 프레임워크 | Next.js 16 (App Router) + React 19 + TypeScript |
| 스타일링   | Tailwind CSS 4                                  |
| 상태 관리  | Zustand + 커스텀 훅                             |
| 차트       | Recharts                                        |
| UI         | shadcn/ui, Base UI (MUI/Ant Design 미사용)      |
| 폰트       | Pretendard Variable                             |

---

## 프로젝트 구조

```
src/
├── app/
│   ├── (dashboard)/          # 라우트별 페이지 + _internal 컴포넌트
│   │   ├── overview/
│   │   ├── pcf/
│   │   ├── companies/
│   │   ├── activity-data/
│   │   └── emission-factors/
│   ├── components/
│   │   ├── common/           # Button, Chart, DateRangePicker 등
│   │   ├── layout/           # DashboardShell, Header, Drawer
│   │   └── state/            # Providers, SettingsProvider
│   ├── constants/            # Scope 매핑, 배출 계수, i18n, navigation
│   ├── hooks/                # 페이지별 data hook (usePcfData 등)
│   ├── lib/api.ts            # 페이크 백엔드
│   ├── mock/data.ts          # seed 데이터
│   ├── store/                # Zustand 스토어
│   ├── types/                # 도메인 타입
│   └── utils/                # 집계·계산·포맷 유틸
└── fonts/
```

---

## 데이터 모델

과제 기본 모델을 확장했습니다.

### Company / GhgEmission (과제 기본)

```typescript
type GhgEmission = {
  yearMonth: string; // "2025-01"
  source: string; // gasoline, electricity 등
  emissions: number; // tCO2e
};

type Company = {
  id: string;
  name: string;
  country: string; // Country.code
  emissions: GhgEmission[];
};
```

### ActivityRecord (Post 확장)

과제의 `Post`를 탄소 도메인에 맞게 **활동 데이터**로 확장했습니다. `fetchPosts` / `createOrUpdatePost` API 호환 alias를 유지합니다.

```typescript
type ActivityRecord = {
  id: string;
  companyId: string; // Company.id
  yearMonth: string; // "YYYY-MM"
  source: EmissionSource;
  title: string;
  description: string;
  quantity: number; // 활동량 (L, kWh, m³ 등)
};
```

### EmissionFactor (추가)

```typescript
type EmissionFactor = {
  source: EmissionSource;
  region: string; // 국가 코드 또는 "GLOBAL"
  factor: number;
  unit: string;
  scope: "scope1" | "scope2" | "scope3";
  effectiveFrom: string;
};
```

### GHG Scope 매핑

| 배출원                             | Scope   | 설명                                        |
| ---------------------------------- | ------- | ------------------------------------------- |
| gasoline, diesel, lpg, natural_gas | Scope 1 | 직접 배출 (연료 연소)                       |
| electricity                        | Scope 2 | 간접 배출 (구매 전력)                       |
| Scope 3                            | —       | UI·개념 설명에 포함, mock 데이터에는 미포함 |

---

## 페이크 백엔드 (`src/app/lib/api.ts`)

과제 스펙을 그대로 따릅니다.

- 모든 요청: **200~800ms** 랜덤 지연 (`jitter()`)
- `createOrUpdatePost` (alias: `createOrUpdateActivityRecord`): **15% 확률 실패** → `PostSaveError` throw
- in-memory store로 세션 동안 CRUD 상태 유지

| 함수                        | 설명                                      |
| --------------------------- | ----------------------------------------- |
| `fetchCountries()`          | 국가 5개                                  |
| `fetchCompanies()`          | 회사 20개 + 12개월 × 5개 배출원 emissions |
| `fetchPosts()`              | 활동 데이터 목록 (alias)                  |
| `createOrUpdatePost(input)` | 활동 데이터 생성/수정                     |
| `deletePost(id)`            | 활동 데이터 삭제 (확장)                   |
| `fetchEmissionFactors()`    | 배출 계수 목록 (확장)                     |

---

## 아키텍처 개요

### 상태 경계

| Store                     | 책임                          | persist         |
| ------------------------- | ----------------------------- | --------------- |
| `useDashboardStore`       | 드로어 열림, 사이드바 접힘    | 사이드바 접힘만 |
| `useSettingsStore`        | theme, locale                 | O               |
| `useDateRangeStore`       | 분석 기간 (from/to)           | O               |
| `useActivityRecordsStore` | 활동 데이터 (낙관적 업데이트) | O               |

페이지별 **서버 데이터**는 각 data hook의 `useState` + `fetch`로 관리하고, **사용자 입력·필터·기간**은 Zustand로 공유합니다.

### 데이터 흐름

```
mock/data.ts
    ↓ fetch (200~800ms)
lib/api.ts
    ↓
hooks (usePcfData, useCompaniesData, …)
    ↓ merge / compute
utils (computePcfMetrics, mergeEmissionsWithActivityRecords, …)
    ↓
페이지 _internal 컴포넌트 (KPI, Chart, Panel)
```

**활동 데이터 저장 흐름 (낙관적 업데이트):**

1. 저장 클릭 → `useActivityRecordsStore.upsertRecord` 즉시 반영
2. `usePcfData`가 store 변경 감지 → KPI·차트 재계산
3. `createOrUpdatePost` API 호출
4. 실패 시 store 롤백 + 에러 토스트

**PCF 재계산:** mock `Company.emissions`와 사용자 입력 `ActivityRecord`를 `mergeEmissionsWithActivityRecords`로 병합한 뒤, `quantity × emissionFactor`로 산출한 tCO2e를 집계합니다.

---

## 설계 결정 및 가정

### 페이지 분리

PCF 파이프라인(활동 데이터 → 배출 계수 → PCF 계산)을 사용자 역할에 맞게 나눴습니다.

- **경영자:** 플랫폼 소개 + PCF 계산(요약 KPI·추세)
- **실무자:** 활동 데이터 + 배출 계수 + 회사 비교

### Post → ActivityRecord 확장

과제 `Post`는 회사·월 메모 수준이었으나, "활동량 입력 → PCF 반영" 흐름을 보여주기 위해 `quantity`, `source` 필드를 추가했습니다. API 이름(`fetchPosts`, `createOrUpdatePost`)은 과제 호환을 위해 alias로 유지합니다.

### 제품 단위 PCF 미구현

과제 배경에 "제품별 PCF"가 언급되지만, 제공 데이터 모델에 Product가 없어 **회사·기간·배출원 단위**로 집계합니다. 제품 SKU 연동은 향후 `Product` 타입 추가 시 확장 가능합니다.

### Scope 3

개념 설명(플랫폼 소개)과 UI 라벨은 포함하되, mock 배출원 5종은 Scope 1·2만 해당합니다.

### i18n

외부 i18n 라이브러리 대신 `constants/i18n.ts` + `useTranslation` 훅으로 경량 구현했습니다. 과제 범위 대비 의존성을 줄이기 위한 선택입니다.

### 국가별 배출 계수

`resolveEmissionFactor`는 회사 국가 코드 → GLOBAL 순으로 계수를 찾습니다. 전력(Scope 2) 등 국가별 계수 차이를 반영합니다.

---

## 디자인 근거 및 UI/UX 결정 사항

과제 대상이 **비전문가(경영자)와 실무자**를 동시에 포함하므로, "데이터를 읽기 쉽게"와 "입력·조작을 실수 없이"를 UI 전반의 기준으로 삼았습니다.

### 1. 사용자별 정보 밀도 조절

| 사용자      | UX 목표                   | UI 대응                                                              |
| ----------- | ------------------------- | -------------------------------------------------------------------- |
| 경영자      | 한눈에 추세·리스크 파악   | PCF KPI 5종, 월별 추이·Scope/배출원 차트, 예상 탄소세                |
| 실무자      | 입력 근거와 단위를 명확히 | 활동량 단위 배지, 저장 전 tCO2e 미리보기, 배출 계수·산식 표시        |
| 최초 방문자 | 도메인 개념 이해          | 플랫폼 소개 페이지에서 PCF·Scope·워크플로우 안내 후 각 페이지로 연결 |

경영자에게는 **설명(description)이 붙은 KPI 카드**를, 실무자에게는 **입력 필드 옆 단위·미리보기**를 두어 같은 화면에서도 읽는 깊이를 선택할 수 있게 했습니다.

### 2. 시각 언어 — 탄소·Scope 색상 체계

탄소 SaaS 맥락을 반영해 **에메랄드 계열**을 브랜드 포인트로 사용했습니다. 플랫폼 소개 히어로, 로고 주변 강조 등에 적용해 "환경·지속가능" 연상을 유지합니다.

GHG Scope는 **의미가 바로 연상되도록 색을 고정**했습니다.

| Scope               | 색상     | 적용 위치                           |
| ------------------- | -------- | ----------------------------------- |
| Scope 1 (직접 배출) | Orange   | 소개 카드, 차트(`PCF_CHART_CONFIG`) |
| Scope 2 (간접·전력) | Sky Blue | 소개 카드, 차트                     |
| Scope 3 (가치사슬)  | Violet   | 소개 카드 (개념 설명)               |

소개 페이지와 PCF 차트에서 **동일한 Scope 색**을 쓰도록 해, 사용자가 한 번 학습한 색상 규칙을 분석 화면에서도 그대로 재사용할 수 있게 했습니다. 다크 모드에서는 채도·명도를 낮춘 `dark:` 변형을 함께 정의해 대비를 유지합니다.

### 3. 레이아웃 — 드로어·헤더·콘텐츠 분리

```
[ Header: 현재 페이지 제목 + 모바일 메뉴 ]
[ Drawer ] [ Main: 툴바 → KPI/차트 → 상세 패널 ]
```

- **섹션형 네비게이션** (`overview` / `analysis` / `data`): PCF 파이프라인 순서와 맞춰 mental model을 형성
- **PC 사이드바 접기**: 차트·테이블 가로 공간 확보, 접힌 상태에서는 아이콘 + `title`/`aria-label`로 접근성 유지
- **모바일 오버레이 드로어**: 작은 화면에서 콘텐츠 우선, 닫기 버튼·링크 이동 시 자동 닫힘
- **Sticky 헤더 + backdrop-blur**: 스크롤 중에도 현재 위치·메뉴 접근 가능

설정(테마·언어)은 별도 페이지 대신 **드로어 하단**에 배치했습니다. 분석 흐름을 끊지 않으면서도 전역 설정에 항상 접근할 수 있습니다.

### 4. 숫자·단위 가독성

탄소 데이터는 소수·단위 혼동이 잦아 아래 규칙을 통일했습니다.

- **배출량·활동량**: `font-mono` + `tabular-nums` — 자릿수 정렬로 스캔 속도 향상
- **단위 표기**: tCO2e, kWh, L 등을 KPI·테이블·폼 라벨에 **항상 함께** 표시
- **활동 유형 select**: `전력 (kWh)`처럼 라벨에 단위 포함 — 선택 후 별도 확인 불필요
- **저장 전 미리보기**: `quantity × 배출계수` 결과를 폼 하단에 표시해 "저장하면 PCF에 X tCO2e 반영"을 사전 확인

경영자는 KPI 숫자만, 실무자는 단위·산출 근거까지 같은 데이터 계층에서 읽을 수 있습니다.

### 5. 입력 UX — 활동 데이터 패널

PCF 페이지 하단 **활동 데이터 CRUD**는 과제의 Post 입력을 탄소 도메인에 맞게 확장한 핵심 UX입니다.

| 결정                                  | 근거                                                          |
| ------------------------------------- | ------------------------------------------------------------- |
| 인라인 폼 (별도 모달 X)               | PCF 차트와 입력 폼을 한 화면에서 보며 즉시 피드백 확인        |
| 폼 열릴 때 제목 input 자동 focus      | 추가 동작 최소화                                              |
| textarea 자동 높이                    | 긴 설명 입력 시 스크롤 없이 전체 내용 확인                    |
| 제목·설명 글자 수 카운터 + max length | API 실패 전 클라이언트에서 입력 품질 관리                     |
| 설명 "더보기/접기"                    | 목록 밀도 유지, 긴 메모는 필요 시 확장                        |
| 낙관적 업데이트 + 토스트              | 200~800ms 지연 동안에도 KPI·차트 즉시 반영, 실패 시 롤백 안내 |

저장 버튼은 필수값(제목·설명·활동량)이 채워지기 전까지 비활성화해 **불완전한 데이터 유입**을 막았습니다.

### 6. 기간·날짜 선택 — Bottom Sheet + Wheel

월 단위 탄소 데이터 특성상 `type="date"`보다 **커스텀 년·월 선택 UI**가 자연스럽습니다.

- **데스크톱/모바일 공통 Bottom Sheet**: 디자인 통일성과 사용성을 고려한 커스텀 날짜 선택 Bottom Sheet
- **draft 상태 분리**: 휠 조작 중에는 store를 바꾸지 않고, "적용" 시에만 반영
- **하단 기간 미리보기 실시간 갱신**: 확정 전 선택 결과를 `~` 형식으로 확인
- **Escape·배경 클릭·body scroll lock**: 시트 UX 기본 동작 구현

기간 변경은 PCF·회사 페이지 KPI에 즉시 반영되므로, **선택 → 결과** 인과가 한 번의 조작으로 이어지게 했습니다.

### 7. 반응형 — 모바일 전용 UI 분기

테이블 중심 페이지는 모바일에서 가독성이 급격히 떨어지므로 **breakpoint별 UI를 분리**했습니다.

| 페이지      | 데스크톱                  | 모바일                                   |
| ----------- | ------------------------- | ---------------------------------------- |
| 배출 계수   | 정렬 가능한 테이블 + 차트 | Scope 탭 + `EmissionFactorMobileCard`    |
| 활동 데이터 | 테이블 + 페이지네이션     | 동일 패턴, 터치 타겟 확보                |
| PCF 차트    | 2열 그리드                | 1열 스택, KPI 2→3→5열 그리드 단계적 확장 |

배출 계수 모바일 카드는 **배출원명 + Scope 뱃지 → 계수(강조) → 메타 필드(dl)** 순으로 시선을 유도해, 테이블 한 행에 담기던 정보를 세로 스캔에 맞게 재배치했습니다.

### 8. 로딩·에러·빈 상태

| 상태               | 처리                                          |
| ------------------ | --------------------------------------------- |
| 초기 로딩          | 페이지별 Skeleton (KPI·차트·테이블 형태 유지) |
| 새로고침           | 툴바 Refresh 버튼 + `isRefreshing` 표시       |
| fetch 실패         | 점선 border empty state + 재시도 버튼         |
| API 저장/삭제 실패 | 에러 토스트 + store 롤백                      |
| 처리 중 레코드     | 해당 항목만 `isProcessing` 비활성화           |

Skeleton을 실제 레이아웃과 맞춰 **레이아웃 시프트(CLS)** 를 줄였고, 에러 시 "다시 시도"만 노출해 다음 행동을 명확히 했습니다.

### 9. 접근성·마이크로 인터랙션

- **아이콘-only 버튼**: `aria-label` (테마 전환, 메뉴, 페이지네이션 등)
- **탭 UI**: `aria-selected`, `aria-controls` (배출 계수 모바일 탭)
- **버튼**: `cursor-pointer`, `focus-visible:ring`, disabled 시 `cursor-not-allowed`
- **이미지**: `AppImage`로 drag 방지, LCP 이미지에 `priority`
- **다크 모드 FOUC 방지**: `theme-init.js`로 hydration 전 `html.dark` 적용, 시스템 설정 기본값 연동

과제 규모에서 WCAG 전체 감사까지는 하지 않았지만, **키보드·스크린리더·포커스**는 공통 컴ponent 수준에서 일관되게 적용했습니다.

### 10. 다국어 UX

- 설정 토글 라벨은 **"전환할 언어"** 를 표시 (예: 한국어 사용 중 → "English" 버튼)
- 국가명은 locale에 따라 한글/영문 전환 (`useCountryName`)
- 월 표시·기간 라벨도 locale별 포맷 (`formatActivityMonthShort`, `formatDateRangeLabel`)

번역 키는 UI 카피와 1:1로 관리해, 레이아웃 깨짐 없이 ko/en 전환되도록 했습니다.

---

## 렌더링 효율성 및 트레이드오프

| 선택                             | 이유                                   | 트레이드오프                         |
| -------------------------------- | -------------------------------------- | ------------------------------------ |
| 페이지별 data hook               | 관심사 분리, 페이지 독립 개발          | hook 간 store 구독 중복 가능         |
| Zustand persist (활동 데이터)    | 새로고침 후에도 입력 유지              | localStorage 용량·동기화 이슈 가능   |
| 낙관적 업데이트                  | 200~800ms 지연 체감 완화               | 실패 시 롤백 UX 필요                 |
| Recharts                         | React 친화적, shadcn Chart 래퍼 재사용 | 대용량 데이터 시 성능 한계           |
| `"use client"` 페이지            | 필터·차트 상호작용                     | SSR 이점 제한 (과제 규모에서는 수용) |
| `skipHydration: true` (settings) | FOUC 방지 (`theme-init.js`)            | hydration 직후 잠깐 기본값 표시 가능 |

---

## 작업 소요 시간

**작업 구간:** 2026-05-19 20:52 ~ 2026-05-20 05:47 (총 31커밋)

> 아래 시간은 **git 커밋 기록 1차 추정**입니다. 인접 커밋 간격을 해당 커밋 작업 시간으로 계산했고, 40분을 넘는 간격은 휴식으로 보고 25분만 반영했습니다. 마지막 커밋에는 15분 마무리 시간을 더했습니다. 실제 집중 작업 시간과는 차이가 있을 수 있습니다.

| 파트     | 작업 내용                                   | 소요 시간  | 관련 커밋 (요약)                                                                     |
| -------- | ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| Part 0   | 프로젝트 기반 정리 (폴더 구조, 공통 UI)     | 1h 06m     | `chore: 프로젝트 기본 세팅`, `design: shadcn 설치`                                   |
| Part 1   | 데이터 레이어 (types, mock, api, utils)     | 49m        | `type: 데이터 모델`, `feat: fake api`, `feat: 토스트`                                |
| Part 2   | 상태 관리 (Zustand stores)                  | 28m        | `feat: 설정 섹션`, `feat: persist 저장`                                              |
| Part 3   | 레이아웃 셸 (Header, Drawer, Shell)         | 1h 05m     | `feat: 기본 레이아웃`, `design: Drawer`, `design: 모바일 Drawer 로고`                |
| Part 4   | 플랫폼 소개 + i18n                          | 1h 09m     | `feat: 소개 페이지`, `refactor: 컨벤션 통일`, `feat: EN 나라이름`                    |
| Part 5   | PCF 페이지 (KPI, 차트, ActivityRecord CRUD) | 1h 41m     | `feat: PCF 계산 페이지`, `feat: 탄소세`, `feat: 활동 데이터 입력`, `feat: 기간 선택` |
| Part 6   | 회사 / 활동 데이터 / 배출 계수 페이지       | 53m        | `feat: 회사 페이지`, `feat: 활동 데이터`, `feat: 배출 계수`, `feat: 모바일 카드`     |
| Part 7   | 반응형, 다크 모드, UI polish                | 59m        | `feat: 버튼/아이콘`, `feat: 이미지`, `feat: 다크 모드 시스템 연동`                   |
| **합계** |                                             | **8h 10m** |                                                                                      |

### 시간이 많이 소요된 부분

1. **PCF 페이지 통합** — mock emissions와 사용자 입력 ActivityRecord 병합, Scope/배출원/월별 집계, KPI·차트·CRUD 패널을 한 흐름으로 연결
2. **낙관적 업데이트 + 롤백** — temp ID 처리, 저장/삭제 실패 시 store 복원, PCF 즉시 재계산
3. **기간 선택 UI** — draft 상태와 store 동기화, 하단 미리보기 실시간 갱신, 페이지별 dateRange 연동
4. **i18n** — 페이지·컴포넌트 전반 ko/en 키 관리 및 번역 일관성
5. **반응형** — 배출 계수 모바일 카드/탭, 드로어, 툴바 레이아웃 분기

---

## AI 활용 기록

과제 AI 사용 정책에 따라, AI(Cursor Agent: Composer 2.5) 활용 범위와 본인 판단을 구분해 기록합니다.

### AI가 도움을 준 영역

| 영역                   | AI 역할                                         | 본인 검토·수정                                        |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| 타입·mock API 스캐폴딩 | 과제 문서 스펙 기반 `types/`, `lib/api.ts` 초안 | `src/app/` 구조에 맞게 경로 수정, ActivityRecord 확장 |
| 페이지·컴포넌트 구조   | Overview/PCF 등 섹션 분리 제안                  | `_internal` 폴더 컨벤션, PascalCase 네이밍 적용       |
| 차트·스켈레톤 UI       | Recharts + shadcn Chart 패턴                    | 색상·Scope 테마, KPI 카드 도메인 필드 조정            |
| i18n 키·번역문         | ko/en 메시지 키 초안                            | 용어 통일 (tCO2e, Scope), 누락 키 보완                |
| DateRangePicker        | draft 미리보기, normalize 로직                  | DATE_RANGE_BOUNDS vs draft 표시 버그 직접 수정        |
| ActivityRecord CRUD    | 낙관적 업데이트 패턴 제안                       | temp ID 교체, 단위 표시, PCF merge 로직 검증          |

### AI에 사용한 대표 프롬프트

- "문서에 적혀있는 데이터 모델 타입을 types 폴더에 추가해"
- "app/lib/api.ts 파일을 추가해, 문서에 적혀있는대로 페이크 백엔드 초안을 구현해"
- "모바일 레이아웃 및 사이즈가 깨지지 않도록 보정해
- "기존 디자인에 일관성을 유지하면서 다크 모드를 구현해"

### 본인이 직접 결정한 사항

- `Post` → `ActivityRecord` 도메인 확장 및 API alias 유지
- 5개 분석 페이지 + 플랫폼 소개 IA
- Zustand store 경계 (dashboard / settings / dateRange / activityRecords)
- Scope 1·2 mock 매핑, Scope 3는 개념 설명만

---
