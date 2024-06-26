import { WebConfig } from "src/app/core/config/WebConfig";

let tinymce: any;
export const fnCommon = {
  fnFileUpload : (cb:any, value:any, meta:any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', (e:any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        const id = 'blobid' + (new Date()).getTime();
        const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result?.toString().split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        cb(blobInfo.blobUri(), { title: file.name });
      });
    });
    input.click();
  },

  uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c:any) =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  },
  convertDateSQL(dateString:string){
    if(!dateString) return;
    try {
      let date = dateString.split('-');
      const dateTransfrom = new Date(`${date[2]}-${date[1]}-${date[0]}`).toISOString();
      return this.convertTo0h(dateTransfrom);
    } catch (error) {
      return this.convertTo0h(dateString);
    }
  },
  convertTo0h(dateString:string){
    const date = dateString.split('T');
    return date[0] + 'T00:00:00.000Z'
  },

  EncodeBtoa(str:string){
    try {
      return encodeURIComponent(str)
    } catch (error) {
      return str
    }
  },
  // DecodeAtob(str:string){
  //   try {
  //     return decodeURIComponent(escape(window.atob(str)));
  //   } catch (error) {
  //     return str
  //   }
  // },
  ConvertPhotoUrl(photoID:string,type:string){
    const apiIMG = WebConfig.strUrl + "Utility/GetVideoOrImage?id=";
    if (photoID) {
        return apiIMG + btoa(photoID) + '&type=' + type;
    }
    else return apiIMG;
  },
  ConvertPhotoEmp(photoID:string){
    const apiIMG = WebConfig.strUrl + "Utility/EmpPhoto?id=";
    if (photoID) {
        return apiIMG + btoa(photoID)
    }
    else return apiIMG;
  },
  ConvertPhotoEmpByUserID(EmpPhotoByUserID:string){
    const apiIMG = WebConfig.strUrl + "Utility/EmpPhotoByUserID?id=";
    if (EmpPhotoByUserID) {
        return apiIMG + btoa(EmpPhotoByUserID)
    }
    else return apiIMG;
  },
  CheckFile(filename:string){

    try {
      const apiIMG = WebConfig.strUrl + "Utility/CheckUploadFile?fileName=";
      if (filename) {
          return apiIMG + btoa(filename.split('.')[1]);
      }
      else return false;
    } catch (error) {
      return false;
    }

  },

  LoseFocus(){
    var data = document.querySelector('.e-active') as HTMLElement
    if(data){
      data.click()
    }
  },

  formatDateddMMYYYY(date:string){
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm:any = today.getMonth() + 1; // Months start at 0!
    let dd:any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday
  },
  getGridHeight(){
    return window.innerHeight - 220;
  },
  preventLoseGridFocus(row:any){
    const tdsall = document.querySelectorAll('td.e-active');
    if(tdsall.length > 0){
      tdsall.forEach((x:any)=>{
          x.className = x.classList.toString().split(' ').filter((x:any) => x != 'e-active').join(' ')
      })
    }
    const tds = row.querySelectorAll('td')
    if(tds.length > 0){
      tds.forEach((x:any)=>{
        setTimeout(() => {
          x.classList.remove('e-active')
          x.classList.add('e-active')
        }, 100);
      })
    }
  },
  validateEmail(email:string){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },

  validatePhoneNumber(phone:string){
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return phone.match(regexPhoneNumber) ? true : false;
  },
  getWeekdayVn(date:any):string {
    if (!date) {
      return '';
    }
    const weekdays:any = {
      'monday': '2',
      'tuesday': '3',
      ' wednesday': '4',
      'thursday': '5',
      'friday': '6',
      'saturday': '7',
      'sunday': 'CN'
    };
    try {
      date = new Date(date);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      return weekdays[weekday] || '';
    } catch (error) {
      return ''
    }
  },
  getDateVN(date:string):string{
    const today = new Date(date);
    const dd = today.getDate().toString().padStart(2, '0');
    const MM = (today.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${MM}/${yyyy}`;
    return formattedDate
  },
  getHour(date:string):string{
    const now = new Date(date);
    const hh = now.getHours().toString().padStart(2, '0');
    const mm = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hh}:${mm}`;
    return formattedTime;
  }
}
