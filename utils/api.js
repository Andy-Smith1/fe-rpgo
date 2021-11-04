import axios from "axios";

const rpgo = axios.create({ baseURL: "https://rp-go.herokuapp.com/api" });

export const getChallenges = async () => {
  const { data } = await rpgo.get("/challenges");
  return data.challenges;
};
