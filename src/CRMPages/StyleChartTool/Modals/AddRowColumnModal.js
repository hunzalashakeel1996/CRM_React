import './style.css';

import { Modal, Spin, Select, Row, Col, Radio } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const AddRowColumnModal = ({ isModalOpen, loader, sizeChartValues, sizeChartDetails, onAddRowColumn, closeModal }) => {
    const [state, setState] = useState({
        selectedValueToAdd: 'Row',
        numberToAdd: 0
    });
    const { selectedValueToAdd, numberToAdd } = state

    const addRowColumn = () => {
        let tempSizeChartValues = JSON.parse(JSON.stringify(sizeChartValues))
        let numberOfRows = sizeChartValues.length
        let numberOfColumns = sizeChartValues[0].length
        if (selectedValueToAdd == 'Row') {
            for (let i = 0; i < numberToAdd; i++) {
                tempSizeChartValues.push([...new Array(sizeChartDetails[0].length)].fill(''))
                numberOfRows++
            }
        }
        else {
            for (let i = 0; i < sizeChartDetails[0].length; i++) {
                tempSizeChartValues[i] = [...tempSizeChartValues[i], ...new Array(parseInt(numberToAdd)).fill('')]
            }
            numberOfColumns = numberOfColumns + parseInt(numberToAdd)
        }
        onAddRowColumn(tempSizeChartValues, numberOfRows, numberOfColumns)
    }

    return (
        <>
            <Spin spinning={loader}>
                <Modal title="Add New Row/Column" visible={isModalOpen === 'AddRowColumn'} width={800} onOk={() => { addRowColumn()}} onCancel={() => { closeModal()}} okText='Add'>
                    <Row>
                        <Select showSearch defaultValue='' style={{ width: '50%' }} onChange={(val) => { console.log(val); setState({...state, numberToAdd: val})}}>
                            <Option key=''>Number of Row/Column</Option>
                            {numbers.map((number) => (
                                <Option key={number}>{number}</Option>
                            ))}
                        </Select>
                    </Row>

                    <Row style={{marginTop: 20}}>
                        <Radio.Group name="numberOfRowsColumns" defaultValue={'Row'} onChange={(value) => {console.log(value.target.value); setState({...state, selectedValueToAdd: value.target.value})}}>
                            <Radio value={'Row'}>Row</Radio>
                            <Radio value={'Column'}>Column</Radio>
                        </Radio.Group>
                    </Row>
                </Modal>
            </Spin>
        </>
    );
};

export default AddRowColumnModal;
