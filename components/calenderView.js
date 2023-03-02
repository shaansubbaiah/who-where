import {
  Button,
  Text,
  Paper,
  Table,
  Stack,
  Avatar,
  Box,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
import dayjs from "dayjs";
import useSWR, { mutate } from "swr";
import LocationGrid from "./locationGrid";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CalenderView = ({ selectedDate }) => {
  const { data, error, isLoading } = useSWR("/api/vote", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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

  console.log("data with user info", dataWithUserInfo);

  return (
    <Paper shadow="md" radius="lg" p="md">
      {/* <ActionIcon
        onClick={() => {
          mutate("/api/vote");
        }}
        color="green"
        radius="xl"
      >
        <IconRefresh size={16} />
      </ActionIcon> */}
      {/* <Text c="blue">{dayjs(selectedDate).format("DD/MM/YYYY")}</Text> */}
      <Stack>
        <LocationGrid placeName="EGL" data={atEGL} />
        <LocationGrid placeName="Manyata" data={atManyata} />
        <LocationGrid placeName="Chennai" data={atChennai} />
        <LocationGrid placeName="Home" data={atHome} />
        {/* <Box>
          <Text>EGL</Text>
          {atEGL.map((e) => {
            return (
              <Box key={e.id}>
                <Tooltip label={e.name}>
                  <Avatar
                    src={e.image}
                    alt={e.name}
                    referrerPolicy="no-referrer"
                  />
                </Tooltip>
                <Text fz="sm">{e.name.split(" ")[0]}</Text>
              </Box>
            );
          })}
        </Box> */}
      </Stack>
    </Paper>
  );
};

export default CalenderView;
