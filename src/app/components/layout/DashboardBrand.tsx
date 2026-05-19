import Image from "next/image";

import { APP_NAME } from "@/app/constants";

export function DashboardBrand() {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 uppercase">
      <Image
        src="/hanaloop-logo.png"
        alt=""
        width={20}
        height={20}
        aria-hidden
      />
      <span>{APP_NAME}</span>
    </div>
  );
}
