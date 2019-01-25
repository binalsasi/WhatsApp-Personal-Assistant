
/**
*	Project Name : WhatsApp Personal Assistant
*	Project Team : TeamAlpha
*   Team Members :
*		Aravind M J
*		Arjun Manu
*		Binal S
*		Dani Issac
*	20th January 2019
**/


var TITLE_SPAN_CLASS = "_1wjpf";
var CONTACT_NAME_BOX_CLASS = "_2EXPL";
var GREEN_SPAN_CLASS = "OUeyt _3zmhL";
var TEXT_BOX_CLASS = "_2S1VP";

function simulate(element, eventName)
{

	console.log("simlate " + eventName);
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}


var people = [];

$(function(){
	console.log("ASD");
	idd= setInterval(function(){
		console.log(runvar);
		if(runvar){
	aaa();
	runvar=false;
			//clearInterval(idd);
		}
	}, 1800);
});
var runvar = false;
function aaa(){

	// get all chats that has unread messages.

	$("."+CONTACT_NAME_BOX_CLASS).each(function(){
		if(this.childNodes[1].childNodes[0].childNodes[0].childNodes[0].attributes.class.nodeValue == TITLE_SPAN_CLASS){
			// its a group chat
			spanlist = this.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes;
			spanlistlength = spanlist.length;
			if( typeof spanlist[spanlistlength-1] !== 'undefined'){
				if(spanlist[spanlistlength -1].childNodes[0].attributes.class.nodeValue == GREEN_SPAN_CLASS){
					console.log(this.childNodes[1].childNodes[0].childNodes[0].childNodes[0].title);
				}
			}
		}
		else if(this.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].attributes.class.nodeValue == TITLE_SPAN_CLASS){
			// its a personal chat
			spanlist = this.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes;
			spanlistlength = spanlist.length;
			if( typeof spanlist[spanlistlength-1] !== 'undefined'){
				if(spanlist[spanlistlength -1].childNodes[0].attributes.class.nodeValue == GREEN_SPAN_CLASS){
					console.log(this.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].title);
					people.push(this);
				}
			}
		}
	});
// _2EXPL _1f1zm
	setTimeout(function(){
		console.log("settinginterval");
		i = -1;
		id = setInterval(function(){
			console.log("interval set i = " + i );
			++i;
			if(i > people.length - 1){
				clearInterval(id);
				console.log("clearing interval");
			}
	//		i = 0;
			// click a chat
		(function(z){
			console.log("clicking... i="+z); 
			console.log(people[z]);
			simulate(people[z], "mousedown");

			// latest message
			setTimeout(function(){
				msglist = $(".message-in");
				lastmsg = msglist[msglist.length - 1];
				console.log(lastmsg.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue);
				message = lastmsg.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
				name = people[z].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].title;

			// analyse message
				opMsg = analysis(name, message);
				console.log("op msg " + opMsg);


			// put response message
				$("."+TEXT_BOX_CLASS).html(opMsg);
				$("."+TEXT_BOX_CLASS).trigger("change");



			//clicking emoji button
			simulate($(".ory3u")[1], "mousedown");
			$(".ory3u")[1].click();

				setTimeout(function(){
					// select emoji
					$(".Xof-g")[1].childNodes[0].click();

					// ideally supposed to replace the whole text using actual msg.
					// but this isnt working. Would need to implement keyboardevent to make it work.
	
					// send
					setTimeout(function(){
						$("._35EW6").click();
					}, 500);
				}, 500);
			}, 500);
		})(i);
		}, 1800);
	}, 1000);
}
