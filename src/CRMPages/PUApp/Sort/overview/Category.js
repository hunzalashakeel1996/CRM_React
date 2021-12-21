import React, { Suspense, useEffect, useState, useRef, useContext } from 'react';
import { Row, Col, Icon, Form, Input, Select, Card, PageHeader, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { PUAppGetCategoryStyles, PUAppGetSubCategories, PUAppUpdateCategoryStylesSort } from '../../../../redux/apis/DataAction';
import { Button } from '../../../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import EditableTable from './EditableTable';


const { Option } = Select;

const Category = ({ setLoader }) => {
  const genderOpt = [{ key: 2, value: 'Women' }, { key: 1, value: 'Men' }];
  const categoryOpt = [
    { key: 1, value: 'Tops' },
    { key: 2, value: 'Pants' },
    { key: 5, value: 'Lab Coats' },
    { key: 4, value: 'Jackets' },
    { key: 3, value: 'Shoes' },
    { key: 8, value: 'Accessories' }
  ]
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [categoryStyles, setCategoryStyles] = useState([]);
  const [allCategoryStyles, setAllCategoryStyles] = useState([]);

  useEffect(() => {

  }, [])

  const onGenderChange = (gender) => {
    setSelectedGender(gender)
    resetCategoryStyles();
    getSubCat(gender, selectedCategory);
  }
  const onCategoryChange = (category) => {
    setSelectedCategory(category);
    resetCategoryStyles();
    getSubCat(selectedGender, category);

  }
  const onSubCategoryChange = (subCat) => {
    setSelectedSubCategory(subCat)
    resetCategoryStyles();
  }

  const getSubCat = (gender, category) => {
    if (gender && category) {
      setLoader(true)
      let data = {
        GID: gender,
        CATID: category
      }
      dispatch(PUAppGetSubCategories(data)).then(res => {
        setLoader(false)
        setSelectedSubCategory(null)
        setSubCategories(res)
      })
    }
  }

  const resetCategoryStyles = () => {
    setAllCategoryStyles([]);
    setCategoryStyles([])
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
    let tempFilter = allCategoryStyles.filter(val => val[dataIndex].toString().toLowerCase().includes(selectedKeys))
    setCategoryStyles(tempFilter)
  };

  const searchCategoryStyles = () => {
    if (selectedGender && selectedCategory && selectedSubCategory) {
      setLoader(true);
      let data = {
        GID: selectedGender,
        CATEGORYID: selectedCategory,
        SUBCATEGORYID: selectedSubCategory,
      }
      dispatch(PUAppGetCategoryStyles(data)).then(res => {
        const dataSource = res.map((item, index) => { return { ...item, key: index } })
        setAllCategoryStyles(dataSource);
        setCategoryStyles(dataSource)
        setLoader(false)
      })
    } else {
      openNotificationWithIcon('error', 'Please Select All Fields');
    }

  }

  const saveCategoryStylesSort = () => {
    setLoader(true)
    let data = {
      GID: selectedGender,
      CATEGORYID: selectedCategory,
      SUBCATEGORYID: selectedSubCategory,
      CatSort: allCategoryStyles
    }
    dispatch(PUAppUpdateCategoryStylesSort(data)).then(res => {
      openNotificationWithIcon('success', 'Category Styles Sort Successfully Updated!');
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
    const newData = [...categoryStyles];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setCategoryStyles(newData);

    const newAllData = [...allCategoryStyles];
    const indexA = newAllData.findIndex((item) => row.STYLEID === item.STYLEID);
    const itemA = newAllData[indexA];
    newAllData.splice(indexA, 1, { ...itemA, ...row });
    setAllCategoryStyles(newAllData);
  };

  return (
    <>
      <Card style={{ width: '100%' }}>
        <div>
          <Row gutter={12}>
            <Col xs={24} md={24}>
              <Select
                showSearch
                style={{ width: 150 }}
                placeholder="Select Gender"
                optionFilterProp="children"
                value={selectedGender}
                onChange={onGenderChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {genderOpt.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)}
              </Select>
              <Select
                showSearch
                style={{ width: 150, marginLeft: 10 }}
                placeholder="Select Category"
                value={selectedCategory}
                optionFilterProp="children"
                onChange={onCategoryChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {categoryOpt.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)}
              </Select>
              <span className='btnCol divDisplay'>
                <Select
                  showSearch
                  style={{ width: 300, marginLeft: 10 }}
                  placeholder="Select SubCategory"
                  value={selectedSubCategory}
                  optionFilterProp="children"
                  onChange={onSubCategoryChange}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {subCategories.map(item => <Option key={item.SUBCATEGORYID} value={item.SUBCATEGORYID}>{item.SUBCATEGORYNAME}</Option>)}
                </Select>
              </span>
              <Button className='btnCol' type="primary" style={{ marginLeft: 15 }} onClick={searchCategoryStyles}>
                Search
              </Button>
              {allCategoryStyles.length > 0 && <Button className='btnCol' style={{ float: 'right' }} type="success" onClick={saveCategoryStylesSort}>
                Save
              </Button>}
            </Col>
          </Row>
        </div>
      </Card>

      {allCategoryStyles.length > 0 && <EditableTable
        handleSave={handleSave}
        pageSize={50}
        style={{ marginTop: 15, marginBottom: 15 }}
        dataSource={categoryStyles}
        allColumns={columns} />}
    </>
  );
};

export default Category;

