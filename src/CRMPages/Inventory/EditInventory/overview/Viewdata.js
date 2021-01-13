import { Col, Row, Table, Spin,  Card,Input ,Checkbox  } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting,ProjectList,ProjectListTitle } from '../style';

import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';

import { useHistory } from "react-router-dom";
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl, getVendorapi } from '../../../../redux/apis/DataAction';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const dataSource = ['Merchantsku','tessting'];
let counter = 0;
const Selectdata=()=>
{
     dataSource.push({
        key: counter++,
      
        Update: <Button type="primary"></Button>
     
      });
      console.log(dataSource);
    const columns = [
        {
          title: 'Merchantsku',
          dataIndex: 'Merchantsku',
          key: 'Merchantsku',
        },
        {
          title: 'Colorname',
          dataIndex: 'Colorname',
          key: 'Colorname',
        },
        {
          title: 'Cost',
          dataIndex: 'Cost',
          key: 'Cost',
        },
        {
          title: 'PU_Price',
          dataIndex: 'PU_Price',
          key: 'PU_Price',
        },
        {
          title: 'PUStatus',
          dataIndex: 'PUStatus',
          key: 'PUStatus',
        },
        {
          title: 'Mapprice',
          dataIndex: 'Mapprice',
          key: 'Mapprice',
        },
        {
          title: 'Amazonprice',
          dataIndex: 'Amazonprice',
          key: 'Amazonprice',
        },
        {
          title: 'Stylestatus',
          dataIndex: 'Stylestatus',
          key: 'Stylestatus',
        },
        {
          title: 'Vendorqty',
          dataIndex: 'Vendorqty',
          key: 'Vendorqty',
        },
        {
          title: 'Upc',
          dataIndex: 'Upc',
          key: 'Upc',
        },
        {
          title: 'PU_ASIN',
          dataIndex: 'PU_ASIN',
          key: 'PU_ASIN',
        },
        {
          title: 'Rizno_ASIN',
          dataIndex: 'Rizno_ASIN',
          key: 'Rizno_ASIN',
        },
        {
          title: 'Ismap',
          dataIndex: 'Ismap',
          key: 'Ismap',
        },
        {
          title: 'Inhouseqty',
          dataIndex: 'Inhouseqty',
          key: 'Inhouseqty',
        },
        {
          title: 'Maincost',
          dataIndex: 'Maincost',
          key: 'Maincost',
        },
        {
          title: 'Salecost',
          dataIndex: 'Salecost',
          key: 'Salecost',
        },
        {
          title: 'Zone0',
          dataIndex: 'Zone0',
          key: 'Zone0',
        },
        {
          title: 'Zone1',
          dataIndex: 'Zone1',
          key: 'Zone1',
        },
        {
          title: 'Vendorstylecode',
          dataIndex: 'Vendorstylecode',
          key: 'Vendorstylecode',
        }
        ,
        {
          title: 'Isautomated_PU',
          dataIndex: 'Isautomated_PU',
          key: 'Isautomated_PU',
        }
        ,
        {
          title: 'Vendorstatus',
          dataIndex: 'Vendorstatus',
          key: 'Vendorstatus',
        }
        ,
        {
          title: 'Weight',
          dataIndex: 'Weight',
          key: 'Weight',
        } ,
        {
          title: 'Marketplace_Weight',
          dataIndex: 'Marketplace_Weight',
          key: 'Marketplace_Weight',
        },
        {
          title: 'Uploadtype',
          dataIndex: 'Uploadtype',
          key: 'Uploadtype',
        }
        ,
        {
          title: 'Modify',
          dataIndex: 'Update',
          key: 'Update',
        }
      ];
return (
<>
<Row gutter={25}>
        <Col span={12}>
          <Input placeholder="Search"  style={{ width: '100%', marginLeft: 20, marginRight: 20, marginTop: 10 }} />
      
        </Col>
  
      </Row>
      <Row gutter={25} style={{ marginTop: 10, marginLeft: 10}}>
        <Col xs={24}>
          <Cards headless>
            <ProjectList>
              
                <div className="table-responsive">
                  {/* <Table pagination={true} dataSource={dataSource} columns={columns} /> */}
                  
                  <Table pagination={true} dataSource={dataSource} columns={columns} >
                  <tr>
                      <td>
                          <Button type="primary">Update</Button>
                          </td>
                      </tr>
                  </Table>
                </div>
                :
                <div style={{ textAlign: 'center' }}>
                  <Spin />
                </div>
              

            </ProjectList>
          </Cards>
        </Col>

      </Row>
</>

)

}


export default Selectdata; 