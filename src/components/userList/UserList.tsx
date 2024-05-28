import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./userList.module.scss";
import Pager from "../pager";
import Loader from "../loader";
import Error from "../error";
import UserCard from "../userCard";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export interface User {
  ID: string;
  FirstNameLastName: string;
  Email: string;
  JobTitle: string;
  EmailAddress: string;
  Phone: string;
  Company: string;
}

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
      <div className={styles.userListContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.userContainer}>
            <UserCard users={users} />
          </div>
        )}

        <Pager
          handlePageChange={handlePageChange}
          hasMorePages={hasMorePages}
          isLoading={isLoading}
          page={page}
        />
      </div>
    </>
  );
};

export default UserList;
