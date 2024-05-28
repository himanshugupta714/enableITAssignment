import { User } from "@/pages";
import styles from "./userCard.module.scss";

interface UserCard {
  users: User[];
}

const UserCard = ({ users }: UserCard) => {
  return (
    <div className={styles.root}>
      {users.map((user) => (
        <div key={user.ID} className={styles.cardContainer}>
          <p>{user.FirstNameLastName}</p>
          <p>
            {user.JobTitle} at {user.Company}
          </p>
          <div className={styles.userDetails}>
            <p>Phone: {user.Phone}</p>
            <p>Email: {user.Email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
