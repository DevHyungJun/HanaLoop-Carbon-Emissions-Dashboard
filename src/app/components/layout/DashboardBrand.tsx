import { AppImage } from "@/app/components/common";
import { APP_NAME } from "@/app/constants";

const DashboardBrand = () => {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 uppercase">
      <AppImage
        src="/hanaloop-logo.png"
        alt=""
        width={20}
        height={20}
        priority
        aria-hidden
      />
      <span>{APP_NAME}</span>
    </div>
  );
};

export default DashboardBrand;
