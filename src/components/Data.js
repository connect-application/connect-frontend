import { Logout } from "@mui/icons-material";
import {
    SettingsIcon,
    HomeIcon,
    SearchIcon,
    ChatIcon,
    CreateIcon,
    UserIcon,
    NotificationIcon
  } from "./Icons";

  
  export const SIDEBAR_DATA = [
    {
      id: 1,
      name: "Home",
      path: "/home",
      component: "HomeComponent",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      name: "search",
      path: "/search",
      icon: <SearchIcon />,
    },
    {
      id: 3,
      name: "create",
      path: "/home",
      component: "HomeComponent",
      icon: <CreateIcon />,
    },
    {
      id: 4,
      name: "Chat",
      path: "/chat",
      icon: <ChatIcon />,
    },
    {
      id: 5,
      name: "Notifications",
      path: "/notifications",
      component: "Notifications",
      icon: <NotificationIcon />,
    },
    {
      id: 6,
      name: "Profile",
      path: "/profile",
      component: "ProfileComponent",
      icon: <UserIcon />,
    },
    {
      id: 7,
      name: "Settings",
      path: "/settings",
      component: "Settings",
      icon: <SettingsIcon />,
    },
    {
      id: 8,
      name: "Logout",
      path: "/#",
      icon: <Logout />,
    },
  ];