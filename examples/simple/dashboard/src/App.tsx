import React from 'react';
import { Khaos, Resource } from 'khaos-admin';
import { PostList, PostShow } from './module/post';
import khaosLogo from './khaos-logo.png';

function App() {
  return (
    <Khaos appConfig={{ root: 'http://localhost:3001', logo: khaosLogo }}>
      <Resource
        label="Post List"
        sidebarLink="list"
        entityName="posts"
        components={[
          { component: PostList, path: 'list' },
          {
            component: PostShow,
            path: 'show',
            button: { name: 'Post Detail', type: 'info', className: 'mx-1 mb-4 d-flex align-items-center' },
          },
        ]}
      />
    </Khaos>
  );
}

export default App;
