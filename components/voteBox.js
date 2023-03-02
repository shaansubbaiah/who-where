import { useSession } from "next-auth/react";
import {
  Select,
  Text,
  Stack,
  Center,
  Flex,
  Button,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMapPin } from "@tabler/icons";
import dayjs from "dayjs";
import locations from "./locations";
import { useState } from "react";
import { mutate } from "swr";

const useStyles = createStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
}));

const validLocations = locations.map((e) => e.name);

const selectData = locations.map((e) => {
  return { value: e.name, label: e.label };
});

const VoteBox = ({ selectedDate }) => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { classes } = useStyles();

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
      <Stack align="center" spacing={0}>
        <Text fw={600} fz="xs" c="dimmed">
          VOTE
        </Text>
        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsSubmitting(true);
            let formData = values;
            formData.date = dayjs(selectedDate).format("DD/MM/YYYY");
            await postData(formData);
            console.log(formData);
            setIsSubmitting(false);
            mutate("/api/vote");
          })}
          className={classes.fullWidth}
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
              icon={<IconMapPin size={16} />}
              data={
                selectData
                //   [
                //   { value: "Manyata", label: "BLR: Manyata" },
                //   { value: "EGL", label: "BLR: EGL" },
                //   { value: "Chennai", label: "CHN: Neville" },
                //   { value: "Home", label: "WFH: Home" },
                // ]
              }
              {...form.getInputProps("location")}
            />

            {/* <ActionIcon
              component="button"
              type="submit"
              variant="light"
              color="teal"
              size={36}
            >
              <IconCheck />
            </ActionIcon> */}
            <Button
              variant="light"
              type="submit"
              color="teal"
              loading={isSubmitting}
              fullWidth
              maw={90}
            >
              Submit
            </Button>
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
