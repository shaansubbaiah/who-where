import LoginButton from "../components/loginButton";
import { Button, Center, Group, Stack, Text } from "@mantine/core";
import ColorSchemeToggle from "../components/colorSchemeToggle";
import VoteBox from "../components/voteBox";
import CalenderView from "@/components/calenderView";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectedDateChange = (value) => {
    setSelectedDate(value);
  };

  return (
    <Center>
      <Stack>
        <Group position="apart">
          <ColorSchemeToggle />
          <LoginButton />
        </Group>
        <DatePicker
          placeholder="Pick date"
          withAsterisk
          minDate={dayjs(new Date()).toDate()}
          maxDate={dayjs(new Date()).add(90, "day").toDate()}
          value={selectedDate}
          onChange={onSelectedDateChange}
        />
        {/* <Text>{dayjs(selectedDate).format("DD/MM/YYYY")}</Text> */}
        <VoteBox selectedDate={selectedDate} />
        <CalenderView selectedDate={selectedDate} />
      </Stack>
    </Center>
  );
}
