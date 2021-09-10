import { Table, Input, Upload, message, Popconfirm, Form, Col, Row, Select, Spin, Radio, Checkbox, Divider, Modal,Tabs} from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../../style';
import { UploadOutlined } from '@ant-design/icons';

import { PageHeader } from '../../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../../components/utilities/utilities'
import { Button } from '../../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";


const { TextArea } = Input;

const options = [
    { label: 'True', value: 'True' },
    { label: 'False', value: 'False' },

];



const AmazonUAEstatus = (props) => {

    const { uploadFile,dataTohandleChange,onChangeForceCheck,onChangetextArea,fileDetails ,state ,changeHandler  } = props
   
     const{dataTo,forceCheck,buttonStatus,textAreaStatus,reasonText}=state
 

    return (
        <>
            <Row gutter={5}>
                            <Col span={6}>
                                 <Button size="large"  style={{ width: 150 }} type="primary" onClick={uploadFile} disabled={buttonStatus === 'disabled' ? true : false}>Update</Button>
                            </Col>

                            <Col span={5}>
                                <Select defaultValue="select" onChange={dataTohandleChange} style={{ width: 150 }}>
                                    <Option value="PU_UAE">PU UAE</Option>
                                    <Option value="PU_UAE_Asin">PU UAE ASIN</Option>
                                    <Option value="PU_UAE_uploadtype">PU UAE Upload Type</Option>

                                </Select>
                            </Col>
                            <Col span={5}>
                                <Checkbox onChange={onChangeForceCheck}>Force Check</Checkbox>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 20 }}>
                            <Col span={6}>
                            <input  type="file" onChange={changeHandler} />

                            </Col>
                            <Col span={7}>
                        
                                <TextArea placeholder="Reason" onChange={onChangetextArea} disabled={textAreaStatus === 'disabled' ? true : false} />

                            </Col>


                        </Row>
             


        </>
    )

}
// ReactDOM.render(<EditableTable />, mountNode);


export default AmazonUAEstatus;