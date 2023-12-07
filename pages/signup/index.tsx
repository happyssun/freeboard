import { useState } from "react";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/sign";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Modal from "../../src/components/modal/01";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../src/commons/libraries/validationYup";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

interface IInputs {
  email: string;
  password: string;
  name: string;
}

export default function SignUpForm() {
  const { onClickMoveToPage } = useMoveToPage();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const {
    register,
    handleSubmit,
    reset, // react-hook-form의 reset 함수
    formState: { errors, isValid },
  } = useForm<IInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const [createUser] = useMutation(CREATE_USER);

  const handleSignUp = async (data: IInputs) => {
    try {
      const { data: createUserData } = await createUser({
        variables: { createUserInput: data },
      });

      const { name } = createUserData?.createUser || {};
      setModalContent({
        title: "Welcome",
        message: `${name}님 가입을 환영합니다!`,
      });
      setShowModal(true);
    } catch (error: any) {
      console.error("Sign Up Error", error);

      // Apollo Client에서 반환된 오류 정보를 확인
      if (error.graphQLErrors) {
        const [firstError] = error.graphQLErrors;
        if (firstError.message.includes("이미 존재하는 이메일입니다")) {
          // 이미 가입된 경우
          setModalContent({
            title: "Error",
            message: firstError.message,
          });
          setShowModal(true);
          // 폼 리셋
          reset();
        } else {
          console.error("GraphQL Errors", error.graphQLErrors);
        }
      }

      if (error.networkError) {
        console.error("Network Error", error.networkError);
      }
    }
  };

  const passwordRegister = register("password", {
    required: "Password is required",
  });

  const closeModalAndNavigate = () => {
    setShowModal(false); // 모달 닫기
    onClickMoveToPage("/userDashboard")(); // 페이지 이동
  };
  return (
    <styles.FormContainer onSubmit={handleSubmit(handleSignUp)}>
      <styles.Title>Sign Up</styles.Title>

      <styles.Input
        type="text"
        placeholder="Name"
        autoComplete="name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <styles.Input
        type="text"
        placeholder="Email"
        autoComplete="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <styles.Input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        {...passwordRegister}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <styles.SubButton type="submit" disabled={!isValid}>
        Sign Up
      </styles.SubButton>

      <styles.MoveButton
        type="button"
        onClick={() => onClickMoveToPage("/signIn")}
      >
        Move to Sign In
      </styles.MoveButton>

      {showModal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModalAndNavigate}
        />
      )}
    </styles.FormContainer>
  );
}
