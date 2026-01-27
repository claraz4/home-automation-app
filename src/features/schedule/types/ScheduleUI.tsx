export interface StatusBoxInfo {
  isVisible: boolean;
  isError: boolean;
  title?: string;
  message: string;
}

export const statusBoxInfoClean: StatusBoxInfo = {
  isVisible: false,
  isError: false,
  title: "",
  message: "",
};
