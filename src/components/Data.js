import {
    SettingsIcon,
    HomeIcon,
    SearchIcon,
    ChatIcon,
    CreateIcon,
    UserIcon,
  } from "./Icons";
  
  export const SIDEBAR_DATA = [
    {
      id: 1,
      name: "Home",
      path: "home",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      name: "search",
      path: "search",
      icon: <SearchIcon />,
    },
    {
      id: 3,
      name: "create",
      path: "create",
      icon: <CreateIcon />,
    },
    {
      id: 4,
      name: "Chat",
      path: "chat",
      icon: <ChatIcon />,
    },
    {
      id: 5,
      name: "Profile",
      path: "accounts",
      icon: <UserIcon />,
    },
    {
      id: 6,
      name: "Settings",
      path: "settings",
      icon: <SettingsIcon />,
    },
  ];