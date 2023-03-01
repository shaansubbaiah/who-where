import LoginButton from "../components/loginButton";
import { Button, Center, Group, Stack } from "@mantine/core";
import ColorSchemeToggle from "../components/colorSchemeToggle";
import VoteBox from "../components/voteBox";

export default function Home() {
  return (
    <Center>
      <Stack>
        <Group>
          <ColorSchemeToggle />
          <LoginButton />
        </Group>
        <VoteBox />
      </Stack>
    </Center>
  );
}
