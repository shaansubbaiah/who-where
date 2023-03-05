import { useSession, signIn, signOut } from "next-auth/react";
import { Button, ActionIcon, Group } from "@mantine/core";
import { IconLogout } from "@tabler/icons";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    // console.log(session);
    return (
      <Group>
        <ActionIcon
          variant="light"
          color="red"
          size={36}
          onClick={() => signOut()}
          title="Sign Out"
        >
          <IconLogout size={24} />
        </ActionIcon>
      </Group>
    );
  }
  return (
    <Group>
      <Button
        variant="light"
        color="blue"
        onClick={() => signIn()}
        sx={{
          padding: "5px",
        }}
      >
        Login
      </Button>
    </Group>
  );
};

export default LoginButton;
