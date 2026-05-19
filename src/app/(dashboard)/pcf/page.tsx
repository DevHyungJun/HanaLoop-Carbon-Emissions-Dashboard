import { Suspense } from "react";

import { PcfSkeleton } from "./_internal";
import Pcf from "./Pcf";

const PcfPage = () => {
  return (
    <Suspense fallback={<PcfSkeleton />}>
      <Pcf />
    </Suspense>
  );
};

export default PcfPage;
