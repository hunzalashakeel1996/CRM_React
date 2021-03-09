import React, { lazy, Suspense, useEffect, useState } from 'react';

import { Input,InputNumber,Col,Button, Row, Select, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';

import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { downloadallmpreport } from '../../../redux/apis/DataAction';

import { Main } from '../styled';
const { Title } = Typography;



const LabelsToDecide = (props) => {

  const { path } = props.match;
  const dispatch = useDispatch();
  const [Bags, setBags] = useState([]);

  const DownloadAllMpReport = () => {
    

        dispatch(downloadallmpreport()).then(data => {
          ExportData(data);
          console.log(data);

        })
        function ExportData(objArray) {

          var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
          var str = '';
          var line = '';
          for (var index in array[0]) {
              line += index + '\t';
          }
          str += line + '\r\n';
          line = '';
          for (var i = 0; i < array.length; i++) {
              line = '';
              for (var index in array[i]) {
                  line += array[i][index] + '\t';
              }
              // Here is an example where you would wrap the values in double quotes 
              // for (var index in array[i]) {
              //    line += '"' + array[i][index] + '",';
              // }
              line.slice(0, line.Length - 1);
              str += line + '\r\n';
          }
          //   window.open("data:text/csv;charset=utf-8," + escape(str))
          var uri = 'data:text/csv;charset=utf-8,' + escape(str);
  
          var downloadLink = document.createElement("a");
          downloadLink.href = uri;
          downloadLink.download = "Inventory.txt";
  
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      }
  }
    

    return (
        <>
       <Title level={2} style={{ marginTop: 10, marginLeft: 75 }}>Labels To Decide</Title>
       <Button type="primary" htmlType="submit" onClick={DownloadAllMpReport} style={{ marginTop: 10, marginLeft: 75 }}>
          Downlaod
        </Button> 

        </>
    );
};


export default LabelsToDecide
