import React, { FC, memo } from 'react';
import { MetaInfo } from '@/components';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { CardFooter } from '@nextui-org/react';
import { hasErrorField } from '@/utils/hasErrorField';
import { useLikePostMutation, useUnLikePostMutation } from '@/store/services';

type PropsType = {
  likesCount: number
  likedByUser: boolean
  id: string
  commentsCount: number
  // eslint-disable-next-line no-unused-vars
  setError: (error: string) => void
}

export const PostFooter: FC<PropsType> = memo(({
                                                 likesCount,
                                                 likedByUser,
                                                 id,
                                                 commentsCount,
                                                 setError,
                                               }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();

  const handleLikes = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message);
      } else {
        setError(error);
      }
    }
  };

  return (
    <CardFooter className='gap-3'>
      <div className='flex items-center gap-5'>
        <div onClick={handleLikes}>
          <MetaInfo
            count={likesCount}
            Icon={likedByUser
              ? FcDislike
              : MdOutlineFavoriteBorder
            }
          />
        </div>
        <Link to={`/posts/${id}`}>
          <MetaInfo
            count={commentsCount}
            Icon={FaRegComment}
          />
        </Link>
      </div>
    </CardFooter>
  );
});