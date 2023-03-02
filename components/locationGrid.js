import { Text, Avatar, Tooltip, Stack, SimpleGrid, Flex } from "@mantine/core";

const LocationGrid = ({ data, placeName }) => {
  return (
    <Stack align="center">
      <Text fw={600} fz="sm">
        {placeName}
      </Text>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {data.length > 0 ? (
          data.map((e) => {
            return (
              <Stack key={e.id} align="center" spacing={5} m={5}>
                <Tooltip label={e.name} withArrow>
                  <Avatar
                    src={e.image}
                    alt={e.name}
                    referrerPolicy="no-referrer"
                  />
                </Tooltip>
                <Text fz="sm">{e.name.split(" ")[0]}</Text>
              </Stack>
            );
          })
        ) : (
          <Stack align="center" spacing={0}>
            <Tooltip label="Nobody">
              <Avatar src={null} alt="Empty profile" color="green" radius="xl">
                🦗
              </Avatar>
            </Tooltip>
            <Text fz="sm">...</Text>
          </Stack>
        )}
      </Flex>
    </Stack>
  );
};

export default LocationGrid;
