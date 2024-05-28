import { Inter } from "next/font/google";
import UserList from "@/components/userList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <UserList />
    </>
  );
}
