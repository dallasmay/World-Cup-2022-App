import { useSelector } from "react-redux";

const HomePage = () => {
  const teamName = useSelector((state) => state.teamName);

  return (
    <>
      <h1>HomePage</h1>
      {teamName}
    </>
  );
};

export default HomePage;
