import axios from "axios";

const rpgo = axios.create({ baseURL: "https://rp-go.herokuapp.com/api" });

export const getChallenges = async () => {
  const { data } = await rpgo.get("/challenges");
  return data.challenges;
};

export const postActivity = async ({
  username,
  distanceTravelled,
  metersClimbed,
  stepCount,
  timeElapsed,
  activityType,
  challengeTitle,
  polylineArray,
}) => {
  const { data } = await rpgo.post("/activities", {
    username,
    distanceTravelled,
    metersClimbed,
    stepCount,
    timeElapsed,
    activityType,
    challenge_ID: challengeTitle,
    polylineArray,
    date: Date.now(),
  });
  return data.postedActivity;
};

export const patchActivity = async ({
  distanceTravelled,
  metersClimbed,
  stepCount,
  timeElapsed,
  activityID,
}) => {
  const { data } = await rpgo.patch(`/activities/${activityID}`, {
    distanceTravelled,
    metersClimbed,
    stepCount,
    timeElapsed,
  });

  return data;
};

export const patchUserXP = async (username, xp) => {
  const { data } = await rpgo.patch(`users/${username}`, {
    amount_to_increase: xp,
    property_to_change: "xp",
  });

  return data;
};
