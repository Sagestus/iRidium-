var DEMOTAGS = [{
		Name : "System Room Selector",
		Type : "Selector",
		Channel : "Screen",
		Icon : "",
		Smart : {}
	}, {
		Name : "HDL Curtain",
		Type : "Blinds",
		Channel : "YardBlinds",
		Icon : "F",
		Smart : {}
	}, {
		Name : "HDL Relay",
		Type : "Relay",
		Channel : "YardWatering",
		Icon : "8",
		Smart : {}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "YardRoomLights",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Relay",
		Type : "Relay",
		Channel : "YardSideLight",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Toggle.On",
			"Turn Off" : "API.Light.Switch.Toggle.Off"
		}
	}, {
		Name : "HDL Curtain",
		Type : "Blinds",
		Channel : "BedroomBlinds",
		Icon : "N",
		Smart : {}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "BedroomBedLight",
		Icon : "e",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Curtain",
		Type : "Blinds",
		Channel : "CinemaScreen",
		Icon : "p",
		Smart : {}
	}, {
		Name : "HDL Curtain",
		Type : "Blinds",
		Channel : "CinemaBlinds",
		Icon : "M",
		Smart : {}
	}, {
		Name : "HDL Relay",
		Type : "Relay",
		Channel : "BoilerScreen",
		Icon : "8",
		Smart : {}
	}, {
		Name : "HDL Relay",
		Type : "Relay",
		Channel : "BoilerWaterFlow1",
		Icon : "8",
		Smart : {}
	}, {
		Name : "HDL Relay",
		Type : "Relay",
		Channel : "BoilerWaterFlow2",
		Icon : "8",
		Smart : {}
	}, {
		Name : "HDL DMX",
		Type : "LED",
		Channel : "YardFacade",
		Icon : "0",
		Smart : {
			"Turn On" : "API.Light.Switch.Toggle.On",
			"Turn Off" : "API.Light.Switch.Toggle.Off"
		}
	}, {
		Name : "HDL DMX",
		Type : "LED",
		Channel : "YardPool",
		Icon : "0",
		Smart : {
			"Turn On" : "API.Light.Switch.Toggle.On",
			"Turn Off" : "API.Light.Switch.Toggle.Off"
		}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "BedroomTorcherLight",
		Icon : "e",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "BedroomLocalLight",
		Icon : "e",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "BedroomCorniceLight",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Dimmerr",
		Type : "Dimmer",
		Channel : "BedroomTopLight",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "CinemaLightSideDown",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "CinemaLightSideUp",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "HDL Dimmer",
		Type : "Dimmer",
		Channel : "CinemaLightCenter",
		Icon : "1",
		Smart : {
			"Turn On" : "API.Light.Switch.Level.On",
			"Turn Off" : "API.Light.Switch.Level.Off"
		}
	}, {
		Name : "Nest",
		Type : "Climate",
		Channel : "BedroomVentilation",
		Icon : "9",
		Smart : {}
	}, {
		Name : "ecobee3",
		Type : "Climate",
		Channel : "CinemaVentilation",
		Icon : "9",
		Smart : {}
	}, {
		Name : "Marantz Main Zone",
		Type : "Sound",
		Channel : "CinemaSound",
		Icon : "J",
		Smart : {}
	}, {
		Name : "Marantz Zone 2",
		Type : "Sound",
		Channel : "BedroomSound",
		Icon : "J",
		Smart : {}
	}, {
		Name : "Samsung Smart TV",
		Type : "TV",
		Channel : "BedroomTV",
		SoundChannel : "BedroomSound",
		Icon : "o",
		Smart : {}
	}, {
		Name : "Dune HD Max",
		Type : "TV",
		Channel : "CinemaTV",
		SoundChannel : "CinemaSound",
		Icon : "p",
		Smart : {}
	}
];
//////////////////////////////////////////////////////////////////////////
/**   объект климата, на входе имя источника (комната, в которой находится контрол и соответственно имена тегов)
 
*/
function ClimateControl(in_source) {
   this.Source = in_source;
   
   var that = this;
   
   function Init() {
      IR.SetVariable("Server.Tags." + in_source + "VentilationSwitch", 0);
      IR.SetVariable("Server.Tags." + in_source + "VentilationStatus", 0);
      IR.SetVariable("Server.Tags." + in_source + "VentilationCurrentTemperature", 25);  
      IR.SetVariable("Server.Tags." + in_source + "VentilationWantTemperature", 25);
   }
   
   function CheckTemp() {
      var cur_value = IR.GetVariable("Server.Tags." + in_source + "VentilationCurrentTemperature");
      var want_value = IR.GetVariable("Server.Tags." + in_source + "VentilationWantTemperature");
      var new_value;
      if (want_value == cur_value) {
         IR.SetVariable("Server.Tags." + in_source + "VentilationSwitch", 0);
         IR.SetVariable("Server.Tags." + in_source + "VentilationStatus", 0);   
      } else if (want_value > cur_value) {
         IR.SetVariable("Server.Tags." + in_source + "VentilationSwitch", 1);
         IR.SetVariable("Server.Tags." + in_source + "VentilationStatus", 1);
         cur_value += 0.1;
         new_value = cur_value.toFixed(1); 
         IR.SetVariable("Server.Tags." + in_source + "VentilationCurrentTemperature", parseFloat(new_value));
      } else if (want_value < cur_value) {
         IR.SetVariable("Server.Tags." + in_source + "VentilationSwitch", 1);
         IR.SetVariable("Server.Tags." + in_source + "VentilationStatus", 2);
         cur_value -= 0.1;
         new_value = cur_value.toFixed(1); 
         IR.SetVariable("Server.Tags." + in_source + "VentilationCurrentTemperature", parseFloat(new_value));
      }
   }
     
   Init();   
   var check_interval = IR.SetInterval(1000, CheckTemp);
}

