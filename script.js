// Created by Chiku

//thanks to chitu
/*
Reference links
1. crossfading BG 
https://www.simonbattersby.com/blog/cycling-a-background-image-with-jquery/

2. battery function
https://medium.com/swlh/detecting-battery-status-in-javascript-732f724b2cc2
*/
alert("NOTE:\n\nDue to extensive animations and resources, the output might seem laggy.")



//Sound effects variables
var lockSound = new Audio("https://docs.google.com/uc?export=download&id=1-2Hk92jr82YzWC91_hU1t7DB4w3nLgZq");
var unlockSound = new Audio("https://docs.google.com/uc?export=download&id=1-5Sq7jJvUciph8ljRj5Q5g_bQ4gYdDwm");
// load them faster for better experience
lockSound.preload="auto";
unlockSound.preload="auto";

var batteryLevel=0;
var isBatteryCharging=false;
var isDeviceLocked=true;
var bgInterval;
var bgTimeout = 5000;
var activeApp = null;


// Change Background Image
function cycleImages(){
  var $active = $('#screenbackground .activebg'); 
  
  var $next = ($('#screenbackground .activebg').next().length > 0) ? $('#screenbackground .activebg').next() : $('#screenbackground img:first');
  
  $next.css('z-index',2);//move the next image up the pile     
  $active.fadeOut(1000,function(){
  //fade out the top image          
    $active.css('z-index',1).show().removeClass('activebg');
    //reset the z-index and unhide the image 
    $next.css('z-index',3).addClass('activebg');
    //make the next image the top one 
    });
}

//Soft keys function
function buttonVibrate(){
    //haptic feedback
    navigator.vibrate(50);
}

function homeButton(){
  closeAllApps();
  homescreenFocus(true);
  buttonVibrate();
  activeApp = null;
}
function backButton(){
  buttonVibrate();
  if(activeApp){
    var src = $(activeApp).attr('src');
    $(activeApp).attr('src', src);
  }
}


function recentButton(){buttonVibrate();}


//power button function
function powerButton(){
  if(isDeviceLocked){
    isDeviceLocked=false;
    unlockSound.play();
    //animation for 'display:none
    $("#homescreen").fadeIn(1000);
    $("#lockscreen").fadeOut(500);
    homescreenFocus(true);      
  }
  else{
    isDeviceLocked=true;
    lockSound.play();
    //counter animation
    $("#lockscreen").fadeIn(500);
    $("#homescreen").fadeOut(500);
    // remove homescreen background
    homescreenFocus(false);
  }
  buttonVibrate();
}


//called when user is at homescreen
function homescreenFocus(state){
  if(state){
    if(!bgInterval){
      bgInterval = setInterval('cycleImages()', bgTimeout);
      $('#screenbackground').fadeIn(100);
    }
  }
  else{
    clearInterval(bgInterval);
    bgInterval = null;
  }
}



//Update date & time of device
function updateDateTime(){
  var months = ['Jan','Feb','Mar',
                  'Apr','May','Jun',
                  'Jul','Aug','Sep',
                  'Oct','Nov','Dec'];
                  
  var weekday = ["Sunday","Monday",
                   "Tuesday","Wednesday",
                   "Thursday","Friday",
                   "Saturday"];
                   
  var date = new Date();
  //Date, month, year, weekday
  var d = String(date.getDate()).padStart(2,'0');
  var m = date.getMonth();
  var y = String(date.getFullYear());
  var wd = date.getDay();
  //hour, min
  var hh = String(date.getHours()).padStart(2,'0');
  var mm = String(date.getMinutes()).padStart(2,'0');
    
  //update elements of lockscreen
 $("#lockscreentime").html(hh+"<br/>"+mm);
 $("#lockscreenday").html(weekday[wd]);
 $("#lockscreendate").html(d+" "+months[m]+", "+y);
 
 //update screen elements
 $("#statusbar .time").html(hh+":"+mm);
}


//battery- root function
function batteryFunction(){
  var isSupport = 'getBattery' in navigator;
  if(!isSupport){
    console.log("Battery unsupported");
    $(".batteryicon").html("battery_unknown");
    return;
  }
  var battery = navigator.getBattery();
  battery.then(batteryCallback);
}

