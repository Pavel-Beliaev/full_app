import React, { FC, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardUser } from '@/components';
import { formatToClientDate } from '@/utils/formatToClientDate';
import { CardHeader, Spinner } from '@nextui-org/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { selectCurrent } from '@/store/slices/userSlice';
import {
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '@/store/services';
import { hasErrorField } from '@/utils/hasErrorField';

type PropsType = {
  authorId: string
  avatarUrl: string
  name: string
  createAt: Date
  cardFor: 'comment' | 'post' | 'current'
  id: string
  // eslint-disable-next-line no-unused-vars
  setError: (error: string) => void
}

export const PostHeader: FC<PropsType> = memo(({
                                                 authorId,
                                                 avatarUrl,
                                                 name,
                                                 createAt,
                                                 cardFor,
                                                 id,
                                                 setError,
                                               }) => {
  const currentUser = useSelector(selectCurrent);
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [triggerGetAllPost] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const navigate = useNavigate();

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

  return (
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
  );
});