import { memo } from "react";

import { Events } from "@/components/Events";
import { pipeline } from "@/utils/pipeline";

function EventsPage() {
  return <Events />;
}

export default pipeline(memo)(EventsPage);
