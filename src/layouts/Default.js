import Header from "./Header";
import Navigation from "./Navigation";

function Default({ children }) {
  return (
    <div className="container flex flex-col overflow-hidden">
      <Header />
      <div className="overflow-y-overlay bg-orange pb-16 scrollbar-hide">{children}</div>
      <Navigation />
    </div>
  );
}

export default Default;
