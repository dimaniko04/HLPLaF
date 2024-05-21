import { observer } from "mobx-react-lite";
import { useStoreContext } from "../../store";
import { Dots } from "../Loaders";
import { PropsWithChildren } from "react";

interface Props {
  items: unknown[];
  noItemsText: string;
}

export const FetchWrapper = observer((props: PropsWithChildren<Props>) => {
  const {
    uiStore: { isFetching, fetchError },
  } = useStoreContext();

  if (isFetching) {
    return <Dots />;
  }

  if (fetchError) {
    return (
      <h1 className="text-red-600 mt-5 text-4xl text-center font-semibold tracking-wider">
        {fetchError}
      </h1>
    );
  }

  if (props.items.length == 0) {
    return (
      <h1 className="mt-5 text-4xl text-center font-semibold tracking-wider">
        {props.noItemsText}
      </h1>
    );
  }

  return props.children;
});
