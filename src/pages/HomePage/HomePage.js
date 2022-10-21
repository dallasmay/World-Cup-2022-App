import { useSelector } from "react-redux";

const HomePage = () => {
  const userId = useSelector((state) => state.userId);

  return (
    <>
      <h1>HomePage</h1>
    </>
  );
};

export default HomePage;
