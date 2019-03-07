import moment from 'moment';
import icon from "@/utils/icon";

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


export function emojiChange(value) {

  let m = value.match(/\[(.+?)\]/g);
  if(m){
    m.map(reg => {
      for(let emojiArr in icon.emotions){
        let arr = icon.emotions[emojiArr];
        arr.map(emoji => {
            if(emoji.phrase == reg){
              value = value.replace(/\[(.+?)\]/,`<img class='emoji-icon' src='${emoji.url}' />`)
            }
        })
      }
    })
  }
  return value;
}