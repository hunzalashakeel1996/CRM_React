import { Col, Row, Select, Spin, Radio } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from './style';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl, getAzabAPI } from '../../redux/apis/DataAction';
import './DasboardAzab.css';
const AzabReportList = lazy(() => import('./overview/AzabReportList'));

const ViewAzabReport = (props) => {
  const dispatch = useDispatch();
  const { path } = props.match;

  const [state, setState] = useState({

    visible: false,
    filterAzabReport: [],
    loader: false,
    monthvalue: 0,
    value: 'All'


  });
  const { visible, loader, filterAzabReport, monthvalue } = state;

  //     useEffect(() => {
  //     setState({ ...state, loader: true })
  //     // console.log('check')

  //     // get report 
  //     dispatch(getAzabAPI({ month: state.monthvalue })).then(data => {
  //       // console.log('12310', data)

  //       setState({ ...state, filterAzabReport: data, loader: false });
  //     })


  //   }, [state.monthvalue]);





  const handleChange = (value) => {
    // console.log('aaa', value)
    setState({ ...state, value, loader: false });
  }
  const getmonth = (value) => {
    //// console.log(`Selected: ${value}`);
    //   monthvalue(value)
    setState({ ...state, loader: true })
    // console.log('value',value)
    value = value == 'All'?0:value

    // get report 
    dispatch(getAzabAPI({ month: value })).then(data => {
      // console.log('12310', data)

      setState({ ...state, filterAzabReport: data, loader: false });
    })
    //setState({ ...state, monthvalue: value, loader: false });

    // // console.log(state.monthvalue);

  }
  const month = ['All','jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // const children = [];
  // for (let i = 1; i <month.length; i++) {

  //     children.push(<Option key={[i]}>{month[i]}</Option>);
  // }

  const SelectSizesDemo = () => {
    const [size, setSize] = React.useState('default');

    const handleSizeChange = e => {
      setSize(e.target.value);
   
    };

    return (
      <>
        <Row gutter={24} style={{paddingLeft:'0 !important',}}>

          <Col xs={14} lg={6}>
            <Select value={state.value} size={size} defaultValue={month[0]} onChange={handleChange} style={{ width: 200, marginLeft: 20, marginRight: 20 }}>
              {month.map((val, i) => (
            
                <Option key={i}>{val}</Option>
              ))}
              {/* {children} */}
            </Select>
          </Col>

          <Col >
            <Button type="primary" onClick={(value) => getmonth(state.value)}> Azab Report   </Button>
            {/* OrderCount:{state.filterAzabReport.length} */}
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Azab Report"
        />
      </ProjectHeader>
      <SelectSizesDemo />
      <div>
        <Switch>
          <Suspense
            fallback={
              <div className="spin">
                <Spin />
              </div>
            }
          >
            <Route path={path} render={(props) => <AzabReportList {...props} loader={loader} filterAzabReport={filterAzabReport} />} exact />
            <Route path={`${path}/grid`} render={(props) => <AzabReportList {...props} loader={loader} filterAzabReport={filterAzabReport} />} />
            <Route path={`${path}/list`} render={(props) => <AzabReportList {...props} loader={loader} filterAzabReport={filterAzabReport} />} />
          </Suspense>
        </Switch>
      </div>
      <Main>


      </Main>
    </>
  )
}


export default ViewAzabReport;