var Climates = [];
Climates.push(new ClimateControl("Bedroom"));
Climates.push(new ClimateControl("Cinema"));

////////////////////////////////////////////////////////////////////////////////////////////////////

var AlarmObjects = {
	"Watering" : {
		Monday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
		Tuesday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
		Wednesday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
		Thursday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
		Friday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
		Saturday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
		Sunday : {
			Hours : 0,
			Minutes : 0,
			Switch : 0
		},
	}
}

function Alarm(in_name, in_alarm, in_action_start, in_action_stop) {
	var that = this;
	var obj = in_alarm;
   
	
	this.Name = in_name;
	this.ActionStart = in_action_start;
   this.ActionStop = in_action_stop;
	
	function Set(in_obj) {
      for(var key in obj) {
         obj[key].Hours = in_obj[key].Hours;      
         obj[key].Minutes = in_obj[key].Minutes;
         obj[key].Switch = in_obj[key].Switch;
      }
	}
   function Update() {
      IR.Log("Updating to " + JSON.Stringify(obj));
      IR.SetVariable("Server.Tags." + that.Name + "Alarms", JSON.Stringify(obj));
   }
   function Check() {
		var current_date = IR.GetVariable("System.Date.Weekday");
		var current_hour = IR.GetVariable("System.Time.Hour");
      var current_minute = IR.GetVariable("System.Time.Minutes");
      IR.Log(JSON.Stringify(obj));
      if(obj[current_date].Switch) {
         IR.Log(obj[current_date].Hours);
         IR.Log(obj[current_date].Minutes);
         if((obj[current_date].Hours == current_hour)&&(obj[current_date].Minutes == current_minute)) {
            IR.Log("Call func");
            that.ActionStart();
            IR.SetTimeout(15000, that.ActionStop);
         }
      }
		IR.Log("Cur date is " + current_date);
		IR.Log("Cur time is " + current_hour + ":" + current_minute);   
   }
	
	this.Set = Set;
   this.Update = Update;
   this.Check = Check;
   Update();
}

var watering_alarm = new Alarm("Watering", AlarmObjects["Watering"], function() {
	IR.SetVariable("Server.Tags.YardWatering", 1);
   }, function() {
   IR.SetVariable("Server.Tags.YardWatering", 0);
});

IR.SetGlobalListener(IR.EVENT_GLOBAL_TAG_CHANGE, function (name, value) {
   watering_alarm.Check();
});
IR.SubscribeTagChange("System.Time.Minutes");
////////////////////////////////////////////////////////////////////////////////////////

var Multitags = {
	"YardRoomLights" : ["BedroomTopLight", "CinemaLightCenter", "YardRoomLight1", "YardRoomLight2", "YardRoomLight3"]
}

