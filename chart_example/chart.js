var dps = [];   //dataPoints. 
var chart;
var startTime;
var X;
var Y;
var Z;
var timeStamp;

$(document).on("pagecreate", "#chartPage", function () {
	
	//store start time in unixtime 
	startTime = Date.now();
	
	//set uplistener for button
		//setup listener for the toggle switch
	$("#flipswitch").on("change", function() {
		
		if( $(this).val() == "on" ) startSensor();
		else if ( $(this).val() == "off" ) stopSensor();

	});


	
	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "A random chart"
      	},
      	axisX: {						
      		title: "Random Values"
      	},
      	axisY: {						
      		title: "Time (seconds)"
      	},
      	data: [{
      		type: "line",
      		dataPoints : dps
      	}]
   	});
	
	  
});

function updateChart() {
      	
      	//set new random y values
      	yVal = X;
		
		//x value is time since start 
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;
      	
		//add them to the data points to draw
		dps.push({x: xVal,y: yVal});
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dps.length >  100 )
      	{
      		dps.shift();				
      	}

		//redraw the chart
      	chart.render();		


function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
	updateChart();
}

function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);
}

function accelerometerSuccess(acceleration) {
	
	var X = acceleration.x;
	var Y = acceleration.y;
	var Z = acceleration.z ;
	var timeStamp = acceleration.timestamp ;

}

function accelerometerError() {
   alert('Error');
}
