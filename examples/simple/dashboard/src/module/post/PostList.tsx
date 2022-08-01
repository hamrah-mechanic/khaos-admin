import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

//TYPES
import { Filters } from 'khaos-admin';

interface PostListProps {
  list: any;
  selectId: (id: string) => void;
  remove: (id: string) => Promise<void>;
  navigate: (route: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  getByFilter: (filters: Filters) => Promise<void>;
}

const PostList: React.FC<PostListProps> = ({ list, selectId, remove, navigate, filters, setFilters, getByFilter }) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [tableList, setTableList] = useState([]);

  const titleCol = list && Object.keys(list ? list[0] : '');
  useEffect(() => {
    getByFilter(filters);
  }, []);

  useEffect(() => {
    list && setTableList(list);
  }, [list]);

  useEffect(() => {
    selectId(selectedRow[0]?.toString());
  }, [selectedRow]);

  const data =
    tableList &&
    tableList.map(data => {
      return {
        ...data,
        key: data.id,
      };
    });

  const columns = titleCol?.map(title => {
    return {
      title: title,
      dataIndex: title,
      key: title,
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: number[]) => {
      setSelectedRow(selectedRowKeys);
    },
  };

  if (list) {
    return (
      <div className="d-flex flex-column">
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          onRow={record => {
            return {
              onClick: () => {
                selectId(record.id);
                navigate('posts/show?' + record.id);
              },
            };
          }}
          pagination={{
            defaultCurrent: filters.page,
            total: list.totalResults,
            pageSize: filters.resultsPerPage,
            onChange: (page, resultsPerPage) => {
              setFilters({ ...filters, page, resultsPerPage });
              getByFilter({ ...filters, page, resultsPerPage });
            },
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default PostList;
