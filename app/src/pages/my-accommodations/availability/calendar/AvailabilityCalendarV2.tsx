import {
  createAvailability,
  getAvailabilitiesByAccommodation,
  InputAvailability,
  updateAvailability,
} from "@api/accommodations/availability";
import { Button, CardContent, Typography } from "@mui/material";
import { useAvailabilityModalStore } from "@stores/availabilityStore";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "./Calendar.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
dayjs.extend(timezone);

const djLocalizer = dayjsLocalizer(dayjs);

type EvType = {
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
  resource?: any;
};

const AvailabilityCalendarV2 = () => {
  const openAvailibilityModal = useAvailabilityModalStore(
    (state) => state.openModal
  );

  const { accommodationId } = useParams();
  const { data: availabilities } = useQuery({
    queryKey: ["availabilities"],
    queryFn: async () => {
      return getAvailabilitiesByAccommodation(accommodationId ?? "");
    },
  });
  const processedEvents = availabilities?.map((event) => {
    const startDate = new Date(event.date);
    const endDate = new Date(event.date);
    endDate.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    return {
      title: "",
      start: startDate,
      end: endDate,
      allDay: true,
      color: event.isAvailable ? "green" : event.isReserved ? "red" : "grey",
      resource: {
        id: event.id,
        pricePerGuest: event.pricePerGuest,
        pricePerUnit: event.pricePerUnit,
        isAvailable: event.isAvailable,
        isReserved: event.isReserved,
      },
    };
  });
  const handleAddAvailability = (slotInfo?: EvType) =>
    openAvailibilityModal(
      {
        dateFrom: slotInfo?.start,
        dateTo: slotInfo?.end,
        accommodationId: accommodationId,
      } as InputAvailability,
      createAvailability,
      true,
      false
    );

  const eventColors = (event: EvType) => ({
    style: {
      backgroundColor:
        event.color === "green"
          ? "#39b69a"
          : event.color === "red"
          ? "#fc4b6c"
          : "#d3d3d3",
      color: "white",
      borderRadius: "0px", // Ensure it spans the whole day without rounded corners
      border: "none",
    },
  });

  const editEvent = (event: any) => {
    openAvailibilityModal(
      {
        id: event.resource.id,
        accommodationId: accommodationId,
        dateFrom: event.start,
        dateTo: event.end,
        pricePerGuest: event.resource.pricePerGuest,
        pricePerUnit: event.resource.pricePerUnit,
      } as InputAvailability,
      updateAvailability,
      true,
      true
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Availability Planner
      </Typography>
      <CardContent>
        <Button
          sx={{ marginBottom: 3 }}
          onClick={() =>
            handleAddAvailability({ start: new Date(), end: new Date() })
          }
        >
          Add Availability
        </Button>
        <Calendar
          selectable
          localizer={djLocalizer}
          events={processedEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={["month"]} // Disable hourly views by restricting to 'month'
          style={{ height: "400px" }}
          eventPropGetter={eventColors}
          onSelectEvent={(event) => editEvent(event)}
          onSelectSlot={(slotInfo: EvType) => {
            if (
              slotInfo.resource &&
              slotInfo.resource.isAvailable &&
              !slotInfo.resource.isReserved
            ) {
              editEvent(slotInfo);
            } else {
              const endDate = new Date(slotInfo.end ?? new Date());
              endDate.setDate(endDate.getDate() - 1);

              handleAddAvailability({
                start: slotInfo.start,
                end: endDate,
              });
            }
          }}
          allDayAccessor={(event) => event.allDay}
        />
      </CardContent>
    </div>
  );
};

export default AvailabilityCalendarV2;
