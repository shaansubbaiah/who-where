import {
  Text,
  Avatar,
  Tooltip,
  Stack,
  SimpleGrid,
  Flex,
  Badge,
} from "@mantine/core";

const LocationGrid = ({ data, placeName, color }) => {
  return (
    <Stack align="center" mb={20}>
      <Badge size="sm" radius="sm" color={color}>
        {placeName}
      </Badge>
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
