// UserDashboard.tsx

import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { isEditState } from "../../src/commons/stores";
import { useState } from "react";
import Modal from "../../src/components/modal/01";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

const UserDashboard = () => {
  const { loading, error, data } = useQuery(FETCH_USER_LOGGED_IN);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const [showModal, setShowModal] = useState(false);
  const { onClickMoveToPage } = useMoveToPage();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userName = data?.fetchUserLoggedIn?.name;
  const userEmail = data?.fetchUserLoggedIn?.email;

  const handleLogout = () => {
    setIsEdit(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    onClickMoveToPage("/signIn");
  };

  return (
    <div>
      <p>Welcome, {userName}!</p>
      <p>Email: {userEmail}</p>
      <button onClick={handleLogout}>Logout</button>

      {showModal && (
        <Modal
          title="Logout Successful"
          message="You have been successfully logged out."
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;
