import { useEffect } from "react";
import axios from "axios";
import { shallow } from "zustand/shallow";
import challengesStore from "@/store/challengesStore";
import { ChallengeState } from "@/types/ChallengeState";
import BkrData from "@/types/BkrData";

const loadChallenges = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/process/definition`
  );
  return res.data;
};
const selector = (state: ChallengeState) => ({
  setChallenges: state.setChallenges,
  challenges: state.challenges
});

const useGetAllModels = () => {
  const { setChallenges, challenges } = challengesStore(selector, shallow);
  return useEffect(() => {
    if (!challenges) {
      loadChallenges().then((res) => {
        setChallenges(
          res.map((data: BkrData) => ({
            id: data.id,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            processKey: data.processKey,
            processData: JSON.parse(data.processData),
            previewData: JSON.parse(data.previewData),
            image: data.image
          }))
        );
      });
      console.log(challenges);
    }
  }, [challenges, setChallenges]);
};

export default useGetAllModels;
