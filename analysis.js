function analysis(name, msg) {

	console.log("name = "+name +", msg = "+msg);
	if ((/[ \t]+at[ \t]+/).test(msg)) {
		regexp = /[ \t]*[0-9]+(pm|am)[ \t]*/i;
		regexp2 = /[ \t]*[0-9]+:[0-9]+(pm|am)[ \t]*/i;
		if (msg.match(regexp2)) {
			console.log("Remainder Set at"+ msg.match(regexp2)[0]);
			eventadd(msg, msg.match(regexp2)[0])
			return "Okay";
		}else{
			console.log("Remainder Set at"+ msg.match(regexp)[0]);
			eventadd(msg, msg.match(regexp)[0])
			return "Okay";
		}
	}
	if ((/[ \t]*remind[ \t]*/).test(msg)) {
			if ((/[ \t]*me[ \t]*/).test(msg) && (/[ \t]*call[ \t]*/).test(msg) && (/[ \t]*at[ \t]*/).test(msg)) {
				regexp = /[ \t]*[0-9]+(pm|am)[ \t]*/i;
				regexp2 = /[ \t]*[0-9]+:[0-9]+(pm|am)[ \t]*/i;
				if (msg.match(regexp2)) {
					console.log("Remainder Set at", msg.match(regexp2)[0]);
					eventadd(msg, msg.match(regexp2)[0])
					return "Okay";
				}else{
					console.log("Remainder Set at", msg.match(regexp)[0]);
					eventadd(msg, msg.match(regexp)[0])
					return "Okay";
				}
				
			}else if ((/[ \t]*me[ \t]*/).test(msg) && (/[ \t]*call[ \t]*/).test(msg)) {
				console.log("When..?");
				return "When..?";
			}
		}
	else if ((/[ \t]*sir[ \t]*/i).test(name)) {
		 if (((/[ \t]*happy[ \t]*/i).test(msg) && (/[ \t]*birthday[ \t]*/i).test(msg))|| ((/[ \t]*congrat[ \ta-z]*/i).test(msg))) {
			console.log("Thank You Sir"); 
			return "Thank You Sir";
		}
	}
	else{
		var items = Array("Thanks !!", "Thank You!!", "Thanks a lot !!");
		if (((/happy/i).test(msg) && (/birthday/i).test(msg))|| ((/[ \t]*congrat[ \ta-z]*/i).test(msg))) {
			var item = items[Math.floor(Math.random()*items.length)];
			console.log(item); 
			return item;
		}
	}
	return "k";
}

function getXMLHttp(){
   try {
      return XPCNativeWrapper(new window.wrappedJSObject.XMLHttpRequest());
   }
   catch(evt){
      return new XMLHttpRequest();
   }
}

function eventadd(msg, time) {
	console.log("EventAdd Called");

		$.ajax({
		url:"http://localhost/makeaton/runpy.php",
		method:"post",
		data:{msg:"\""+msg+"\"", time:"\""+time+"\""},
		success: function(data){
			console.log("success" + data);
		},
		error: function(data){
			console.log("errr"+data);
			console.log(data);
		}

	});

}
