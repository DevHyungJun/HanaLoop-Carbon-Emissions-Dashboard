"use client";

import { Hero, Concepts, Scopes, QuickLinks, Workflow } from "./_internal";

const Overview = () => {
  return (
    <div className="space-y-8">
      <Hero />

      <Concepts />

      <Scopes />

      <Workflow />

      <QuickLinks />
    </div>
  );
};

export default Overview;
