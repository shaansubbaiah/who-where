import { Button, ActionIcon, Group, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    // console.log(session);
    return (
      <Group>
        <Text fz="sm">Hi, {session.user.name.split(" ")[0]} 👋</Text>
        {/* <Button onClick={() => signOut()}>Sign out</Button> */}
        <ActionIcon
          variant="subtle"
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
      <Button compact variant="subtle" onClick={() => signIn()}>
        Sign in
      </Button>
    </Group>
  );
};

export default LoginButton;
