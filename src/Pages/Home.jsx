import Header from "../Components/Header";
import MainContainer from "../Components/MainContainer";
import SecondaryContainer from "../Components/SecondaryContainer";

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-visible select-none">
      <Header />

      <main className="w-full space-y-3 pb-8">
        <MainContainer />
        <SecondaryContainer />
      </main>
    </div>
  );
};

export default Home;