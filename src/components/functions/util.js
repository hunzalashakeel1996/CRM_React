import React, { useState } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import { DrawerStyle } from './style';
import { Button } from '../buttons/buttons';


const downloadFile =(data)=>
{
var d = new Date();
var n = d.getTime();
var a = document.createElement('a');
a.href = `http://localhost:47463/admin/${data}`;
a.target = '_blank';
a.download = `http://localhost:47463/admin/${data}`;
document.body.appendChild(a);
a.click();

}


export { downloadFile };