//battery- object initializer
function batteryCallback(btryObj){
  updateBatteryStatus(btryObj);
  btryObj.addEventListener("chargingchange",function(ev){updateBatteryStatus(btryObj)});

btryObj.addEventListener("levelchange",function(ev){updateBatteryStatus(btryObj)});
}


//battery- update battery info and DOM
function updateBatteryStatus(btryObj){
  isBatteryCharging = btryObj.charging;     
  batteryLevel = Math.round(btryObj.level*100);

  $(".batterylevel").html(batteryLevel+'%');
 
  // update icon when charging
  if(isBatteryCharging) $(".batteryicon").html("battery_charging_full");
  else $(".batteryicon").html("battery_std");
}


//Function to close all apps
function closeAllApps(){
  $(".app-screen").fadeOut(400);
  $("#chromedisplay, #sololearndisplay, #calculatordisplay, #clockdisplay, #weatherdisplay, #calendardisplay, #whatsappdisplay, #phonedisplay, #maildisplay, #youtubedisplay, #infodisplay, #sharedisplay").fadeOut(400);
}

//Functionality for apps
function appFunc(){
  alert("Functionality will be added soon");
  $(".app-screen").fadeIn(400);
  homescreenFocus(false);
}

function chromeFunc(){
  $(".app-screen").fadeIn(400);
  $("#chromedisplay").fadeIn(400);
  homescreenFocus(false);
  activeApp = "#chromedisplay";
}

function sololearnFunc(){
  $(".app-screen").fadeIn(400);
  $("#sololearndisplay").fadeIn(400);
  homescreenFocus(false);
  activeApp = "#sololearndisplay";
}

function calcFunc(){
  $(".app-screen").fadeIn(400);
  $("#calculatordisplay").fadeIn(400);
  homescreenFocus(false);
  activeApp = "#calculatordisplay";
}

function clockFunc(){
  $(".app-screen").fadeIn(400);
  $("#clockdisplay").fadeIn(400);
  homescreenFocus(false);
  activeApp = "#clockdisplay";
}
function weatherFunc(){
  $(".app-screen").fadeIn(400);
  $("#weatherdisplay").fadeIn(400);
  homescreenFocus(false);
  activeApp = "#weatherdisplay";
}


window.onload = function(){

  alert("Please upvote and share if you liked this code.\nMade with lots of love❤️❤️\nThank you all.");

  alert("Highlights:\n\n1. Real time battery level display.\n2. Charging indicator.\n3. Real time Date/Time display.\n4. Lock/Unlock sound effects.\n5. Fingerprint and Power Button unlocks device.\n6. Home screen background changes every 5 second.\n7. Each and Everything is functional.\n\nMore features will be added soon!\nStay Tuned!");

  alert("How to Use:\n\n1. Press FingerPrint/Power Button to unlock device.\n2. Click any app to open.\n3. Press Home Button to go to app screen.\n4. Double click Back Button to exit an app.\n\nHome button makes app run in background!");
  
  //click listener for keys
  $("#navback").click(backButton);
  $("#navhome").click(homeButton);
  $("#navrecent").click(recentButton);
  $("#powerbutton").click(powerButton);
  $("#fingerprint").click(powerButton);
  
  $("#navback").dblclick(function(){
    backButton()
    homeButton()
  });
  
  //Click listener for apps
  $("#app-chrome").click(chromeFunc);
  $("#app-sololearn").click(sololearnFunc);
  $("#app-calculator").click(calcFunc);
  $("#app-clock").click(clockFunc);
  $("#app-weather").click(weatherFunc);
  $("#app-calendar").click(appFunc);
  $("#app-whatsapp").click(appFunc);
  $("#app-phone").click(appFunc);
  $("#app-mail").click(appFunc);
  $("#app-youtube").click(appFunc);
  $("#app-info").click(appFunc);
  $("#app-share").click(appFunc);
  
  //initiate battery feature
  batteryFunction();
  
  window.setTimeout(function(){
    $("#loader-anim").fadeOut(500);
    $("#device").fadeIn(1000);
  }, 1000);
  
  homeButton();
}

//update date and time every second
window.setInterval(updateDateTime,1000);