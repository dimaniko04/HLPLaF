import { isAxiosError } from "axios";
import { makeAutoObservable } from "mobx";

export default class UiStore {
  isFetching: boolean = false;
  isPosting: boolean = false;

  fetchError: string | null = null;
  postError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsFetching = (isFetching: boolean) => {
    this.isFetching = isFetching;
  };

  setIsPosting = (isPosting: boolean) => {
    this.isPosting = isPosting;
  };

  setFetchError = (fetchError: string | null) => {
    this.fetchError = fetchError;
  };

  setPostError = (postError: string | null) => {
    this.postError = postError;
  };

  handleFetchError = (error: unknown) => {
    if (isAxiosError(error)) {
      const status = error.status ?? error.response?.status;

      if (status && status >= 400 && status < 500) {
        this.setFetchError(error.response?.data.message || error.message);
        return;
      }
    }
    this.setFetchError("Internal server error");
  };

  handlePostError = (error: unknown) => {
    if (isAxiosError(error)) {
      const status = error.status || error.response?.status;

      if (status && status >= 400 && status < 500) {
        this.setPostError(error.response?.data.message || error.message);
        return;
      }
    }
    this.setPostError("Internal server error");
  };
}
