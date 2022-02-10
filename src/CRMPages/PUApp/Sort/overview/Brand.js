import React, { Suspense, useEffect, useState, useRef, useContext } from 'react';
import { Row, Col, Icon, Form, Input, Select, Card, PageHeader, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { PUAppGetAllBrands, PUAppGetBrandStyles, PUAppUpdateBrandStylesSort } from '../../../../redux/apis/DataAction';
import { Button } from '../../../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import EditableTable from './EditableTable';


const { Option } = Select;

const Brand = ({ setLoader }) => {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandStyles, setBrandStyles] = useState([]);
  const [allBrandStyles, setAllBrandStyles] = useState([]);

  useEffect(() => {
    setLoader(true)
    dispatch(PUAppGetAllBrands()).then(res => {
      setBrands(res)
      setLoader(false)
    })
  }, [])

  const onBrandChange = (brandId) => {
    setSelectedBrand(brandId)
    setBrandStyles([])
    setAllBrandStyles([])
  }

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
    let tempFilter = allBrandStyles.filter(val => val[dataIndex].toString().toLowerCase().includes(selectedKeys.toLowerCase()))
    setBrandStyles(tempFilter)
  };

  const searchBrandStyles = () => {
    if (selectedBrand) {
      setLoader(true);
      let data = {
        brandid: selectedBrand
      }
      dispatch(PUAppGetBrandStyles(data)).then(res => {
        const dataSource = res.map((item, index) => { return { ...item, key: index } })
        setAllBrandStyles(dataSource);
        setBrandStyles(dataSource)
        setLoader(false)
      })
    } else {
      openNotificationWithIcon('error', 'Please Select Brand');
    }
  }

  const saveBrandStylesSort = () => {
    setLoader(true)
    let data = { brandid: selectedBrand, sort: allBrandStyles }
    dispatch(PUAppUpdateBrandStylesSort(data)).then(res => {
      openNotificationWithIcon('success', 'Brand Styles Sort Successfully Updated!');
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
    const newData = [...brandStyles];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setBrandStyles(newData);

    const newAllData = [...allBrandStyles];
    const indexA = newAllData.findIndex((item) => row.STYLEID === item.STYLEID);
    const itemA = newAllData[indexA];
    newAllData.splice(indexA, 1, { ...itemA, ...row });
    setAllBrandStyles(newAllData);
  };

  return (
    <>
      <Card style={{ width: '100%' }}>
        <div>
          <Row>
            <Col xs={24} md={24}>
              <Select
                showSearch
                style={{ width: 300 }}
                placeholder="Select Brand"
                value={selectedBrand}
                optionFilterProp="children"
                onChange={onBrandChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {brands.map(item => <Option key={item.BRANDID} value={item.BRANDID}>{item.BRANDNAME}</Option>)}
              </Select>
              <Button className='btnCol' type="primary" style={{ marginLeft: 15 }} onClick={searchBrandStyles}>
                Search
              </Button>
              {allBrandStyles.length > 0 && <Button className='btnCol' style={{ float: 'right' }} type="success" onClick={saveBrandStylesSort}>
                Save
              </Button>}
            </Col>
          </Row>
        </div>
      </Card>

      {allBrandStyles.length > 0 && <EditableTable
        handleSave={handleSave}
        pageSize={50}
        style={{ marginTop: 15, marginBottom: 15 }}
        dataSource={brandStyles}
        allColumns={columns} />}
    </>
  );
};

export default Brand;

