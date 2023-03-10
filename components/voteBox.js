import { useState } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { Select, Text, Stack, Flex, Button, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconMapPin } from "@tabler/icons";
import dayjs from "dayjs";
import locations from "./locations";
import SmolHeading from "./smolHeading";

const useStyles = createStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
}));

const validLocations = locations.map((e) => e.name);

const selectData = locations.map((e) => {
  return { value: e.name, label: e.label };
});

const VoteBox = ({ selectedDate, nearestWeekday }) => {
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
        <SmolHeading text="VOTE" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsSubmitting(true);
            let formData = values;
            formData.date = dayjs(selectedDate).format("DD/MM/YYYY");
            await postData(formData);
            // console.log(formData);
            setIsSubmitting(false);
            mutate("/api/vote");
          })}
          className={classes.fullWidth}
        >
          <Flex
            gap="xs"
            justify="center"
            align="center"
            direction="row"
            wrap="nowrap"
          >
            <Select
              placeholder="Pick a location"
              disabled={selectedDate == null}
              icon={<IconMapPin size={24} />}
              data={selectData}
              size="md"
              {...form.getInputProps("location")}
            />

            <Button
              variant="light"
              type="submit"
              color="teal"
              size="md"
              sx={{
                flexGrow: 1,
              }}
              loading={isSubmitting}
              // disable voting when selected date is null for some reason
              //                          (or)
              // if the date selected is in the past / before the current
              // nearest weekday
              disabled={
                selectedDate == null ||
                selectedDate.setHours(0, 0, 0, 0) <
                  nearestWeekday.setHours(0, 0, 0, 0)
              }
              leftIcon={<IconCheck />}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Stack>
    );
  else return <Text align="center">Login to vote.</Text>;
};

export default VoteBox;
