import Error from "@/components/error";
import Loader from "@/components/loader";
import Pager from "@/components/pager";
import UserCard from "@/components/userCard";
import { Inter } from "next/font/google";

import { useState, useEffect, useCallback, useMemo } from "react";

export interface User {
  ID: string;
  FirstNameLastName: string;
  Email: string;
  JobTitle: string;
  EmailAddress: string;
  Phone: string;
  Company: string;
}

const inter = Inter({ subsets: ["latin"] });

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://give-me-users-forever.vercel.app/api/users/${page}/next`
        );
        const data = await response.json();
        if (data.users.length === 0) {
          setHasMorePages(false);
        } else {
          setUsers(data.users);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handlePageChange = useCallback(
    (newPage: number) => () => {
      setPage(newPage);
    },
    []
  );

  return (
    <>
      {error && <Error errorMessage={error} />}
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="userContainer">
            <UserCard users={users} />
          </div>
        )}

        <Pager
          handlePageChange={handlePageChange}
          hasMorePages={hasMorePages}
          isLoading={isLoading}
          page={page}
        />
      </>
    </>
  );
};

export default UserList;
