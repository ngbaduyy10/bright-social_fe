import { trendingTopics } from "@/utils/constant";

export default function TrendingCard() {

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-2">Trending</h3>
      <div className="space-y-2">
        {trendingTopics.map((topic, index) => (
          <div key={index}>
            <div className="font-medium text-gray-900">{topic.hashtag}</div>
            <div className="text-sm text-gray-500">{topic.posts}</div>
          </div>
        ))}
      </div>
    </div>
  )
}