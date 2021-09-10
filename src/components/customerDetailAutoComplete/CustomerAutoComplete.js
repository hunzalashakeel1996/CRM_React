import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Form, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Div } from './header-search-style';
import { headerSearchAction } from '../../redux/headerSearch/actionCreator';
import { Popover } from '../popup/popup';

const CustomerAutoComplete = ({ darkMode, dataSource, onOptionSelect, selectedOption, onInputChange, placeholder, targetKey }) => {
  const dispatch = useDispatch();
  const rtl = useSelector(state => state.ChangeLayoutMode.rtlData);

  const [searchData, setSearchData] = useState(dataSource)

    useEffect(() => {
        if (dataSource.length > 0)
            setSearchData(dataSource)
    }, [dataSource]);

  const search = e => {
    setSearchData(dataSource.filter(val => val[targetKey].toLowerCase().includes(e.target.value.toLowerCase())))
  };
  const content = (
    <div>
      {searchData.length > 0 ? (
        searchData.map((group, i) => {
            let tempTargetKey = targetKey
           return (
            i < 4 &&
             <Button size="large"  onClick={()=>{onOptionSelect(group[tempTargetKey])}} key={group[tempTargetKey]} to="#">
              {group[tempTargetKey]}
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
              <Input autoComplete="new-password" style={{borderWidth: 1}} placeholder={placeholder} onInput={search} value={selectedOption} onChange={(e) => {onInputChange(e.target.value)}}/>
            </Popover>
          </Col>
        </Row>
      </Div>
    </>
  );
};

CustomerAutoComplete.propTypes = {
  darkMode: PropTypes.bool,
};

export default CustomerAutoComplete;
