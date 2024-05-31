import { isAxiosError } from "axios";
import { makeAutoObservable } from "mobx";

export default class UiStore {
  isPosting: boolean = false;
  isFetching: boolean = false;
  isFetchingNext: boolean = false;

  postError: string | null = null;
  fetchError: string | null = null;
  fetchNextError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsFetching = (isFetching: boolean) => {
    this.isFetching = isFetching;
  };

  setIsFetchingNext = (isFetchingNext: boolean) => {
    this.isFetchingNext = isFetchingNext;
  };

  setIsPosting = (isPosting: boolean) => {
    this.isPosting = isPosting;
  };

  setFetchError = (fetchError: string | null) => {
    this.fetchError = fetchError;
  };

  setFetchNextError = (fetchNextError: string | null) => {
    this.fetchNextError = fetchNextError;
  };

  setPostError = (postError: string | null) => {
    this.postError = postError;
  };

  private handleError = (
    error: unknown,
    setError: (message: string) => void
  ) => {
    if (isAxiosError(error)) {
      const status = error.status ?? error.response?.status;

      if (status && status >= 400 && status < 500) {
        setError(error.response?.data.message || error.message);
        return;
      }
    }
    this.setFetchError("Internal server error");
  };

  handleFetchError = (error: unknown) => {
    this.handleError(error, this.setFetchError);
  };

  handlePostError = (error: unknown) => {
    this.handleError(error, this.setPostError);
  };

  handleFetchNextError = (error: unknown) => {
    this.handleError(error, this.setFetchNextError);
  };
}
