import SearchTabs from "@/components/organisms/SearchTabs";
import { ApiResponse } from "@/dto/apiResponse.dto";
import { SearchPageResponse } from "@/dto/searchPageResponse.dto";
import { fetchApiWithAuth } from "@/utils/api";
import { postLimit, userLimit } from "@/utils/constant";

interface SearchPageProps {
  searchParams: Promise<{
    keyword: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword } = await searchParams;

  const initialSearchPageResponse: ApiResponse<SearchPageResponse> = await fetchApiWithAuth(
    `/page/search?keyword=${keyword}&user-limit=${userLimit}&post-limit=${postLimit}`,
    { cache: "no-store" }
  );
  const initialData = initialSearchPageResponse.data;

  return (
    <div>
      <h1 className="mb-4 text-[28px] font-bold">Search results for "{keyword}"</h1>
      <SearchTabs initialData={initialData} />
    </div>
  );
}