import { useSession } from "next-auth/react";
import { Select, Group, Button, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";

const VoteBox = () => {
  const { data: session } = useSession();

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

  const postData = async (data) => {
    const response = await fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  if (session)
    return (
      <form
        // onSubmit={handleSubmit}
        onSubmit={form.onSubmit((values) => {
          postData(values);
          console.log(values);
        })}
      >
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
  else return <Text>Login to vote</Text>;
};

export default VoteBox;
