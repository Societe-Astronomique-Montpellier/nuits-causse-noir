import type {EventDocument} from "~/prismicio-types";

type GroupedByDay = Record<string, EventDocument[]>;

export const useGroupEvents = (events: EventDocument[] | undefined) => {
    return events?.reduce<GroupedByDay>((acc: GroupedByDay, event: EventDocument) => {
        const day = event.data.date_event?.split('T')[0]; // Extract the date part (YYYY-MM-DD)
        if (day !== undefined && !acc[day]) {
            acc[day] = [];
        }

        if (day !== undefined) {
            acc[day].push(event);
        }
        return acc;
    }, {});
}