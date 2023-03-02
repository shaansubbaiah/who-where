import { useSession, signIn, signOut } from "next-auth/react";
import { Button, ActionIcon, Group, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    // console.log(session);
    return (
      <Group>
        <Text fz="sm">Hi, {session.user.name.split(" ")[0]} 👋</Text>
        <ActionIcon
          variant="light"
          color="red"
          onClick={() => signOut()}
          title="Sign Out"
        >
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    );
  }
  return (
    <Group>
      <Button compact variant="light" color="blue" onClick={() => signIn()}>
        Sign in
      </Button>
    </Group>
  );
};

export default LoginButton;
