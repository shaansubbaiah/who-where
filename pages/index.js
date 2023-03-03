import { useState } from "react";
import {
  Badge,
  Button,
  Center,
  Divider,
  Group,
  Kbd,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import ColorSchemeToggle from "@/components/colorSchemeToggle";
import VoteBox from "@/components/voteBox";
import CalenderView from "@/components/calenderView";
import LoginButton from "@/components/loginButton";
import SmolHeading from "@/components/smolHeading";
import { IconBrandGithub, IconCalendar } from "@tabler/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";

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
      </Head>
      <Stack m={"10px 10px 40px 10px"} spacing={32}>
        <Group position="apart">
          <ColorSchemeToggle />
          <Title fz={24}>Who, Where?</Title>
          <LoginButton />
        </Group>

        {session ? (
          <Text align="center">
            Signed in as {session.user.name.split(" ")[0]}
          </Text>
        ) : (
          <></>
        )}

        <Stack spacing={0}>
          <SmolHeading text={"DATE"} />

          <DatePicker
            placeholder="Pick a date :)"
            withAsterisk
            minDate={dayjs(new Date()).toDate()}
            maxDate={dayjs(new Date()).add(90, "day").toDate()}
            value={selectedDate}
            onChange={onSelectedDateChange}
            icon={<IconCalendar size={24} />}
          />
        </Stack>
        <VoteBox selectedDate={selectedDate} />
        <CalenderView selectedDate={selectedDate} />
        <Stack align="center" spacing={0} w={"100%"}>
          <SmolHeading text="ABOUT" />
          <Paper p="md" withBorder w="inherit">
            <Stack align="center" spacing={40}>
              <Text fz="sm">POC to test SSO with NextAuth.</Text>

              <Group position="center" spacing={30}>
                <Group spacing={5}>
                  <Kbd>Ctrl</Kbd>+<Kbd>J</Kbd>
                </Group>
                <Text fz="sm">Toggle Theme</Text>
              </Group>

              <Stack align="center" spacing={0}>
                <Text fz="sm">Built With</Text>
                <Group spacing={5} position="center">
                  <Text fz="sm">NextJS</Text>
                  <Text fz="sm" c="dimmed">
                    +
                  </Text>
                  <Text fz="sm" c="blue">
                    Mantine
                  </Text>
                  <Text fz="sm" c="dimmed">
                    +
                  </Text>
                  <Text fz="sm" c="violet">
                    Prisma
                  </Text>
                  <Text fz="sm" c="dimmed">
                    +
                  </Text>
                  <Text fz="sm" c="teal">
                    PlanetScale
                  </Text>
                </Group>
              </Stack>

              <Button
                leftIcon={<IconBrandGithub size={16} />}
                maw={200}
                color="gray"
                variant="subtle"
                component={Link}
                href="https://github.com/shaansubbaiah/who-where"
              >
                SOURCE
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