/** общие функции модификаторы
setSwitchValue - проверяет значение на свитч 0/1, если норм отправляет в Тэг
setRangeValue - проверяет значение на диапазон 0-100, если норм отправляет в Тэг
setColorValue - проверяет значение на диапазон для цвета в формате int, если норм отправляет в Тэг
 */

function setSwitchValue(in_Type, in_Name, in_Value) {
	var value = TestSwitch(in_Value);
	IR.SetVariable("Server.Tags." + in_Name, value);
   if(in_Name == "BoilerPuddle") {
      if(value) {
         IR.SetVariable("Server.Tags.BoilerWaterFlow1", 1);   
         IR.SetVariable("Server.Tags.BoilerWaterFlow2", 1);
      }
   }
	return value;
}
function setRangeValue(in_Type, in_Name, in_Value) {
	var value = TestRange(in_Value, 0, 100);
	IR.SetVariable("Server.Tags." + in_Name, value);
	return value;
}
function setColorValue(in_Type, in_Name, in_Value) {
	var value = TestColor(in_Value);
	if (value) {
		IR.SetVariable("Server.Tags." + in_Name, in_Value);
		return value;
	}
}

/** функции модификаторы с логикой
setVentilationValue - оперирует логикой системы вентиляции (если необходимое значение выше/ниже текущего, создать интервал который каждую секунду с шагом 0.1 приводит текущее значение к необходимому)
setMultitagValue - ищет соответствие в объекте Multitags, если находит, отправляет значение во все теги массива значения найденого свойства объекта
setScreen - задаёт открытое окно (0-main, 1-yard, 2-cinema, 3-bedroom, 4-boiler)
 */

function setMultitagValue(in_Type, in_Name, in_Value) {
	var value = TestSwitch(in_Value);
   if(!value) {
      value = TestRange(in_Value, 0, 100);
   }
	IR.SetVariable("Server.Tags." + in_Name, value);
   for (var key in Multitags) {
		if (key == in_Name) {
			var source = Multitags[key];
			for (var i = 0; i < source.length; i++) {
				IR.SetVariable("Server.Tags." + source[i], value);
			}
		}
	}
   return value;
}
function setVentilationValue(in_Type, in_Name, in_Value) {
	var climate_group_name = in_Name.slice(0, in_Name.indexOf("Ventilation"));
   var value = parseFloat(in_Value);
	if ((value >= 17) && (value <= 35)) {
		IR.SetVariable("Server.Tags." + climate_group_name + "VentilationWantTemperature", value);
	}
}
function setScreen(in_Type, in_Name, in_Value) {
	var value = TestRange(in_Value, 0, 4);
	IR.SetVariable("Server.Tags." + in_Name, value);
}

function setSoundValue(in_Type, in_Name, in_Value) {
	var value = TestRange(in_Value, 0, 100);
	var sound_group_name = in_Name.slice(0, in_Name.indexOf("Sound"));
	if (value) {
		IR.SetVariable("Server.Tags." + in_Name, value);
		IR.SetVariable("Server.Tags." + sound_group_name + "SoundMute", 0);
	} else {
		IR.SetVariable("Server.Tags." + in_Name, value);
		IR.SetVariable("Server.Tags." + sound_group_name + "SoundMute", 0);
	}
}
function setSoundMute(in_Type, in_Name, in_Value) {
	var value = TestSwitch(in_Value);
	var sound_group_name = in_Name.slice(0, in_Name.indexOf("Sound"));
	var condition = IR.GetVariable("Server.Tags." + sound_group_name + "SoundValue")
		if (condition != 0) {
			IR.SetVariable("Server.Tags." + in_Name, value);
		}
}
function setSoundSource(in_Type, in_Name, in_Value) {
	// TODO
	IR.SetVariable("Server.Tags." + in_Name, in_Value);
}

/**	в канал должен прийти объект JSON формата
 */
function setWateringAlarm(in_Type, in_Name, in_Value) {
	var get_obj = JSON.Parse(in_Value);
   IR.Log("Got value " + in_Value);
   watering_alarm.Set(get_obj);
   watering_alarm.Update();
}

function setBedroomAlarm(in_Type, in_Name, in_Value) {
	var get_obj = JSON.Parse(in_Value);
   IR.Log("Got value " + in_Value);
   bedroom_alarm.Set(get_obj);
   bedroom_alarm.Update();
}
function setBedroomMove(in_Type, in_Name, in_Value) {
   IR.SetVariable("Server.Tags.BedroomLocalLight", 50);      
}

