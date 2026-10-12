import { Outlet } from "react-router";

import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import copy from "@/content/en.json";

function AppLayout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {copy.site.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
