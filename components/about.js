import Link from "next/link";
import { Stack, Text, Group, Kbd, Paper, Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import SmolHeading from "./smolHeading";

const About = () => {
  return (
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
  );
};

export default About;
