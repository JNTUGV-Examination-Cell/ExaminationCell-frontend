import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import GradingIcon from "@mui/icons-material/Grading";
import HubIcon from "@mui/icons-material/Hub";
import LogoutIcon from "@mui/icons-material/Logout";


const RollData = {
  Admin: [
    {
      to: "/layout/homepage",
      icon: <HomeIcon className="Nav-icons" />,
      text: "home",
    },
    { to: "/layout/batches", icon: <GroupsIcon className="Nav-icons" /> },
    {
      to: "/layout/colleges",
      icon: <CorporateFareIcon className="Nav-icons" />,
    },
    { to: "/layout/staff", icon: <PersonIcon className="Nav-icons" /> },
    {
      to: "/layout/notifications",
      icon: <NotificationsActiveIcon className="Nav-icons" />,
    },
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      onclick: () => {
        sessionStorage.removeItem("userRole");
      },
    },
  ],
  CBTexpert: [
    {
      to: "/layout/homepage",
      icon: <HomeIcon className="Nav-icons" />,
      text: "home",
    },
    { to: "/layout/batches", icon: <GroupsIcon className="Nav-icons" /> },
    { to: "/layout/examdata", icon: <HomeIcon className="Nav-icons" /> },
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      onclick: () => {
        sessionStorage.removeItem("userRole");
      },
    },
  ],
  Examinationadmin: [
    {
      to: "/layout/homepage",
      icon: <HomeIcon className="Nav-icons" />,
      text: "home",
    },
    { to: "/layout/batches", icon: <GroupsIcon className="Nav-icons" />,text: "Batches" },
    { to: "/layout/examdata", icon: <GradingIcon className="Nav-icons" />,text: "Examinations" },
    { to: "/layout/InternalMarks", icon: <HubIcon className="Nav-icons" />,text: "Internal Marks" },
    { to: "/layout/staff", icon: <PersonIcon className="Nav-icons" />,text: "Staff"},
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      onclick: () => {
        sessionStorage.removeItem("userRole");
      },
      text: "LogOut",
    },
  ],
};

export default RollData;
