import { useEffect, useState } from 'react';
import { SimpleButton } from 'hm-components';
import { Divider, Table } from 'antd';
import React from 'react';

const UserList = ({ list, selectItem, get }) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  console.log('result', list);
  const titleCol = list.sellOrderList && Object.keys(list.sellOrderList[0]);
  const persianCol = {
    id: 'شناسه',
    name: 'نام',
    orderType: 'نوع سفارش',
    carName: 'نام خودرو',
    username: 'نام کاربری',
    lastModifyDate: 'تاریخ تغییر',
    insertDate: 'تاریخ ایجاد',
    phoneNumber: 'شماره تلفن',
  };
  const data =
    list.sellOrderList &&
    list.sellOrderList.map(data => {
      return {
        ...data,
        key: data.id,
      };
    });
  useEffect(() => {
    selectItem(selectedRow[0]);
  }, [selectedRow]);

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

  if (list.sellOrderList) {
    return (
      <div className="d-flex flex-column">
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          pagination={{
            total: list.totalResults,
            onChange: page => {
              get(page, 10);
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

export default UserList;
