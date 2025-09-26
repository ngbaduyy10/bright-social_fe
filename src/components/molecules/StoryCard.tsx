import UserAvatar from '../atoms/UserAvatar'

export default function StoryCard() {
  return (
    <div className="relative w-[130px] h-[180px] bg-primary rounded-xl overflow-hidden cursor-pointer flex-shrink-0">
      <UserAvatar username={"John Doe"} className="absolute top-2 left-2 w-8 h-8 border-1 border-white" />
    </div>
  )
}