# HanaLoop Carbon Emissions Dashboard

탄소 배출량 모니터링 및 분석 대시보드

## Tech Stack

- **Next.js** 16 (App Router)
- **TypeScript**
- **Tailwind CSS** 4
- **Zustand** (전역 상태 관리)

## Getting Started

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## Project Structure

```
├── src/
│   ├── app/          # App Router 페이지 및 레이아웃
│   └── stores/       # Zustand 스토어
├── public/           # 정적 에셋
└── ...
```

## Scripts

| 명령어        | 설명              |
| ------------- | ----------------- |
| `npm run dev` | 개발 서버 실행    |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버   |
| `npm run lint` | ESLint 검사      |
