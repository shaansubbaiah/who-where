import { useSession } from "next-auth/react";
import { Select, Text, Stack, Center, Flex, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons";
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
      <Stack align="center" spacing={0} w={300}>
        <Text fw={600} fz="xs" c="dimmed">
          VOTE
        </Text>
        <form
          onSubmit={form.onSubmit((values) => {
            let formData = values;
            formData.date = dayjs(selectedDate).format("DD/MM/YYYY");
            postData(formData);
            console.log(formData);
          })}
          sx={{
            width: "300px",
          }}
        >
          <Flex
            mih={50}
            gap="xs"
            justify="space-between"
            align="flex-start"
            direction="row"
            wrap="nowrap"
          >
            <Select
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

            <ActionIcon
              component="button"
              type="submit"
              variant="light"
              color="teal"
              size={36}
            >
              <IconCheck />
            </ActionIcon>
          </Flex>
        </form>
      </Stack>
    );
  else
    return (
      <Center>
        <Text fz="sm" c="dimmed" m="20px 0px">
          ~ login to vote ~
        </Text>
      </Center>
    );
};

export default VoteBox;
