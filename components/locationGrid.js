import { Text, Avatar, Tooltip, Flex, Stack } from "@mantine/core";

const LocationGrid = ({ data, placeName }) => {
  return (
    <Stack align="center">
      <Text fw={600} fz="sm">
        {placeName}
      </Text>
      <Flex>
        {data.length > 0 ? (
          data.map((e) => {
            return (
              <Stack key={e.id} align="center">
                <Tooltip label={e.name}>
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
