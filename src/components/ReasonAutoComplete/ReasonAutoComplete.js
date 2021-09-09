import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Form, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Div } from './header-search-style';
import { headerSearchAction } from '../../redux/headerSearch/actionCreator';
import { Popover } from '../popup/popup';

const ReasonAutoComplete = ({ darkMode, dataSource, onReasonSelect, selectedReason, onInputChange, placeholder }) => {
  const dispatch = useDispatch();
  // let searchData = dataSource;
  // const searchData = useSelector(state => state.headerSearchData);
  const rtl = useSelector(state => state.ChangeLayoutMode.rtlData);

  const [searchData, setSearchData] = useState(dataSource)
  const search = e => {
    setSearchData(dataSource.filter(val => val.toLowerCase().includes(e.target.value.toLowerCase())))
    // dispatch(headerSearchAction(e.target.value));
  };

  const content = (
    <div>
      {searchData.length ? (
        searchData.map((group, i) => {
           return (
            i < 4 &&
             <Button size="large"  onClick={()=>{onReasonSelect(group)}} key={group} to="#">
              {group}
            </Button>
          );
        })
      ) : (
        <NavLink to="#"></NavLink>
      )}
    </div>
  );

  return (
    <>
      <Div  className="certain-category-search-wrapper " style={{ width: '100%' }} darkMode={darkMode}>
        <Row className="ant-row-middle testing" >
          <Col md={22} xs={23} >
            <Popover
              placement={!rtl ? 'bottomLeft' : 'bottomRight'}
              content={content}
              // title="Reason"
              action="focus"
            >
              <Input style={{borderWidth: 1}} placeholder={placeholder} onInput={search} value={selectedReason} onChange={(e) => {onInputChange(e.target.value)}}/>
            </Popover>
          </Col>
        </Row>
      </Div>
    </>
  );
};

ReasonAutoComplete.propTypes = {
  darkMode: PropTypes.bool,
};

export default ReasonAutoComplete;
