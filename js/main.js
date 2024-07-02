

/* // 1) Simple Registration of the service worker
window.addEventListener("load", () => {

  if ("serviceWorker" in navigator) {

      const options = {
        scope: "/",
      };
      navigator.serviceWorker.register("./sw.js", options)
	      .then(registration => {
             console.dir(registration);
		         const SW = registration.installing || 
							          registration.waiting || 
							          registration.active;
                        
						 console.log("Service Worker State:", SW.state);
             console.dir(SW);
	      });

  }
  
});  */ 

/* // 2) Listen to state changes
window.addEventListener("load", () => {


  if ("serviceWorker" in navigator) {

      const options = {
        scope: "/",
      };
      navigator.serviceWorker.register("./sw.js", options)
	      .then(registration => {
             console.dir(registration);
		         const SW = registration.installing || 
							          registration.waiting || 
							          registration.active;
                        
						//  console.log("Service Worker State:", SW.state);
            //  console.dir(SW);

             console.log(`SW state:`,SW?.state);
				     SW?.addEventListener("statechange", (e) => {
				        console.log(`SW state:`, e.target.state);
				     });
	      });

  }
});  */

/* // 3) adding controls
const $ = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {

  // Reference DOM elements
  const registerBtn = $("#register");
  const unregisterBtn = $("#unregister");
  const checkBtn = $("#check");
  const imgLoaderBtn = $("#img-loader");
  const wrapper = $(".wrapper");

  if ("serviceWorker" in navigator) {

    // Add Event Listeners
    registerBtn.addEventListener("click", register );


    // 1. Register the service worker 
    async function register() {

      const options = {
        scope: "/",
      };
      const registration = await navigator.serviceWorker.register("./sw.js", options);
      console.dir(registration);
  
      const SW = registration.installing || registration.waiting || registration.active;

      console.dir(SW);

      console.log(`SW state:`,SW?.state);
      SW?.addEventListener("statechange", (e) => {
        console.log(`SW state:`, e.target.state);
      });
    
    }

  }
});  */

/* // 4) Service Workers' ESM support
import {colors} from "./color-logger.js";
const $ = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {

  // Reference DOM elements
  const registerBtn = $("#register");
  const unregisterBtn = $("#unregister");
  const checkBtn = $("#check");
  const imgLoaderBtn = $("#img-loader");
  const wrapper = $(".wrapper");

  if ("serviceWorker" in navigator) {

    // Add Event Listeners
    registerBtn.addEventListener("click", register );


    // 1. Register the service worker 
    async function register() {

      const options = {
        scope: "/",
        type: "module",
      };
      const registration = await navigator.serviceWorker.register("./sw.js", options);
      console.dir(registration);
  
      const SW = registration.installing || registration.waiting || registration.active;

      console.dir(SW);

      logState(SW?.state);
      SW?.addEventListener("statechange", (e) => {
        logState(e.target.state);
      });
    
    }
    function logState(state) {
      colors.log(`SW state:`, colors.blue, `🪬 ${state}`);
      $("span#state").textContent = `SW state: 🪬 ${state}`;
    }
  }
}); */

// 5) Adding an image load 
import {colors} from "./color-logger.js";
const $ = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {

  // Reference DOM elements
  const registerBtn = $("#register");
  const unregisterBtn = $("#unregister");
  const checkBtn = $("#check");
  const imgLoaderBtn = $("#img-loader");
  const wrapper = $(".wrapper");

  if ("serviceWorker" in navigator) {

    // Add Event Listeners
    registerBtn.addEventListener("click", register );
    checkBtn.addEventListener("click", checkIfControlled );
    unregisterBtn.addEventListener("click", unregister );
    imgLoaderBtn.addEventListener("click", loadImage );


    // 1. Register the service worker 
    async function register() {

      const options = {
        scope: "/",
        type: "module",
      };
      const registration = await navigator.serviceWorker.register("./sw.js", options);
      console.dir(registration);
  
      const SW = registration.installing || registration.waiting || registration.active;

      console.dir(SW);

      logState(SW?.state);
      SW?.addEventListener("statechange", (e) => {
        logState(e.target.state);
      });
    
    }
    function logState(state) {
      colors.log(`SW state:`, colors.blue, `🪬 ${state}`);
      $("span#state").textContent = `SW state: 🪬 ${state}`;
    }

    // 2. Check if the page is controlled by the service worker
    function checkIfControlled() {
      const verb = navigator.serviceWorker.controller ? "IS" : "is NOT";
      console.log(`The page ${ verb } controlled by a service worker.`);
      console.log(navigator.serviceWorker.controller);
    }

    // 3. Detect when a new or updated service worker is installed & activated
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      colors.log("⚡️ Controller changed ⚡️", colors.cyan);
      // window.location.reload();
    });
    

    // 4. remove / unregister the service worker
    async function unregister() {
      const registration = await navigator.serviceWorker.getRegistration("/");
      colors.log("unregistered:", colors.red , await registration?.unregister());
      // window.location.reload(); // reload the page for the check to reflect the change
      
      
      // // Remove / unregister all service workers
      // const registrations = await navigator.serviceWorker.getRegistrations();
      // for (let reg of registrations) {
      //   const isUnregistered = await reg.unregister();
      //   console.log("Service Worker unregistered:", isUnregistered);
      // } 
      // // window.location.reload(); // reload the page for the check to reflect the change
    }
    
    // 5. Load an image
    async function loadImage() {
      //'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9945bcf4-aec7-4edb-afe6-867c7c17541e/da4n3yi-0de959fb-4147-40cf-b075-8be67f955ebc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi85OTQ1YmNmNC1hZWM3LTRlZGItYWZlNi04NjdjN2MxNzU0MWUvZGE0bjN5aS0wZGU5NTlmYi00MTQ3LTQwY2YtYjA3NS04YmU2N2Y5NTVlYmMuanBnIn1dXX0.2T_OXZFGBW2sqbdNd__qVprbl14ZPvA2Q9hCJ_yNfEY';
      const imgFile = document.title == "Home" ? "browsers-adoption.png" : "browsers-support.png"
      const response = await fetch("images/" + imgFile);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        colors.log("Image loaded",colors.cyan);
        wrapper.appendChild(img);
      };
    }
  }
});  

