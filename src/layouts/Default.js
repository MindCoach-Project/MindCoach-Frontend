import Header from "./Header";
import Navigation from "./Navigation";

function Default({ children }) {
  return (
    <div className="flex flex-col">
      <div className="container">
        <Header />
        <div className="scrollbar-hide">{children}</div>
      </div>
      <Navigation />
    </div>
  );
}

export default Default;
