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
    {
      to: "/layout/batches",
      icon: <GroupsIcon className="Nav-icons" />,
      text: "Batches",
    },
    {
      to: "/layout/colleges",
      icon: <CorporateFareIcon className="Nav-icons" />,
      text: "Colleges",
    },
    {
      to: "/layout/staff",
      icon: <PersonIcon className="Nav-icons" />,
      text: "Staff",
    },
    {
      to: "/layout/notifications",
      icon: <NotificationsActiveIcon className="Nav-icons" />,
      text: "Portal Notification",
    },
    {
      to: "/layout/examnotifications",
      icon: <NotificationsActiveIcon className="Nav-icons" />,
      text: "Exam Notification",
    },
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      text: "LogOut",
    },
  ],
  CBTexpert: [
    {
      to: "/layout/homepage",
      icon: <HomeIcon className="Nav-icons" />,
      text: "home",
    },
    {
      to: "/layout/batches",
      icon: <GroupsIcon className="Nav-icons" />,
      text: "Batches",
    },
    {
      to: "/layout/examdata",
      icon: <HomeIcon className="Nav-icons" />,
      text: "Examinations",
    },
    {
      to: "/layout/examnotifications",
      icon: <NotificationsActiveIcon className="Nav-icons" />,
      text: "Notification",
    },
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      text: "LogOut",
    },
  ],
  Examinationadmin: [
    {
      to: "/layout/homepage",
      icon: <HomeIcon className="Nav-icons" />,
      text: "home",
    },
    {
      to: "/layout/batches",
      icon: <GroupsIcon className="Nav-icons" />,
      text: "Batches",
    },
    {
      to: "/layout/examdata",
      icon: <GradingIcon className="Nav-icons" />,
      text: "Examinations",
    },
    // {
    //   to: "/layout/InternalMarks",
    //   icon: <HubIcon className="Nav-icons" />,
    //   text: "Internal Marks",
    // },

    {
      to: "/layout/staff",
      icon: <PersonIcon className="Nav-icons" />,
      text: "Staff",
    },
    {
      to: "/layout/examnotifications",
      icon: <NotificationsActiveIcon className="Nav-icons" />,
      text: "Notification",
    },
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      text: "LogOut",
    },
  ],
  ManageUniversities :[
    {
      to: "/layout/homepage",
      icon: <HomeIcon className="Nav-icons" />,
      text: "Home",
    },
    {
      icon:<CorporateFareIcon className="Nav-icons" />,
      text:"University",
      childrens:[
      {
      to:"/layout/branches",
      icon: <HubIcon className="Nav-icons" />,
      text:"Branches",
      }
      ]
    },
    {
      to: "/layout/batches",
      icon: <GroupsIcon className="Nav-icons" />,
      text: "Batches",
    },
    {
      to: "/layout/examdata",
      icon: <GradingIcon className="Nav-icons" />,
      text: "Examinations",
    },
    {
      to: "/layout/staff",
      icon: <PersonIcon className="Nav-icons" />,
      text: "Staff",
    },
    {
      to: "/home",
      icon: <LogoutIcon className="Nav-icons" />,
      text: "LogOut",
    },
  ]
};

export default RollData;
