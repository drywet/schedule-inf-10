function format (date) {
  var dd = date.getDate(),
      mm = date.getMonth()+1,
      yyyy = date.getFullYear();
  return (dd > 9 ? dd : "0"+dd)+"."+mm+"."+yyyy;
}

chrome.browserAction.onClicked.addListener(
  function(tab) {
    var first = true;

    var today = new Date(),
        dof = (today.getDay()+1)%7,
        d1 = format(today),
        d2 = format(new Date(today.getTime() + ((3 * 7 - dof+1) * 24 * 60 * 60 * 1000)));

    chrome.tabs.create(
      {
        active: true,
        url:"http://cist.kture.kharkov.ua/ias/app/tt/f?p=778:201:4195128929910427:::201:P201_FIRST_DATE,P201_LAST_DATE,P201_GROUP,P201_POTOK:"+d1+","+d2+","+(first ? "2944121" : "3637184")+",0:"
      },
      function(){}
    );
  }
);