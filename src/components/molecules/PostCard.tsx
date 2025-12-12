"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";
import Post from "@/models/post";
import PostContent from "@/components/atoms/PostContent";
import PostMedia from "./PostMedia";
import { useState, useEffect } from "react";
import PostModal from "../organisms/PostModal";
import Media from "@/models/media";
import UserInfo from "../atoms/UserInfo";
import PostInteractionBar from "../atoms/PostInteractionBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/post.action";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedMediaOrder, setSelectedMediaOrder] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const sortedMedia = post.media?.sort((a, b) => a.order - b.order);
  
  const currentUserId = session?.user?.id;
  const isUserPost = currentUserId && post.user?.id && currentUserId === post.user.id.toString();

  useEffect(() => {
    const postId = searchParams.get("postId");
    const mediaOrder = searchParams.get("mediaOrder");
    
    if (postId && postId === post.id.toString()) {
      setSelectedPost(post);
      setSelectedMediaOrder(mediaOrder ? parseInt(mediaOrder) : 0);
      setOpen(true);
    } else {
      setOpen(false);
      setSelectedPost(null);
    }
  }, [searchParams, post]);

  const handleSelectMedia = (media: Media) => {
    setSelectedPost(post);
    setSelectedMediaOrder(media.order);
    setOpen(true);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("postId", post.id.toString());
    params.set("mediaOrder", media.order.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    
    if (!isOpen) {
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("postId");
        params.delete("mediaOrder");
        const newParams = params.toString();
        router.push(newParams ? `?${newParams}` : window.location.pathname, { scroll: false });
        setSelectedPost(null);
      }, 100);
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deletePost(post.id.toString());
      if (response.success) {
        setIsDeleted(true);
        toast.success("Post deleted successfully");
        
        if (selectedPost && selectedPost.id.toString() === post.id.toString()) {
          setOpen(false);
          setSelectedPost(null);
        }
        
        router.refresh();
      } else {
        toast.error(response.message || "Failed to delete post");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post");
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <div className="bg-white flex flex-col gap-4 shadow-sm rounded-lg p-6">
        <div className="flex items-start justify-between">
          <UserInfo user={post.user} createdAt={post.created_at} />

          {isUserPost ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex-center bg-white hover:bg-background rounded-md p-1 cursor-pointer">
                  <MoreHorizontal size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-red-200">
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex-center bg-white hover:bg-background rounded-md p-1 cursor-pointer">
              <MoreHorizontal size={20} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <PostContent content={post.content} />
          {sortedMedia && sortedMedia.length > 0 && (
            <PostMedia 
              media={sortedMedia} 
              handleSelectMedia={handleSelectMedia} 
            />
          )}
        </div>

        <PostInteractionBar post={post} className="pt-3 border-t border-border" />
      </div>

      {selectedPost && (
        <PostModal 
          post={selectedPost} 
          mediaOrder={selectedMediaOrder} 
          open={open} 
          onOpenChange={handleOpenChange} 
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}