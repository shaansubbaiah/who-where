import useSWR from "swr";
import { Text, Paper, Stack, Center, Loader } from "@mantine/core";
import dayjs from "dayjs";
import LocationGrid from "./locationGrid";
import locations from "./locations";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CalenderView = ({ selectedDate }) => {
  const { data, error, isLoading } = useSWR("/api/vote", fetcher);

  if (error) return <div>I messed up, failed to load</div>;
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

  let atEGL = dataWithUserInfo.filter((e) => e.location == "EGL");
  let atManyata = dataWithUserInfo.filter((e) => e.location == "Manyata");
  let atChennai = dataWithUserInfo.filter((e) => e.location == "Chennai");
  let atHome = dataWithUserInfo.filter((e) => e.location == "Home");

  const locationData = locations.map((loc) => ({
    votes: dataWithUserInfo.filter((e) => e.location == loc.name),
    ...loc,
  }));

  //   console.log("data with user info", dataWithUserInfo);

  return (
    <Stack align="center" spacing={0} w={"100%"}>
      <Text fw={600} fz="xs" c="dimmed">
        VIEW
      </Text>
      <Paper radius="lg" p="md" withBorder w="inherit">
        <Stack>
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
          {/* <LocationGrid placeName="EGL" data={atEGL} />
          <LocationGrid placeName="Manyata" data={atManyata} />
          <LocationGrid placeName="Chennai" data={atChennai} />
          <LocationGrid placeName="Home" data={atHome} /> */}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default CalenderView;
