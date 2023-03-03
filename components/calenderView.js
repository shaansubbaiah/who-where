import useSWR from "swr";
import {
  Paper,
  Stack,
  Center,
  Loader,
  Text,
  Progress,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import LocationGrid from "./locationGrid";
import locations from "./locations";
import SmolHeading from "./smolHeading";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CalenderView = ({ selectedDate }) => {
  const { data, error, isLoading } = useSWR("/api/vote", fetcher);

  const theme = useMantineTheme();

  if (error) return <Text align="center">I f'd up, it failed to load</Text>;
  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  //   console.log(data);

  let dataForSelectedDate = data.content.voteData.filter(
    (e) => e.date == dayjs(selectedDate).format("DD/MM/YYYY")
  );
  //   console.log("data for selected date", dataForSelectedDate);

  let dataWithUserInfo = [];

  dataForSelectedDate.forEach((obj) => {
    let userInfo = data.content.userData.filter((e) => e.id == obj.userId);
    // console.log("userInfo", userInfo);

    dataWithUserInfo.push({
      id: obj.id,
      date: obj.date,
      location: obj.location,
      userId: obj.userId,
      name: userInfo[0].name,
      email: userInfo[0].email,
      image: userInfo[0].image,
    });
  });

  const locationData = locations.map((loc) => ({
    votes: dataWithUserInfo.filter((e) => e.location == loc.name),
    ...loc,
  }));

  //   console.log("data with user info", dataWithUserInfo);

  console.log("loc data", locationData);
  let votesAvailable = false;
  locationData.forEach((e) => {
    if (e.votes.length > 0) votesAvailable = true;
  });
  // console.log("votes there?", votesAvailable);

  let totalVotes = 0;
  locationData.forEach((e) => {
    totalVotes += e.votes.length;
  });

  locationData.forEach((e) => {
    e.voteFraction = (e.votes.length / totalVotes) * 100;
  });
  console.log("votesplit", locationData);

  return (
    <Stack align="center" spacing={0} w={"100%"}>
      <SmolHeading text="VIEW" />

      <Paper p="md" withBorder w="inherit">
        {selectedDate == null || !votesAvailable ? (
          <Center m="50px auto">💀</Center>
        ) : (
          <Stack>
            <Progress
              mb={20}
              sections={locationData.map((e) => ({
                value: e.voteFraction,
                color:
                  theme.colorScheme == "dark"
                    ? theme.colors[e.color][4]
                    : e.color,
              }))}
            />
            {locationData.map((e) => {
              return (
                <LocationGrid
                  placeName={e.name}
                  data={e.votes}
                  color={e.color}
                  key={e.name}
                />
              );
            })}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

export default CalenderView;
