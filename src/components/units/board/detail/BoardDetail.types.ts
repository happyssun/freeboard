import { Query } from "../../../../commons/types/generated/types";

export interface IBoardDetailUIProps {
  data?: Pick<Query, "fetchBoard">;
  onClickMoveToEdit: () => void;
  onClickMoveToList: () => void;
}
