import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";
import MadingCard from "../Card/MadingCard";

const ListMading = () => {
  const { data, fetchNextPage, hasNextPage } =
    api.mading.getAllMading.useInfiniteQuery(
      { limit: 9 },
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const dataToShow = useMemo(
    () => data?.pages.flatMap((page) => page.madings),
    [data],
  );

  if (dataToShow == null || dataToShow.length === 0) {
    return (
      <h2 className="my-4 text-center font-mono text-xl font-bold text-mono-black/75">
        Tidak ada mading tersedia.
      </h2>
    );
  }

  return (
    <InfiniteScroll
      dataLength={dataToShow.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      className="grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {dataToShow?.map((mading) => (
        <MadingCard key={mading.id} mading={mading} />
      ))}
    </InfiniteScroll>
  );
};

export default ListMading;
