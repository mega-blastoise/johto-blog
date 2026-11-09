import { memo } from "react";

import { EventDetail } from "@/components/EventDetail";
import { pipeline } from "@/utils/pipeline";

function EventPage() {
  return <EventDetail />;
}

export default pipeline(memo)(EventPage);
