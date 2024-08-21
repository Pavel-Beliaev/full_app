import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Image, useDisclosure } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { resetUser, selectCurrent } from '@/store/slices/userSlice';
import {
  useFollowUserMutation,
  useGetUserByIdQuery,
  useUnFollowUserMutation,
} from '@/store/services';
import { useAppDispatch } from '@/store/hooks';
import { BackButton, CountInfo, EditProfile, ErrorMessage, ProfileInfo } from '@/components';
import { BASE_URL } from '@/constants';
import { MdOutlinePersonAddAlt, MdOutlinePersonAddDisabled } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { formatToClientDate } from '@/utils/formatToClientDate';
import { skipToken } from '@reduxjs/toolkit/query';
import { hasErrorField } from '@/utils/hasErrorField';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? skipToken);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, []);

  const handleFollow = async () => {
    try {
      if (id) {
        data.isFollowing
          ? await unfollowUser(id).unwrap()
          : followUser({ followingId: id }).unwrap();
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message);
      }
    }
  };

  return data
    ? <>
      <BackButton />
      <div className='flex items-stretch gap-4'>
        <Card className='flex flex-col items-center text-center space-y-4 p-5'>
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className='border-4 border-white'
          />
          <div className='flex flex-col text-2xl font-bold gap-4 items-center'>
            {data.name}
            {currentUser.id != id
              ? <Button
                color={data.isFollowing ? 'default' : 'primary'}
                variant='flat'
                className='gap-2'
                onClick={handleFollow}
                endContent={
                  data.isFollowing
                    ? <MdOutlinePersonAddDisabled />
                    : <MdOutlinePersonAddAlt />
                }
              >
                {data.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              : <Button
                endContent={<CiEdit />}
                onClick={() => onOpen()}
              >
                Edit
              </Button>
            }
          </div>
        </Card>
        <Card className='flex flex-col space-y-4 p-5 flex-1'>
          <ProfileInfo title='Email:' info={data.email || ' '} />
          <ProfileInfo title='Birthday:' info={formatToClientDate(data.dateOfBirth) || ' '} />
          <ProfileInfo title='Location:' info={data.location || ' '} />
          <ProfileInfo title='About me:' info={data.bio || ' '} />
          <div className='flex gap2'>
            <CountInfo count={data.following.length} title='Following' />
            <CountInfo count={data.followers.length} title='Followers' />
          </div>
        </Card>
      </div>
      <EditProfile
        isOpen={isOpen}
        onClose={onClose}
        user={data}
      />
      <ErrorMessage error={error} />
    </>
    : null;
};

export default UserProfile;