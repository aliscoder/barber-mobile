import useAuth from "./useAuth";

const useGender = () => {
  const { user } = useAuth();

  return { isMale: user.gender === "male", isFemale: user.gender === "female" };
};

export default useGender;
