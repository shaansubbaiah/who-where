import { useSession } from "next-auth/react";
import {
  Select,
  Group,
  Button,
  Text,
  Paper,
  Stack,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

const VoteBox = ({ selectedDate }) => {
  const { data: session } = useSession();

  const validLocations = ["Manyata", "EGL", "Chennai", "Home"];

  const form = useForm({
    initialValues: {
      location: "",
    },
    validate: {
      location: (v) => (validLocations.includes(v) ? null : "Invalid Location"),
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
      <Paper shadow="md" radius="lg" p="md">
        <Stack align="center">
          <Text fw={600}>Vote</Text>
          <form
            onSubmit={form.onSubmit((values) => {
              let formData = values;
              formData.date = dayjs(selectedDate).format("DD/MM/YYYY");
              postData(formData);
              console.log(formData);
            })}
          >
            <Stack align="center">
              <Select
                // label="Location"
                placeholder="Pick a location"
                searchable
                data={[
                  { value: "Manyata", label: "BLR: Manyata" },
                  { value: "EGL", label: "BLR: EGL" },
                  { value: "Chennai", label: "CHN: Neville" },
                  { value: "Home", label: "WFH: Home" },
                ]}
                {...form.getInputProps("location")}
              />

              <Button type="submit" variant="default">
                Submit
              </Button>
            </Stack>
          </form>
          {/* <Text c="green">{dayjs(selectedDate).format("DD/MM/YYYY")}</Text> */}
        </Stack>
      </Paper>
    );
  else
    return (
      <Center>
        <Text fz="sm" c="dimmed">
          Login to vote
        </Text>
      </Center>
    );
};

export default VoteBox;
