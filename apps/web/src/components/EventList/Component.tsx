import { memo } from "react";

import { pipeline } from "@/utils/pipeline";

import EventListView from "./View";

import type { EventListProps } from "./types";

function EventList(props: EventListProps) {
  return <EventListView {...props} />;
}

export default pipeline(memo)(EventList);
