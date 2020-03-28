import React from 'react';
import { Avatar } from '../../../../components/core';

const Demo = () => {
  return (
    <div className="flex">
      <Avatar name="Hoàng Nguyễn" className="mr-3" />
      <Avatar name="Hoàng Nguyễn" className="mr-3" color="orange" />
      <Avatar name="Hoàng Nguyễn" className="mr-3" color="#19b39d" />
      <Avatar name="Hoàng Nguyễn" square />
    </div>
  );
};

Demo.code = `
import React from 'react';
import { Avatar } from '@/components/core';

export default () => {
  return (
    <div className="flex">
      <Avatar
        src={avatarLink}
        className="mr-3"
        name="Hoàng Nguyễn"
      />
      <Avatar
        src={avatarLink}
        className="mr-3"
        square
        name="Hoàng Nguyễn"
      />
    </div>
  );
};
`;

export default Demo;
