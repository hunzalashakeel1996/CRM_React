const textRefactor = (text, size) => {
  return `${text
    .split(' ')
    .slice(0, size)
    .join(' ')}...`;
};

const chartLinearGradient = (canvas, height, color) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${color.start}`);
  gradient.addColorStop(1, `${color.end}`);
  return gradient;
};

//Download files
const downloadFile = (data) => {
  console.log('utilities',data)
  var d = new Date();
  var n = d.getTime();
  var a = document.createElement('a');
  //Live Downlaod Link
  a.href = `https://crm.rizno.com/admin/${data}`;
  //Local Download Link
  //a.href = `http://localhost:47463/admin/${data}`;
  a.target = '_blank';
  a.download = n + '.txt';
  document.body.appendChild(a);
  a.click();
  // document.body.removeChild(a);

}
const downloadFileTableData = (objArray,Filename) => {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var line = '';
  for (var index in array[0]) {
    line += '"' + index + '",';
  }
  line.slice(0, line.Length - 1);
  str += line + '\r\n';
  line = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      line += '"' + array[i][index] + '",';
    }
    line.slice(0, line.Length - 1);
    str += line + '\r\n';
  }
  // chrome.runtime.sendMessage({
  //   action: 'browseAndUpload',
  //   csv: [str]
  // });
  var csvString = str;
  var d = new Date();
  //  var n = d.getTime();
  var n = Filename
  var a = document.createElement('a');
  a.href = 'data:attachment/csv,' + escape(csvString);
  a.target = '_blank';
  a.download = n + '.csv';
  document.body.appendChild(a);
  a.click();
}

const downloadFiles = async (url) => {
    
  };

const DownlaodWithReact = (objArray) => {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var index in array[0]) {
      line += index + ',';
  }
  str += line + '\r\n';
  line = '';
  for (var i = 0; i < array.length; i++) {
  var line = '';
  /*for (var index in array[i]) {
  line += array[i][index] + ',';
  }*/
  //Here is an example where you would wrap the values in double quotes
  for (var index in array[i]) {
  line += '"' + (array[i][index] + "").replace(/"/g, '\"') + '",';
  }
  line.slice(0, line.Length - 1);
  str += line + '\r\n';
  }
  // window.open("data:text/csv;charset=utf-8," + escape(str))
  var uri = 'data:text/csv;charset=utf-8,' + escape(str);
  
  var downloadLink = document.createElement("a");
  downloadLink.href = uri;
  downloadLink.download = "ConfermationNO.csv";
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  }

//Get Total
const getTotals = (data, key) => {
  // // console.log('data' , data)
let total = 0;
data.forEach(item => {
total += parseInt(item[key]);
//   // console.log('item key' ,  parseInt(item[key]))
//   // console.log('loop' , total)
});
// console.log('final' , total) 
return total;
};

// Custom Tooltip
const customTooltips = function (tooltip) {
  // Tooltip Element
  let tooltipEl = document.querySelector('.chartjs-tooltip');

  if (!this._chart.canvas.closest('.parentContainer').contains(tooltipEl)) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';

    document.querySelectorAll('.parentContainer').forEach(el => {
      if (el.contains(document.querySelector('.chartjs-tooltip'))) {
        document.querySelector('.chartjs-tooltip').remove();
      }
    });

    this._chart.canvas.closest('.parentContainer').appendChild(tooltipEl);
  }



  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body, i) {
      const colors = tooltip.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += '; border-width: 2px';
      style += '; border-radius: 30px';
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });

    innerHtml += '</tbody>';

    const tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const positionY = this._chart.canvas.offsetTop;
  const positionX = this._chart.canvas.offsetLeft;
  const toolTip = document.querySelector('.chartjs-tooltip');
  const toolTipHeight = toolTip.clientHeight;

  // Display, position, and set styles for font 

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
  tooltipEl.style.top = `${positionY +
    tooltip.caretY -
    (tooltip.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
  tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  tooltipEl.style.fontSize = `${tooltip.bodyFontSize}px`;
  tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  tooltipEl.style.padding = `${tooltip.yPadding}px ${tooltip.xPadding}px`;
};


const checkPageAccess = (userAccess, parentBarName, childBarName, history) => {
  if(!Object.keys(JSON.parse(userAccess.child_bar)).includes(parentBarName) || !JSON.parse(userAccess.child_bar)[parentBarName].includes(childBarName))
    history.push('/admin/NotFoundPage')
}

export {downloadFileTableData, textRefactor, chartLinearGradient, customTooltips, downloadFile,DownlaodWithReact, getTotals, checkPageAccess};
