import HomeView from "@/components/views/HomeView";
import { NextPage } from "next";

const HomePage: NextPage = (props) => {
  return (
    <>
      <HomeView {...props} />
    </>
  );
};

export default HomePage;
