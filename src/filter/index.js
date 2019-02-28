import moment from 'moment';

export function filterTime(value) {
  let current = moment().format('YYYY-MM-DD HH:mm:ss');
  let time = moment(value).subtract(-1, "days").format("YYYY-MM-DD HH:mm:ss");
  let currentDv = moment(current) - moment(value);
  let threeDv = moment(time) - moment(value);
  if(currentDv > threeDv){
      return moment(value).format("YYYY-MM-DD");
  }else{
      moment.locale('zh-cn') 
      return moment(value, "YYYY-MM-DD hh:mm:ss").fromNow()
  }
}
