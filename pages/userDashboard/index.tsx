import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { isEditState } from "../../src/commons/stores";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import { useState } from "react";
import Modal from "../../src/components/modal/01";

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

  const handleLogout = () => {
    setIsEdit(false);
    setShowModal(true);
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    onClickMoveToPage("/");
  };

  return (
    <div>
      {data?.fetchUserLoggedIn ? (
        <>
          <p>Welcome, {data?.fetchUserLoggedIn.name}</p>
          <p>Email: {data?.fetchUserLoggedIn.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <p>로그인 정보가 없습니다. 먼저 로그인을 하세요</p>
          <button onClick={() => onClickMoveToPage("/signIn")}>Sign In</button>
        </div>
      )}
      {showModal && (
        <Modal
          title="Logout Successful"
          message="You have been successfully logged out."
          onClose={closeModalAndNavigate}
        />
      )}
    </div>
  );
};

export default UserDashboard;
