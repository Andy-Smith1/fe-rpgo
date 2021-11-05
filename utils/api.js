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
  return data;
};
