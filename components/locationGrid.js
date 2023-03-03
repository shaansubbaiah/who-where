import { Text, Avatar, Tooltip, Stack, Flex, Badge } from "@mantine/core";

const LocationGrid = ({ data, placeName, color }) => {
  if (data.length == 0) return null;

  return (
    <Stack align="center" mb={20}>
      <Badge radius="sm" color={color} variant="light">
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
        {data.map((e) => {
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
        })}
      </Flex>
    </Stack>
  );
};

export default LocationGrid;
