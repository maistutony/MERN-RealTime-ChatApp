import LandingPage from "./Pages/LandingPage/LandingPage";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import ChatRoom from "./components/ChatRoom";

export default function Routes() {
  const { username, id } = useContext(UserContext);

  if (username) {
    return <ChatRoom />;
  }

  return <LandingPage />;
}
