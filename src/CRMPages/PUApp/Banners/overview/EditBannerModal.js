import React, { Suspense, useEffect, useState } from 'react';
import { Upload, Skeleton, Image, message, notification, Select, Modal, } from 'antd';
import { PUAppGetAllBrands, PUAppUpdateBanner, PUAppUploadBanner } from '../../../../redux/apis/DataAction';
import { useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './style.css';

const { Option } = Select;

const EditBannerModal = ({ isModalVisible, loader, setLoader, banner, updateBanner, handleCancel }) => {
  const dispatch = useDispatch();
  const statusOpt = [{ key: 1, value: 'Active' }, { key: 0, value: 'InActive' }];
  const [subTypeOpt, setSubTypeOpt] = useState([])


  useEffect(() => {
    if (banner.type == 'Brands') {
      dispatch(PUAppGetAllBrands()).then(res => {
        let data = res.map(i => { return { ...i, key: i.BRANDID, value: i.BRANDNAME } })
        setSubTypeOpt([{ key: 0, value: 'All' }, ...data])
      })
    } else {
      let categories = [
        { key: 0, value: 'All' },
        { key: 1, value: 'Tops' },
        { key: 2, value: 'Pants' },
        { key: 5, value: 'Lab Coats' },
        { key: 4, value: 'Jackets' },
        { key: 3, value: 'Shoes' },
        { key: 8, value: 'Accessories' }
      ];
      setSubTypeOpt(categories)
    }
  }, [])

  const [uploadImage, setUploadImage] = useState(null);

  const [selectedSubType, setSelectedSubType] = useState(banner.sub_type);
  const [status, setStatus] = useState(banner.status ? 1 : 0);
  const onSubTypeChange = (data) => {
    let JS = JSON.parse(data)
    setSelectedSubType(`${JS.key}-PU-${JS.value}`)
  }

  const handleChange = (file) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg') {
      setUploadImage(file)
    } else {
      message.error(`${file.name} is not a image file`);
    }
    return false;
  }

  const uploadBanner = () => {

    setLoader(true);

    if (uploadImage) {
      const formData = new FormData();
      formData.append('ImageUpload', uploadImage);
      formData.append('id', banner.ID);
      formData.append('url', banner.Banner_image);
      formData.append('subType', selectedSubType);
      formData.append('status', status);

      dispatch(PUAppUploadBanner(formData)).then(res => {
        if (res == 'error') {
          message.error(`Something Went Wrong, Please Try Again.`);
        } else {
          updateBanner();
        }
      })
    } else {
      let data = {
        id: banner.ID,
        url: banner.Banner_image,
        subType: selectedSubType,
        status: status
      }

      dispatch(PUAppUpdateBanner(data)).then(res => {
        updateBanner();
      })
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Modal confirmLoading={loader} title="Edit Banner" visible={isModalVisible} onOk={uploadBanner} okText={'Update'} onCancel={handleCancel}>
        <div style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Image width={150} src={uploadImage ? URL.createObjectURL(uploadImage) : banner.Banner_image} />
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={handleChange}
          >
            {uploadButton}
            {/* {uploadImage ? <img src={URL.createObjectURL(uploadImage)} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
          </Upload>
        </div>
        <p>Type: {banner.type}</p>
        {selectedSubType && <div style={{ marginBottom: 10 }}>
          <span>Sub Type: </span>
          <Select
            showSearch
            style={{ width: 300, }}
            placeholder={`Select SubType`}
            optionFilterProp="children"
            value={selectedSubType.split('-PU-')[1]}
            onChange={onSubTypeChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {subTypeOpt.map(item => <Option key={item.key} value={JSON.stringify(item)}>{item.value}</Option>)}
          </Select>
        </div>}
        <span>Status: </span>
        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="Select Status"
          optionFilterProp="children"
          value={status}
          onChange={(val) => setStatus(val)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {statusOpt.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)}
        </Select>
        {/* <TextArea value={selectedOffer.OFFER} onChange={(e) => setSelectedOffer({ ...selectedOffer, OFFER: e.target.value })} autoSize /> */}
        {/* <Input value={selectedOffer.OFFER} onChange={(e) => setSelectedOffer({ ...selectedOffer, OFFER: e.target.value })} /> */}
      </Modal>
    </>
  );
};

export default EditBannerModal;

