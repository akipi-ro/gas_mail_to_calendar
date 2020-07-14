function myFunction() {
//
  const fetchData = (str, pre, suf) => {
    const reg = new RegExp(pre + '.*?' + suf, 'g');
    const data = str.match(reg)[0]
      .replace(pre, '')
      .replace(suf, '');
    return data;  
  };
  
  
  
  const query = '"ゼミの連絡"';
  const start = 0;
  const max = 1;
 
  const threads = GmailApp.search(query, start, max);
  const messagesForThreads = GmailApp.getMessagesForThreads(threads);
 
  for(const messages of messagesForThreads){
    for(const message of messages){
      const body = message.getPlainBody();;
     
      var str = fetchData(body, '日時：', '\r')
      
      var month = fetchData(body, '日時：', '月')//月
      console.log(month.replace("日時：",""));//日
      
      var day = fetchData(body, '月', '日')
      console.log(day.replace("月", ""));
  
      
      console.log(fetchData(body, '日時：', '\r'));//確認用
      console.log(fetchData(body, '場所：', '\r'));//確認用
      console.log(fetchData(body, '内容：', '\r'));//確認用
    
     
  
  var result = body.match(/日時：\d{1,2}月\d{1,2}日\([月|火|水|木|金|土|日]\)\s*(\d{1,2}:\d{1,2})/) //時間抽出
  
  
  var month = fetchData(body, '日時：', '月')//月
  var day = fetchData(body, '月', '日')    //日
  var time = result[1]//時間
  
  
  const content = fetchData(body, '内容：', '\r') 
  const place = fetchData(body, '場所：', '\r') 
  
  
  const calendar = CalendarApp.getDefaultCalendar();
  
  const title = 'ゼミ';
  const startTime = new Date('2020/' + month + '/' + day +' '+ time);//この表現できないのか。。 
  const endTime = new Date('2020/' + month + '/' + day +' '+ time);
  
  var options = {
    description: content,
    location: place
  } 
  
  var event = CalendarApp.createEvent(title, startTime, endTime, options);
  }
 }
}
