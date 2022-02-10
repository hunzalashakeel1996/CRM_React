import React, { Suspense, useEffect, useState, useRef, useContext } from 'react';
import { Row, Col, Icon, Form, Input, Select, Card, PageHeader, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { PUAppGetPromotionStylesSort, PUAppSavePromotionStylesSort } from '../../../../redux/apis/DataAction';
import { Button } from '../../../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import EditableTable from './EditableTable';


const { Option } = Select;

const Promotion = ({ setLoader }) => {
  const dispatch = useDispatch();
  const [promoStyles, setPromoStyles] = useState([]);
  const [allPromoStyles, setAllPromoStyles] = useState([]);
  const [promoStylesChange, setPromoStylesChange] = useState([]);

  useEffect(() => {
    setLoader(true)
    dispatch(PUAppGetPromotionStylesSort()).then(res => {
      setPromoStyles(res)
      setAllPromoStyles(res)
      setLoader(false)
    })
  }, [])

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => handleSearch(e.target.value, confirm, dataIndex)}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
          autoFocus
        />
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text => (text),
  });


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    let tempFilter = allPromoStyles.filter(val => val[dataIndex].toString().toLowerCase().includes(selectedKeys.toLowerCase()))
    setPromoStyles(tempFilter)
  };


  const savePromoStylesSort = () => {
    setLoader(true)
    let temp = [];
    promoStylesChange.map(i => {if(i.ID == null) {temp.push(i.STYLEID)}})
    let newData = allPromoStyles.filter(i => i.ID == null && !temp.includes(i.STYLEID))
    let data = { sort: [...promoStylesChange, ...newData] }
    dispatch(PUAppSavePromotionStylesSort(data)).then(res => {
      openNotificationWithIcon('success', 'Promotion Styles Sort Successfully Updated!');
      setLoader(false)
    })
  }

  const columns = [
    {
      title: 'Style Id',
      dataIndex: 'STYLEID',
      key: 'STYLEID',
      ...getColumnSearchProps('STYLEID'),
    },
    {
      title: 'Style Code',
      dataIndex: 'STYLECODE',
      key: 'STYLECODE',
      ...getColumnSearchProps('STYLECODE'),
    },
    {
      title: 'Sort',
      dataIndex: 'SORT',
      key: 'SORT',
      editable: true,
      ...getColumnSearchProps('SORT'),
    }
  ];

  const handleSave = (row) => {
    const newDataC = [...promoStylesChange];
    const indexC = newDataC.findIndex((item) => row.STYLEID === item.STYLEID);
    const itemC = newDataC[indexC];
    indexC < 0 ? newDataC.push(row) : newDataC.splice(indexC, 1, { ...itemC, ...row });
    setPromoStylesChange(newDataC);


    const newData = [...promoStyles];
    const index = newData.findIndex((item) => row.STYLEID === item.STYLEID);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setPromoStyles(newData);

    const newAllData = [...allPromoStyles];
    const indexA = newAllData.findIndex((item) => row.STYLEID === item.STYLEID);
    const itemA = newAllData[indexA];
    newAllData.splice(indexA, 1, { ...itemA, ...row });
    setAllPromoStyles(newAllData);
  };

  return (
    <>
      <Card style={{ width: '100%' }}>
        <div>
          <Row>
            <Col xs={24} md={24}>
              {allPromoStyles.length > 0 && <Button className='btnCol' style={{ float: 'right' }} type="success" onClick={savePromoStylesSort}>
                Save
              </Button>}
            </Col>
          </Row>
        </div>
      </Card>

      {allPromoStyles.length > 0 && <EditableTable
        handleSave={handleSave}
        pageSize={50}
        style={{ marginTop: 15, marginBottom: 15 }}
        dataSource={promoStyles}
        allColumns={columns} />}
    </>
  );
};

export default Promotion;

