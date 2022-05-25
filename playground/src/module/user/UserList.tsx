import { useEffect, useState } from 'react';
import { SimpleButton } from 'hm-components';
import { Divider, Table } from 'antd';
import React from 'react';

const UserList = ({ usersList, remove, selectItem }) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const titleCol = usersList[0] && Object.keys(usersList[0]);
  const persianCol = {
    id: 'شناسه',
    name: 'نام',
    username: 'نام کاربری',
    email: 'ایمیل',
    address: 'آدرس',
    phone: 'شماره تلفن',
    website: 'وب سایت',
    company: 'شرکت',
  };

  useEffect(() => {
    selectItem(selectedRow[0]);
  }, [selectedRow]);

  const data =
    usersList[0] &&
    usersList.map(user => {
      return {
        ...user,
        company: user.company?.name || user.company,
        address: user.address?.city || user.address,
        key: user.id,
      };
    });

  const columns = titleCol?.map(title => {
    return {
      title: persianCol[title],
      dataIndex: title,
      key: title,
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: number[]) => {
      setSelectedRow(selectedRowKeys);
    },
  };

  const deleteSelectedRow = () => {
    remove(selectedRow[0]);
    setSelectedRow(selectedRow.filter(row => row !== selectedRow[0]));
  };

  if (usersList[0]) {
    return (
      <div className="d-flex flex-column">
        <SimpleButton
          type="primary"
          danger
          ghost
          onClick={deleteSelectedRow}
          title="پاک کردن"
          className="align-self-end"
        />
        <Divider />
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                //rowIndex + 1 = id
              },
            };
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

export default UserList;
