import React from 'react';
import { selectCurrent } from '@/store/slices/userSlice';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import { CardUser } from '@/components';
import { useAppSelector } from '@/store/hooks';

const Followers = () => {
  const currentUser = useAppSelector(selectCurrent);

  if (currentUser.followers.length === 0) {
    return <h1>No one is following you</h1>;
  } else if (currentUser.followers.length > 0) {
    return (
      <div className='flex flex-col gap-5'>
        {currentUser.followers.map((user) => (
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
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
};

export default Followers;