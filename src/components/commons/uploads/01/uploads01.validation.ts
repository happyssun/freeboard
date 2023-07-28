import { Modal } from "antd";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const checkValidationFile = (file?: File) => {
  if (file?.size === undefined) {
    alert("파일이 없습니다");
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    Modal.error({ content: "파일용량이 너무 큽니다.(제한 : 5MB)" });
    return false;
  }

  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    Modal.error({ content: " jpeg 파일 또는 png 파일만 업로드 가능합니다!" });

    return false;
  }

  return true;
};
