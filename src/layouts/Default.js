import Header from "./Header";
import Navigation from "./Navigation";

function Default({ children }) {
  return (
    <div className="container flex flex-col">
      <Header />
      <div className="overflow-y-auto scrollbar-hide">{children}</div>
      <Navigation />
    </div>
  );
}

export default Default;
