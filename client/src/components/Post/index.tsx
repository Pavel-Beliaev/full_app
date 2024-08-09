import React, { FC, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Spinner } from '@nextui-org/react';
import {
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useLikePostMutation,
  useUnLikePostMutation,
} from '@/store/services';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrent } from '@/store/slices/userSlice';
import { formatToClientDate } from '@/utils/formatToClientDate';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CardUser, ErrorMessage, MetaInfo, Typography } from '@/components';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { hasErrorField } from '@/utils/hasErrorField';

type PropsType = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  likesCount?: number
  commentsCount?: number
  createAt?: Date
  id?: string
  cardFor: 'comment' | 'post' | 'current'
  likedByUser?: boolean
}

export const Post: FC<PropsType> = ({
                                      name = '',
                                      authorId = '',
                                      avatarUrl = '',
                                      id = '',
                                      content = '',
                                      createAt,
                                      likesCount = 0,
                                      commentsCount = 0,
                                      cardFor = 'post',
                                      likedByUser = false,
                                    }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();
  const [triggerGetAllPost] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);

  const refetchPost = async () => {
    switch (cardFor) {
      case 'current':
        await triggerGetAllPost().unwrap();
        break;
      case 'comment':
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error('Invalid argument at "cardFor"');
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          break;
        case 'current':
          await deletePost(id).unwrap();
          navigate('/');
          break;
        case 'comment':
          await deleteComment(id).unwrap();
          await refetchPost();
          break;
        default:
          throw new Error('Invalid argument at "cardFor"');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message);
      } else {
        setError(error);
      }
    }
  };

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
    <Card className='mb-5'>
      <CardHeader className='justify-between items-center bg-transparent '>
        <Link to={`/users/${authorId}`}>
          <CardUser
            name={name}
            avatarUrl={avatarUrl}
            className='text-small font-semibold leading-none text-default-600'
            description={createAt && formatToClientDate(createAt)}
          />
        </Link>
        {authorId === currentUser.id && (
          <div className='cursor-pointer' onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading
              ? <Spinner />
              : <RiDeleteBinLine />
            }
          </div>
        )}
      </CardHeader>
      <CardBody className='px-3 py-2 mb-5'>
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== 'comment' && (
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
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </Card>
  );
};