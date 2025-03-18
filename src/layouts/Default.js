import Header from "./Header";
import Navigation from "./Navigation";
import { ToastProvider } from "../components/Task/ToastConfig";
function Default({ children }) {
  return (
    <div className="relative flex flex-col h-screen bg-white shadow-md">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto">
          <Header />
        </div>
      </div>

      <div className="flex-1 pt-20 pb-16 overflow-y-auto scrollbar-hide">
        <div className="container mx-auto">
          {" "}
          <ToastProvider>{children}</ToastProvider>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <Navigation />
      </div>
    </div>
  );
}

export default Default;
