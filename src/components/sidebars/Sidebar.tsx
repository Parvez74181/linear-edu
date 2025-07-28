"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowBigRight,
  Bell,
  ChartLine,
  Clipboard,
  CreditCard,
  LibraryBig,
  Menu,
  Presentation,
  Target,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsOpen(!isMobileView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:relative h-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out z-30 ${
          isOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        {/* Sidebar content remains the same */}
        <div className={`h-full flex flex-col ${isOpen ? "px-4" : "px-2"}`}>
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 self-end my-4"
          >
            {isOpen ? (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <ArrowBigRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Navigation links */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {[
                {
                  name: "মেধা যাচাই",
                  icon: <Target className="text-[#f49e25]" />,
                  href: "/",
                },
                {
                  name: "মক পরীক্ষা",
                  icon: <Clipboard className="text-[#f49e25]" />,
                  href: "/projects",
                },
                {
                  name: "লিডারবোর্ড",
                  icon: <ChartLine className="text-[#f49e25]" />,
                  href: "/team",
                },
                {
                  name: "সকল কোর্সসমূহ",
                  icon: <Presentation className="text-[#f49e25]" />,
                  href: "/calendar",
                },
                {
                  name: "প্রশ্ন ব্যাংক",
                  icon: <LibraryBig className="text-[#f49e25]" />,
                  href: "/settings",
                },

                {
                  name: "নোটিফিকেশন",
                  icon: <Bell className="text-[#f49e25]" />,
                  href: "/settings",
                },
                {
                  name: "সাবস্ক্রিপশন",
                  icon: <CreditCard className="text-[#f49e25]" />,
                  href: "/users/student/dashboard/subscription",
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      !isOpen ? "justify-center" : ""
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className=""></span>
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          {isOpen && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
