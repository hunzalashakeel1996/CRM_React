import moment from 'moment';

export const formatDate = (date) => {
    let datePart = moment(`${date.split('T')[0]}`).format('MM-DD-YYYY')
    let timePart = `${date.split('T')[1].split('.')[0]}`.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timePart];
    if (timePart.length > 1) { // If timePart format correct
        timePart = timePart.slice(1);  // Remove full string match value
        timePart[5] = +timePart[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        timePart[0] = +timePart[0] % 12 || 12; // Adjust hours
    }
    timePart.splice(3, 1);
    return `${datePart} ${timePart.join('')}`
}