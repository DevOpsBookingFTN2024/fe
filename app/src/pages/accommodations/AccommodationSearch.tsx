import { TextField, Stack, Button } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAccommodationFilterStore } from "@stores/accommodationStore";
import { DateRange } from "@mui/x-date-pickers-pro/models";

export default function AccommodationSearch() {
  const {
    filter,
    updateFilterCountry,
    updateFilterCity,
    updateFilterGuestCount,
    updateFilterStartDate,
    updateFilterEndDate,
  } = useAccommodationFilterStore();

  const [value, setValue] = useState<DateRange<Dayjs>>([
    dayjs(filter.startDate ?? new Date()),
    dayjs(filter.endDate ?? new Date()),
  ]);
  const [country, setCountry] = useState(filter.country ?? "");
  const [city, setCity] = useState(filter.city ?? "");
  const [guestCount, setGuestCount] = useState(filter.guestCount ?? "");

  const handleSearch = () => {
    updateFilterCountry(country);
    updateFilterCity(city);
    updateFilterGuestCount(guestCount.toString() || "1");
    if (value[0]) {
      updateFilterStartDate(value[0].endOf("day").toISOString());
    }
    if (value[1]) {
      const adjustedEndDate = value[1].endOf("day");
      updateFilterEndDate(adjustedEndDate?.toISOString());
    }
  };

  const isSearchDisabled = !guestCount || Number(guestCount) <= 0;

  return (
    <Stack spacing={2} direction="row">
      <DateRangePicker
        sx={{ width: "100%" }}
        value={value}
        localeText={{ start: "Check-in", end: "Check-out" }}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <TextField
        id="outlined-search-country"
        placeholder="Country"
        size="medium"
        type="search"
        variant="outlined"
        fullWidth
        onChange={(e) => setCountry(e.target.value)}
        value={country}
      />
      <TextField
        id="outlined-search-city"
        placeholder="City"
        size="medium"
        type="search"
        variant="outlined"
        fullWidth
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <TextField
        id="outlined-search-guests"
        placeholder="Guests"
        size="medium"
        type="number"
        variant="outlined"
        InputProps={{
          inputProps: { min: 1 },
        }}
        sx={{ minWidth: "100px" }}
        onChange={(e) => setGuestCount(e.target.value)}
        value={guestCount}
      />
      <Button disabled={isSearchDisabled} onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
}
