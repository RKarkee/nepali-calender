import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { CalendarProvider } from "../context/CalendarContext";

const Layout = () => {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-col md:flex-row flex-1 gap-10 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto py-4">
                <Outlet />
              </div>
            </main>
            <Sidebar />
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
};

export default Layout;
