import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrent } from '@/store/slices/userSlice';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { CardUser } from '@/components';

const Following = () => {
  const currentUser = useSelector(selectCurrent);

  if (currentUser.following.length === 0) {
    return <h1>You are not following anyone.</h1>
  } else if (currentUser.following.length > 0) {
    return (
      <div className='flex flex-col gap-5'>
        {currentUser.following.map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
          >
            <Card>
              <CardBody>
                <CardUser
                  name={user.name ?? ''}
                  avatarUrl={user.avatarUrl ?? ''}
                  description={user.email ?? ''}
                  className='justify-start'
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
};

export default Following;