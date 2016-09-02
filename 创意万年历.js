// JavaScript 
//节气数据
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//获取当前选中的年份
function checkYear(){
	  var yselect=document.getElementById("year");
	  var yindex=yselect.selectedIndex;
	  var year=yselect.options[yindex].text;
	  return year;
}
//获取当前选中的月份
function checkMonth(){
	  var mselect=document.getElementById("month");
	  var mindex=mselect.selectedIndex;
	  month=mselect.options[mindex].text;	
	  return month;
}
//获取当前选中的日期
function daycheck(){
	  var dselect=document.getElementById("hday");
	  console.log(dselect.nodeType);
	  var op=hday.getElementsByTagName("option");
	  //console.log(op.length);
	  var daydex=dselect.selectedIndex;
	  day=dselect.options[daydex].text;	
	  return day;
}
//下拉框中选中对应的日期时背景色进行变化
function backDay()
{
	year=checkYear();
	//获取到选中的月
	month=checkMonth();
	//获取该月一号是周几
	var thisday=new Date(year+","+month+","+"1");
	var firstweek=thisday.getDay();
	//获取该月有多少天
	var days=getMonthDays(year,month);
	var day=daycheck();
	var tbody=document.getElementById("tbody");
	var Day=tbody.getElementsByTagName("td");
	for(var i=0;i<41;i++)
		{
			Day[i].style.backgroundColor="white";
		}
	for(var i=firstweek,j=0;i<Day.length&&j<days;i++,j++)
	{
		if(day==Day[i].innerHTML)
		{
			Day[i].style.backgroundColor="pink";
		}

	}
}

//获取month月天数
function getMonthDays(year,month){
	var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);

	if(!(month-2))
	{
        return(((year%4==0)&&(year%100!=0)||(year%400==0))?29:28);
    }
	else
      return(solarMonth[month-1]);
}
//判断时间是否小于10
function checkTime1(i)
{
	if(i<10)
		i="0"+i;
	return i;
}
//获取本地时间并显示
 function localTime()
 {
	   var show = document.getElementById("localtime");
	   var time = new Date();
	   var h=time.getHours();
	   var m=time.getMinutes();
	   var s=time.getSeconds();
	   h=checkTime1(h);
	   m=checkTime1(m);
	   s=checkTime1(s);
	   show.innerHTML =h+":"+m+":"+s;
       setInterval(function() {
	   var time = new Date();
	   var h=time.getHours();
	   var m=time.getMinutes();
	   var s=time.getSeconds();
	   h=checkTime1(h);
	   m=checkTime1(m);
	   s=checkTime1(s);
	   show.innerHTML =h+":"+m+":"+s;
	  }, 1000);
 }