/** секция функций валидации
TestSwitch 	           - 	проверяет переменную на bool
TestRange 	           - 	проверяет переменную на int от in_min до in_max
TestColor 	           -	проверяет переменную на цвет
 */
function TestSwitch(in_value) {
	var result = 0;
	if ((in_value == 1) || (in_value == "1") || (in_value == true) || (in_value == "true") || (in_value == "On") || (in_value == "ON") || (in_value == "on")) {
		result = 1;
	} else if ((in_value == 0) || (in_value == "0") || (in_value == false) || (in_value == "false") || (in_value == "Off") || (in_value == "OFF") || (in_value == "off")) {
		result = 0;
	}
	return result;
}
function TestRange(in_value, in_min, in_max) {
	var result = 0;
	var value = parseInt(in_value, 10);
	if ((value >= in_min) && (value <= in_max)) {
		result = value;
	}
	return result;
}
function TestColor(in_value) {
   var value = in_value;
   var result = 0;
	if ((value >= 0x000000FF) && (value <= 0xFFFFFFFF)) {
		result = in_value;
	}
	return result;
}

//////////////////////////////////////////////////////////////////////////////////

var i=0;

function sinn()
{
  value= 50+10*Math.sin(i*Math.PI/180)+Math.random()*5;
  IR.SetVariable("Server.Tags.vr_sin", value); 
  i=i+5;  
  if (i > 360) { i=0; }  
}

function gaz()
{
  period=1/2+Math.floor(IR.GetVariable("System.Time.Minutes")/20) ;  
  value1 = (period*2)+(1,1*Math.random());
  IR.SetVariable("Server.Tags.vr_gaz_consumption", value1); 
}

function el()
{
  period=1/3+Math.floor(IR.GetVariable("System.Time.Minutes")/15) ;  
  value1 = (period*2)+1.2*Math.random()+ 1.5*IR.GetVariable("Server.Tags.YardFacadeSwitch") ;
  IR.SetVariable("Server.Tags.vr_el_consumption", value1); 
}

function water()
{
  period=Math.floor(IR.GetVariable("System.Time.Minutes")/20) ;  
  value1 = (period*4)+2*Math.random();
  IR.SetVariable("Server.Tags.vr_water_consumption", value1); 
}


function voltagge()
{
  period=Math.floor(IR.GetVariable("System.Time.Minutes")/20) ;  
  value1 = 210+(period*10)+7*Math.random();
  IR.SetVariable("Server.Tags.vr_voltage", value1); 
}


function climat()
{

  inside_t = 20 + Math.random()*2;
  outside_t = 5 + Math.random()*1,2;  
  hm=  50+Math.random()*3 ;
  
  
  IR.SetVariable("Server.Tags.vr_temperature_inside", inside_t); 
  IR.SetVariable("Server.Tags.vr_temperature_outside", outside_t); 
  IR.SetVariable("Server.Tags.vr_humidity", hm); 

  
}


IR.AddListener(IR.EVENT_START, 0, function()
{
   IR.SetInterval(2000, sinn);
	IR.SetInterval(2200, gaz);
   IR.SetInterval(2300, el);
   IR.SetInterval(2400, water);   
   IR.SetInterval(2500, climat);
   IR.SetInterval(2600, voltagge);
   
      
});

////////////////////////////////////////////////////////////////

