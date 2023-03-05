import { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Group, Stack, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";
import dayjs from "dayjs";
import ColorSchemeToggle from "@/components/colorSchemeToggle";
import VoteBox from "@/components/voteBox";
import CalenderView from "@/components/calenderView";
import LoginButton from "@/components/loginButton";
import SmolHeading from "@/components/smolHeading";
import About from "@/components/about";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: session } = useSession();

  const onSelectedDateChange = (value) => {
    setSelectedDate(value);
  };

  return (
    <>
      <Head>
        <title>Who, Where?</title>
        <meta property="og:title" content="Who, Where?" key="title" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Stack
        m={"0 auto"}
        p={"10px 10px 40px 10px"}
        spacing={32}
        sx={{
          maxWidth: "500px",
        }}
      >
        {/* Titlebar and navigation  */}
        <Group position="apart">
          <ColorSchemeToggle />
          <Title fz={24}>Who, Where?</Title>
          <LoginButton />
        </Group>

        {/* Greeter  */}
        {session ? (
          <Group position="center" spacing={5}>
            <Text>Signed in as</Text>
            <Text color="blue">{session.user.name.split(" ")[0]}</Text>
          </Group>
        ) : (
          <></>
        )}

        {/* Central Date Picker  */}
        <Stack spacing={0}>
          <SmolHeading text={"DATE"} />
          <DatePicker
            placeholder="Pick a date :)"
            withAsterisk
            minDate={dayjs(new Date()).subtract(1, "month").toDate()}
            maxDate={dayjs(new Date()).add(2, "month").toDate()}
            value={selectedDate}
            onChange={onSelectedDateChange}
            icon={<IconCalendar size={24} />}
            size="md"
          />
        </Stack>

        {/* Vote Section */}
        <VoteBox selectedDate={selectedDate} />

        {/* View Section  */}
        <CalenderView selectedDate={selectedDate} />

        {/* About Section  */}
        <About />

        {/* Me :)  */}
        <Text fz="sm" c="dimmed" align="center">
          © Shaan Subbaiah, 2023
        </Text>
      </Stack>
    </>
  );
}