//返回y年的第n个节气(从0小寒起算)
function sTerm(y,n) {
   var offDate = new Date((31556925974.7*(y-1900)+sTermInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
   return(offDate.getUTCDate())
}
//随着鼠标移动，日期背景颜色改变
function clickColor()
{
	var tbody=document.getElementById("tbody");
	var Day=tbody.getElementsByTagName("td");
	
	for(var i=0;i<Day.length;i++)
	{
		Day[i].onmouseover=function(){
	    this.style.backgroundColor="#F9E2EF";
		//addClass(this,"odd");
		}
		Day[i].onmouseout=function(){
		this.style.backgroundColor="white";
		}
		
	}
}
   //初始化
function selectDate(days,firstweek,tmp1,tmp2,month){
		var tbody=document.getElementById("tbody");
		var Day=tbody.getElementsByTagName("td");
		for(var i=0;i<41;i++)
		{
			Day[i].innerHTML="";
		}
		for(var i=firstweek,j=0;i<Day.length&&j<days;i++,j++)
		{	
			
			Day[i].innerHTML=j+1;
			//判断日期是否与农历节气所对应
			if( j+1==tmp1)
			{
				var node1=document.createElement("div");
				var txt=document.createTextNode(solarTerm[(month-1)*2]);
				node1.appendChild(txt);
				node1.style.fontSize="0.6em";
				node1.style.color="#999";
				node1.style.paddingTop="5px";
				Day[i].appendChild(node1);
			}
			//判断日期是否与农历节气所对应
			 if(j+1==tmp2)
			{
				var node1=document.createElement("div");
				var txt=document.createTextNode(solarTerm[(month-1)*2+1]);
				node1.style.fontSize="0.6em";
				node1.style.color="#999";
				node1.style.paddingTop="5px";
				//addClass(node1,"odd");
				node1.appendChild(txt);
				Day[i].appendChild(node1);
			}
		}	
	
}
//显示公历节日
function selectFestival(month,days,firstweek){
     //定义节假日数组
	 var json=[{"1":"元旦"},{"14":"情人节"},{"8":"妇女节","12":"植树节","15":"消费者权益日"},{"1":"愚人节"},
			 {"1":"劳动节","4":"青年节","12":"护士节"},{"1":"儿童节"},{"1":"建党节"},{"1":"建军节"},
			 {"10":"教师节","28":"孔子诞辰"},{"1":"国庆节","6":"老人节","24":"联合国日"},{"17":"国际大学生节"},
			 {"24":"平安夜","25":"圣诞节"}];
	 var tbody=document.getElementById("tbody");
	 var Day=tbody.getElementsByTagName("td");
	 for(var i=0,l=json.length;i<l;i++){
		if(month==(i+1)){
			  for(var j=firstweek,k=0;j<Day.length&&k<days;j++,k++){
				  for(var key in json[i]){
						if(key==(k+1)){
								var node1=document.createElement("div");
								var txt=document.createTextNode(json[i][key]);
								node1.appendChild(txt);
								node1.style.fontSize="0.6em";
								node1.style.color="#999";
								node1.style.paddingTop="5px";
								Day[j].appendChild(node1);	
						  }
						 
				  }
			  }
					
		}
	}
}
//得到year年生肖并显示
function yearAnimal(year)
{	
	var animal=document.getElementById("animal");
	var child=animal.childNodes;
	for(var j=child.length-1;j>=0;j--)
	{
		animal.removeChild(child[j]);
	}
	var animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
	var flag=(year-1900)%12;
	var txt1=document.createTextNode("【");
	var txt2=document.createTextNode(animals[flag]);
	var txt3=document.createTextNode("】");
	animal.appendChild(txt1);
	animal.appendChild(txt2);
	animal.appendChild(txt3);

}
//根据该月天数显示日期
function chooseDay(days)
{	
	//获取当前日期
	var today=new Date();
	var tday=today.getDate();
	//console.log(tday);
	//获得日期元素
	var hday=document.getElementById("hday");
	var child=hday.childNodes;
	//移除日期元素hday的所有元素
	for(var j=child.length-1;j>=0;j--)
	{
		hday.removeChild(child[j]);
	}
	//根据该月天数days给日期元素添加<option>
	for(var i=0;i<days;i++)
	{
		var node1=document.createElement("option");
		var txt=document.createTextNode(i+1);
		node1.appendChild(txt);
		//console.log(node1.innerHTML);
		//如果当前<option>元素的值与tday相等，给<option>添加一个selected属性
		if(tday==node1.innerHTML)
			node1.setAttribute("selected","selected");
		hday.appendChild(node1);
	}
}
//获取本地年份、月份并进行设置
function todayTime()
{
	
	var today=new Date();
	var tyear=today.getFullYear();
	var tmonth=today.getMonth()+1;
	var tday=today.getDate();
	//console.log(tday);
	var year=document.getElementById("year");
	//console.log(tyear);
	var yearOption=year.getElementsByTagName("option");
	//console.log(yearOption[0].innerHTML);
	//console.log(yearOption.length);
	for(var i=0;i<yearOption.length;i++)
	{
		if(tyear==yearOption[i].innerHTML){
			yearOption[i].setAttribute("selected","selected");
			//console.log(yearOption[i].getAttribute("selected"));
		}
		//console.log(yearOption[i].getAttribute("selected"));
	}
	//console.log(tmonth);
	var todaymonth=document.getElementById("month");
	var monthOption=todaymonth.getElementsByTagName("option");
	//console.log(monthOption.length);
	for(var j=0;j<monthOption.length;j++)
	{
		if(tmonth==monthOption[j].innerHTML)
			monthOption[j].setAttribute("selected","selected");
	}
	
}

function checkDate(){
		  //获取到选中的年
		   year=checkYear();
		  //获取year年生肖
		   yearAnimal(year);
		  //获取到选中的月
		   month=checkMonth();
		  //获取该月一号是周几
		   var thisday=new Date(year+","+month+","+"1");
		   var firstweek=thisday.getDay();
		  //获取该月有多少天
		  var days=getMonthDays(year,month);
		  //根据days判断日期
		  chooseDay(days);
		  //计算24节气tmp1:代表某个月个月第一个节气的日期，tmp2:代表某个月第二个节气的日期
			 tmp1=sTerm(year,(month-1)*2);
			 tmp2=sTerm(year,(month-1)*2+1);
		  //遍历公历日子存入日历中并填入对应的农历节气
		     selectDate(days,firstweek,tmp1,tmp2,month);
		  //存入公历节日
			 selectFestival(month,days,firstweek);

}
//添加类名
function addClass(element,value)
{
	if(!element.className)
	{
		element.className=value;
	}
	else
	{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}
//给window.onload添加函数
function addLoadEvent(func)
{
	var oldonload=window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
//点击“今日”按钮时调用该函数
function renovates1()
{
		/*localTime();
		todayTime();
		checkDate();*/
		document.location.reload();
		//console.log(1);
}
function renovates2()
{
	document.location.reload();
}
addLoadEvent(localTime);
addLoadEvent(todayTime);
addLoadEvent(checkDate);
addLoadEvent(clickColor);
addLoadEvent(groundcolor);

