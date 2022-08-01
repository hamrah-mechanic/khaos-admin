import React, { useEffect } from 'react';
import { Card } from 'antd';
import { SimpleButton } from 'khaos-admin';

//STYLES
import styles from './posts.module.scss';

//TYPES

interface PostShowProps {
  selectedItem: any;
  selectedId: string;
  getById: (id: string) => Promise<void>;
  navigate: (route?: string) => void;
  entityName: string;
}

const PostShow: React.FC<PostShowProps> = ({ selectedItem, selectedId, getById, navigate, entityName }) => {
  const titles = Object.keys(selectedItem);
  console.log(selectedItem);

  useEffect(() => {
    if (selectedId) getById(selectedId);
    else if (selectedId === undefined) {
      navigate(`/${entityName}/list`);
    }
  }, [selectedId]);

  return (
    selectedId && (
      <div className="d-flex flex-column align-items-start">
        <Card title="Post Detail" className={styles['info__card']}>
          {titles.map((title, i) => (
            <>
              {(selectedItem[title] || selectedItem[title] === 0) && title && (
                <div key={i} className="d-flex align-items-center mt-4">
                  <div className={styles['info__title']}>{title}: </div>
                  <span className='ms-2'>{selectedItem[title]}</span>
                </div>
              )}
            </>
          ))}
        </Card>
        <SimpleButton
          title="Back"
          type="dark"
          ghost
          onClick={() => navigate('/posts/list')}
          className="align-self-end"
        />
      </div>
    )
  );
};

export default PostShow;
