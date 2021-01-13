import BagsList from './overview/BagsList';
import { Input,InputNumber,Col, Row, Select, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
//import { Input,Row,Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { getBagsAPI } from '../../redux/apis/DataAction';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, getDepartsAPI } from '../../redux/apis/DataAction';
import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { connectSocket } from '../../redux/socket/socketAction';
import { addAllTickets, addTicket, addDepart } from '../../redux/ticket/actionCreator';
//import { Main } from '../styled';
import { Main } from '../styled';
import { ProjectHeader, ProjectSorting } from './style';
import { useHistory } from "react-router-dom";
import { uploadUrl } from './../../redux/apis/DataAction';

const AddBags = (props) => {
    
    const { path } = props.match;
    const dispatch = useDispatch();
    const [Bags, setBags] = useState([]);

    useEffect(() => {
        // setState({ ...state, loader: true })

    
        // get bags 
        dispatch(getBagsAPI({})).then(data => {
          console.log('12310', data)
        //  dispatch(addAllTickets(data))
         // setState({ ...state, filterTickets: data, loader: false });
        })

      }, []);
    

    return (
       <>
        <ProjectHeader>
        <PageHeader
          ghost
          title="Shipping Bags"
          // subTitle={<>{tickets.length} Running Tickets</>}
          buttons={[
            <Button  key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} /> Submit
            </Button>,
          ]}
        />
      </ProjectHeader>

      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Row style={{ marginBottom: 10 }} gutter={10}>
              <Col md={12} xs={24}>
                <div className="project-sort-search">
                <InputNumber size="large" min={1} max={100000}  />

                </div>
              </Col>

              <Col md={12} xs={24}>
                <div className="project-sort-search">
                <InputNumber size="large" min={1} max={100000}  />
                </div>
              </Col>


            
            </Row>

            <div>
              <Switch>
                <Suspense
                  fallback={
                    <div className="spin">
                      <Spin />
                    </div>
                  }
                >
                  {/* <Route path={path} render={(props) => <BagsList {...props} loader={loader} filterTickets={filterTickets} StatusSort={StatusSort} />} exact />
                  <Route path={`${path}/grid`} render={(props) => <BagsList {...props} loader={loader} filterTicket={filterTickets} StatusSort={StatusSort} />} />
                  <Route path={`${path}/list`} render={(props) => <BagsList {...props} loader={loader} filterTicket={filterTickets} StatusSort={StatusSort} />} /> */}
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
     
      </Main>
     </>

      
            

 

    )
}

export default AddBags;
