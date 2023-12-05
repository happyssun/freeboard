import { useState } from "react";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/sign";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Modal from "../../src/components/modal/01";
import { signUpSchema } from "../../src/commons/libraries/validationYup";
import { yupResolver } from "@hookform/resolvers/yup";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export default function SignUpForm() {
  const { onClickMoveToPage } = useMoveToPage();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const [createUser] = useMutation(CREATE_USER);

  const handleSignUp = async (data) => {
    try {
      const { data: createUserData } = await createUser({
        variables: { createUserInput: data },
      });

      console.log(data);

      const { name } = createUserData?.createUser || {};
      setModalContent({
        title: "Welcome",
        message: `${name}님 가입을 환영합니다!`,
      });
      setShowModal(true);

      // Redirect to dashboard
      onClickMoveToPage("/dashboard");
    } catch (error: any) {
      console.error("Sign Up Error", error);

      // Apollo Client에서 반환된 오류 정보를 확인
      if (error.graphQLErrors) {
        console.error("GraphQL Errors", error.graphQLErrors);
      }

      if (error.networkError) {
        console.error("Network Error", error.networkError);
      }
    }
  };

  const passwordRegister = register("password", {
    required: "Password is required",
  });
  const passwordCheckRegister = register("passwordCheck", {
    required: "Password confirmation is required",
  });

  return (
    <styles.FormContainer onSubmit={handleSubmit(handleSignUp)}>
      <styles.Title>Sign Up</styles.Title>

      <styles.Input
        type="text"
        placeholder="Name"
        autoComplete="name"
        {...register("name")}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <styles.Input
        type="text"
        placeholder="Email"
        autoComplete="email"
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <styles.Input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        {...passwordRegister}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <styles.Input
        type="password"
        placeholder="Password check"
        autoComplete="new-password"
        {...passwordCheckRegister}
      />
      {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}

      <styles.SubButton type="submit">Sign Up</styles.SubButton>

      <styles.MoveButton type="button" onClick={onClickMoveToPage("/signin")}>
        Move to Sign In
      </styles.MoveButton>

      {showModal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </styles.FormContainer>
  );
}
