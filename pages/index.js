import { useState } from "react";
import { Center, Group, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import ColorSchemeToggle from "@/components/colorSchemeToggle";
import VoteBox from "@/components/voteBox";
import CalenderView from "@/components/calenderView";
import LoginButton from "@/components/loginButton";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectedDateChange = (value) => {
    setSelectedDate(value);
  };

  return (
    <Center>
      <Stack m={"20px 5%"} maw={300}>
        <Group position="apart">
          <ColorSchemeToggle />
          <LoginButton />
        </Group>

        <Stack spacing={0}>
          <Text fw={600} fz="xs" c="dimmed" align="center">
            DATE
          </Text>

          <DatePicker
            placeholder="Pick date"
            withAsterisk
            minDate={dayjs(new Date()).toDate()}
            maxDate={dayjs(new Date()).add(90, "day").toDate()}
            value={selectedDate}
            onChange={onSelectedDateChange}
          />
        </Stack>
        <VoteBox selectedDate={selectedDate} />
        <CalenderView selectedDate={selectedDate} />
      </Stack>
    </Center>
  );
}
