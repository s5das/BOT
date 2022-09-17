export default function (fmt) { 
    let year = fmt.getFullYear() 
    let month = fmt.getMonth()+1
    let day = fmt.getDate()
    let hour = fmt.getHours()
    let minute = fmt.getMinutes()
    
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour< 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }

    return ''+year+'-'+month+'-'+day+' '+hour + ':' + minute;
} 