function Scheme1()
{
  function TRSBlock_FromTag1()
  {
    TRSBlock.apply(this, arguments);
    extend(TRSBlock, TRSBlock_FromTag1);
  this.value = "Server.Tags.BoilerPuddle";


  this.Execute = function(inputlist)
  {
     this.outparamlist[0].value = IR.GetVariable(this.value);
     inputlist.push(this.outparamlist[0].SendValue());
     return true;
  }
     
  }
  function TRSBlock_Great1()
  {
    TRSBlock.apply(this, arguments);
    extend(TRSBlock, TRSBlock_Great1);


  this.Execute = function(inputlist)
  {
     if (this.inparamlist[0].value > this.inparamlist[1].value)
       this.outparamlist[0].value = 1;
     else
       this.outparamlist[0].value = 0;
     inputlist.push(this.outparamlist[0].SendValue());
     return true;
  }
     
  }
  function TRSBlock_ConstValue1()
  {
    TRSBlock.apply(this, arguments);
    extend(TRSBlock, TRSBlock_ConstValue1);
  this.value = 0;


  this.Execute = function(inputlist)
  {
     this.outparamlist[0].value = this.value;
     inputlist.push(this.outparamlist[0].SendValue());
     return true;
  }
     
  }
  function TRSBlock_Duplicate1()
  {
    TRSBlock.apply(this, arguments);
    extend(TRSBlock, TRSBlock_Duplicate1);


  this.Execute = function(inputlist)
  {
     this.outparamlist[0].value = this.inparamlist[0].value;
     this.outparamlist[1].value = this.inparamlist[0].value;
     inputlist.push(this.outparamlist[0].SendValue());
     inputlist.push(this.outparamlist[1].SendValue());
     return true;
  }
     
  }
  function TRSBlock_SendToChannel1()
  {
    TRSBlock.apply(this, arguments);
    extend(TRSBlock, TRSBlock_SendToChannel1);
  this.value = "Server.Channels.BoilerWaterFlow1";


  this.Execute = function(inputlist)
  {
     IR.SetVariable(this.value, this.inparamlist[0].value);
     return true;
  }
     
  }
  function TRSBlock_SendToChannel2()
  {
    TRSBlock.apply(this, arguments);
    extend(TRSBlock, TRSBlock_SendToChannel2);
  this.value = "Server.Channels.BoilerWaterFlow2";


  this.Execute = function(inputlist)
  {
     IR.SetVariable(this.value, this.inparamlist[0].value);
     return true;
  }
     
  }
  var executor;
  this.Init = function()
  {
    executor = new TRSchemeEexecutor;
    var block_TRSBlock_FromTag1 = new TRSBlock_FromTag1;
    var output_TRSBlock_FromTag1_0 = new TRSOutput;
    block_TRSBlock_FromTag1.AddOutput(output_TRSBlock_FromTag1_0);
    executor.AddBlock(block_TRSBlock_FromTag1);
    var block_TRSBlock_Great1 = new TRSBlock_Great1;
    var input_TRSBlock_Great1_0 = new TRSInput;
    block_TRSBlock_Great1.AddInput(input_TRSBlock_Great1_0);
    var input_TRSBlock_Great1_1 = new TRSInput;
    block_TRSBlock_Great1.AddInput(input_TRSBlock_Great1_1);
    var output_TRSBlock_Great1_0 = new TRSOutput;
    block_TRSBlock_Great1.AddOutput(output_TRSBlock_Great1_0);
    executor.AddBlock(block_TRSBlock_Great1);
    var block_TRSBlock_ConstValue1 = new TRSBlock_ConstValue1;
    var output_TRSBlock_ConstValue1_0 = new TRSOutput;
    block_TRSBlock_ConstValue1.AddOutput(output_TRSBlock_ConstValue1_0);
    executor.AddBlock(block_TRSBlock_ConstValue1);
    var block_TRSBlock_Duplicate1 = new TRSBlock_Duplicate1;
    var input_TRSBlock_Duplicate1_0 = new TRSInput;
    block_TRSBlock_Duplicate1.AddInput(input_TRSBlock_Duplicate1_0);
    var output_TRSBlock_Duplicate1_0 = new TRSOutput;
    block_TRSBlock_Duplicate1.AddOutput(output_TRSBlock_Duplicate1_0);
    var output_TRSBlock_Duplicate1_1 = new TRSOutput;
    block_TRSBlock_Duplicate1.AddOutput(output_TRSBlock_Duplicate1_1);
    executor.AddBlock(block_TRSBlock_Duplicate1);
    var block_TRSBlock_SendToChannel1 = new TRSBlock_SendToChannel1;
    var input_TRSBlock_SendToChannel1_0 = new TRSInput;
    block_TRSBlock_SendToChannel1.AddInput(input_TRSBlock_SendToChannel1_0);
    executor.AddBlock(block_TRSBlock_SendToChannel1);
    var block_TRSBlock_SendToChannel2 = new TRSBlock_SendToChannel2;
    var input_TRSBlock_SendToChannel2_0 = new TRSInput;
    block_TRSBlock_SendToChannel2.AddInput(input_TRSBlock_SendToChannel2_0);
    executor.AddBlock(block_TRSBlock_SendToChannel2);
    output_TRSBlock_FromTag1_0.Input = input_TRSBlock_Great1_0;
    output_TRSBlock_Great1_0.Input = input_TRSBlock_Duplicate1_0;
    output_TRSBlock_ConstValue1_0.Input = input_TRSBlock_Great1_1;
    output_TRSBlock_Duplicate1_0.Input = input_TRSBlock_SendToChannel1_0;
    output_TRSBlock_Duplicate1_1.Input = input_TRSBlock_SendToChannel2_0;
    executor.Prepare();
  }
  this.Execute = function()
  {
    executor.Execute();
  }
}
var IRScheme_Scheme1;
IR.AddListener(IR.EVENT_START, 0, function()
{
  IRScheme_Scheme1 = new Scheme1;
  IRScheme_Scheme1.Init();
  IRScheme_Scheme1_StartTimer();
});
function IRScheme_Scheme1_Execute()
{
  IRScheme_Scheme1.Execute();
}
var IRScheme_Scheme1_Timer;
function IRScheme_Scheme1_StartTimer()
{
  IRScheme_Scheme1_Timer = IR.SetInterval(1000, IRScheme_Scheme1_Execute);
}
function IRScheme_Scheme1_StopTimer()
{
  IR.ClearInterval(IRScheme_Scheme1_Timer);
}

