import { Text } from "@mantine/core";

const SmolHeading = ({ text }) => {
  return (
    <Text fw={600} fz="sm" c="dimmed" align="center" mb="5px" mt="10px">
      {"✦ " + text + " ✦"}
    </Text>
  );
};

export default SmolHeading;
