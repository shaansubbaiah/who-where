import LoginButton from "../components/loginButton";
import { Button, Center, Group } from "@mantine/core";
import ColorSchemeToggle from "../components/colorSchemeToggle";

export default function Home() {
  return (
    <Center>
      <Group>
        <ColorSchemeToggle />
        <LoginButton />
      </Group>
    </Center>
  );
}
