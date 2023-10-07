import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const RollData = {
    Admin: [
      { to: "/layout/homepage", icon: <HomeIcon className="Nav-icons" /> },
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
    ],
    CBTexpert: [
      { to: "/layout/homepage", icon: <HomeIcon className="Nav-icons" /> },
      { to: "/layout/batches", icon: <GroupsIcon className="Nav-icons" /> },
      { to: "/layout/examinations", icon: <HomeIcon className="Nav-icons" /> },
      { to: "/layout/mid-exams", icon: <GroupsIcon className="Nav-icons" /> },
      { to: "/layout/staff", icon: <PersonIcon className="Nav-icons" /> },
    ],
  };
  
  export default RollData;