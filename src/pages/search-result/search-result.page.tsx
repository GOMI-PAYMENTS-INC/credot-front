import { SearchResultContainer } from '@/containers/search-result.container';
import { SearchDto } from '@/generated/graphql';

const SearchResultPage = () => {
  const { isLoadingSearch, main, relations } = SearchResultContainer();

  const RelationList = ({
    relationsParam,
  }: {
    relationsParam: SearchDto[] | undefined;
  }) => {
    if (!relationsParam || relationsParam.length === 0) {
      return <div>데이터가 없습니다.</div>;
    }
    return (
      <>
        {relationsParam.map((relation, index) => (
          <ul key={index}>
            <li>{relation.ko}</li>
          </ul>
        ))}
      </>
    );
  };

  if (isLoadingSearch) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {main ? (
          <div>
            Main
            <div>text: {main.text}</div>
            <div>ko: {main.ko}</div>
            <div>en: {main.en}</div>
            <div>count: {main.count}</div>
          </div>
        ) : (
          <div>Main 데이터가 없습니다.</div>
        )}
      </div>
      <div>
        <RelationList relationsParam={relations} />
      </div>
    </div>
  );
};

export default SearchResultPage;
