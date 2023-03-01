import { Select, Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

const VoteBox = () => {
  const validLocations = ["Manyata", "EGL", "Chennai", "Home"];

  const form = useForm({
    initialValues: {
      location: "",
      date: new Date(),
    },
    validate: {
      location: (v) => (validLocations.includes(v) ? null : "Invalid Location"),
      date: (v) => (v != null ? null : "Invalid Date"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <DatePicker
        placeholder="Pick date"
        label="Event Date"
        withAsterisk
        minDate={dayjs(new Date()).toDate()}
        maxDate={dayjs(new Date()).add(90, "day").toDate()}
        {...form.getInputProps("date")}
      />

      <Select
        label="Location"
        placeholder="Pick EGL but anything is fine"
        searchable
        data={[
          { value: "Manyata", label: "BLR: Manyata" },
          { value: "EGL", label: "BLR: EGL" },
          { value: "Chennai", label: "CHN: Neville" },
          { value: "Home", label: "WFH: Home" },
        ]}
        {...form.getInputProps("location")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default VoteBox;