//////////////////////////////////////////////////////////////////////////////////////


var demoUDPscanner = IR.CreateDevice(IR.DEVICE_CUSTOM_UDP, "DEMO Scanner", "255.255.255.255", 55555, null, false, 55555, IR.BACKGROUND_OFF);
demoUDPscanner.Connect();

IR.SetInterval(1000, function () {
	var device_name = IR.GetVariable("System.Device.Name");
	var info = IR.GetCurrentLocalIPInfo();
	for (var i = 0; i < info.length; i++) {
		if (checkIP(info[i].IP)) {
			var send_packet = "DEMOSERVER;" + device_name + ";" + info[i].IP + ";30464";
			demoUDPscanner.Send([send_packet]);
		}
	}
});

function checkIP(in_ipaddr) {
	var nums = in_ipaddr.split(".");
	if (nums.length != 4) {
		return false;
	}
	if ((parseInt(nums[0], 10) <= 0) || (parseInt(nums[0], 10) > 255)) {
		return false;
	}
	if ((parseInt(nums[1], 10) < 0) || (parseInt(nums[1], 10) > 255)) {
		return false;
	}
	if ((parseInt(nums[2], 10) < 0) || (parseInt(nums[2], 10) > 255)) {
		return false;
	}
	if ((parseInt(nums[3], 10) <= 0) || (parseInt(nums[3], 10) > 255)) {
		return false;
	}
	return true;
}

var demoTCPConnection = IR.CreateDevice(IR.DEVICE_CUSTOM_SERVER_TCP, "DEMOTCP", "", 55556, 5, IR.BACKGROUND_OFF);

IR.AddListener(IR.EVENT_ACCEPT, demoTCPConnection, function (client_id) {
   IR.Log("TCP Client " + client_id + " connected");
   demoTCPConnection.Send(["HELLO"], client_id);
});

IR.AddListener(IR.EVENT_RELEASE, demoTCPConnection, function (client_id) {
	IR.Log("TCP Client " + client_id + " released");
});

IR.AddListener(IR.EVENT_RECEIVE_TEXT, demoTCPConnection, function(text, client_id,  host, port, host_ip, host_port) {
	IR.Log("TCP Client " + client_id + "(" + host_ip + ":" + host_port + ") received text: " + text);
   switch(text) {
      case "GIVETAGS":
         TagsSender(client_id);      
         break;
   }   
});

function TagsSender(client_id) {
   var iter = 0;
   demoTCPConnection.Send(["TAGSSTART"], client_id);
   
   var wait = IR.SetInterval(300, function() {
      demoTCPConnection.Send(["DEMOTAG;"+JSON.Stringify(DEMOTAGS[iter])], client_id);
      iter++;
      if(iter == DEMOTAGS.length) {
         IR.SetTimeout(300, function() {
            demoTCPConnection.Send(["TAGSEND"], client_id);
         });
         IR.ClearInterval(wait);   
      }
   });
}




