(() => {
 const cfg = window.PB_CONFIG || {whatsapp:"923025120000",sports:[],cafe:[]};
 const $ = id => document.getElementById(id);
 const wa = cfg.whatsapp || "923025120000";
 const money = n => "Rs " + Number(n).toLocaleString("en-PK");
 let cart = {};
 let toastTimer;
 function toast(message, bad=false) {
   const el=$("toast"); if(!el)return;
   el.textContent=message; el.classList.toggle("bad",bad); el.classList.add("show");
   clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),3600);
 }
 function whatsapp(text) { window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(text),"_blank","noopener"); }
 // Intro cinematic sequence: canvas animation uses a shaped bat, red ball, motion streaks and camera-like timing.
 const canvas=$("cinema"), intro=$("intro");
 if(canvas && canvas.getContext) {
  const ctx=canvas.getContext("2d");
  let start=performance.now(), raf=0, reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function draw(now) {
   const dpr=Math.min(window.devicePixelRatio||1,2), w=canvas.clientWidth, h=canvas.clientHeight;
   if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
   ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
   let t=(now-start)/1000; if(reduced)t=3.4;
   const cx=w*.52, cy=h*.57, scale=Math.min(w/1000,h/500);
   // Cinematic stadium haze and lights
   const glow=ctx.createRadialGradient(cx,cy,5,cx,cy,Math.max(w,h)*.6);
   glow.addColorStop(0,"rgba(201,163,74,.13)");glow.addColorStop(1,"rgba(8,10,15,0)");
   ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
   ctx.strokeStyle="rgba(201,163,74,.11)";ctx.lineWidth=1;
   for(let i=0;i<9;i++){ctx.beginPath();ctx.ellipse(cx,cy+70*scale,100*scale+i*37*scale,30*scale+i*11*scale,0,0,Math.PI*2);ctx.stroke();}
   // Camera beats: bat loads back, accelerates through impact, ball launches into perspective.
   const swing=Math.min(1,Math.max(0,(t-1.0)/1.65));
   // Correct swing: load on the left, then rotate through contact toward the right.
  const easedSwing=swing*swing*(3-2*swing);
  const angle=0.75-(2.30*easedSwing);
   const batX=cx-95*scale, batY=cy+32*scale;
   ctx.save();ctx.translate(batX,batY);ctx.rotate(angle);
   const batLen=240*scale, bladeW=39*scale;
   // bat shadow
   ctx.fillStyle="rgba(0,0,0,.38)";ctx.beginPath();ctx.ellipse(5*scale,batLen*.43,24*scale,batLen*.52,.1,0,Math.PI*2);ctx.fill();
   // handle
   ctx.fillStyle="#171a20";ctx.fillRect(-7*scale,-16*scale,14*scale,72*scale);
   ctx.strokeStyle="#c9a34a";ctx.lineWidth=2*scale;
   for(let i=0;i<7;i++){ctx.beginPath();ctx.moveTo(-7*scale,(i*8)*scale);ctx.lineTo(7*scale,(i*8+9)*scale);ctx.stroke();}
   // bat blade gradient
   let bg=ctx.createLinearGradient(-bladeW/2,0,bladeW/2,0);bg.addColorStop(0,"#5a3419");bg.addColorStop(.25,"#d7ae6d");bg.addColorStop(.55,"#f0d39a");bg.addColorStop(.8,"#94602d");bg.addColorStop(1,"#3e2616");
   ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(-8*scale,52*scale);ctx.lineTo(-bladeW*.46,batLen*.74);ctx.quadraticCurveTo(0,batLen*.91,bladeW*.46,batLen*.74);ctx.lineTo(8*scale,52*scale);ctx.closePath();ctx.fill();
   ctx.strokeStyle="rgba(255,235,190,.5)";ctx.lineWidth=1.5*scale;ctx.beginPath();ctx.moveTo(-1*scale,62*scale);ctx.lineTo(0,batLen*.77);ctx.stroke();
   ctx.restore();
   // Ball starts in front of bat and launches on contact
   const impactT=2.65, launch=Math.max(0,(t-impactT));
   let bx=cx+48*scale, by=cy+34*scale;
   let radius=15*scale;
   if(launch>0){let p=Math.min(1,launch/1.25);bx=cx+48*scale+launch*390*scale;by=cy+34*scale-launch*205*scale+launch*launch*80*scale;radius=Math.max(3*scale,15*scale-launch*5*scale);}
   // golden trail on launch
   if(launch>0){
    for(let i=8;i>=1;i--){let p=i/8;ctx.beginPath();ctx.strokeStyle=`rgba(235,183,75,${(1-p)*.38})`;ctx.lineWidth=(9*(1-p)+1)*scale;ctx.moveTo(bx-launch*110*scale*p,by+launch*38*scale*p);ctx.lineTo(bx-launch*25*scale*p,by+launch*10*scale*p);ctx.stroke();}
    for(let i=0;i<13;i++){let px=bx-(i*19+Math.random()*4)*scale, py=by+(Math.sin(now/80+i)*8)*scale;ctx.fillStyle=`rgba(255,210,100,${Math.max(0,.75-i/16)})`;ctx.beginPath();ctx.arc(px,py,(2+(i%3))*scale,0,Math.PI*2);ctx.fill();}
   }
   ctx.save();ctx.translate(bx,by);ctx.rotate(now/240);
   let ballG=ctx.createRadialGradient(-radius*.4,-radius*.4,1,radius*.2,radius*.3,radius*1.5);ballG.addColorStop(0,"#ff7c72");ballG.addColorStop(.4,"#c92f34");ballG.addColorStop(1,"#530b13");
   ctx.fillStyle=ballG;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle="#f2d5c5";ctx.lineWidth=1.5*scale;ctx.beginPath();ctx.arc(0,0,radius*.72,-1.15,1.15);ctx.stroke();ctx.restore();
   if(t>2.5&&t<2.75){ctx.strokeStyle=`rgba(255,226,148,${1-(t-2.5)/.25})`;ctx.lineWidth=3*scale;ctx.beginPath();ctx.arc(cx+45*scale,cy+30*scale,(t-2.5)*220*scale,0,Math.PI*2);ctx.stroke();}
   const progress=Math.min(100,t/4.3*100);if($("introProgress"))$("introProgress").style.width=progress+"%";
   if(t<4.45 && intro && !intro.classList.contains("done"))raf=requestAnimationFrame(draw);
   else if(intro && !intro.classList.contains("done")) finishIntro();
  }
  function finishIntro(){intro.classList.add("done");setTimeout(()=>{intro.style.display="none";},900);}
  $("skipIntro")?.addEventListener("click",()=>{cancelAnimationFrame(raf);finishIntro();});
  raf=requestAnimationFrame(draw);
 } else if(intro) {setTimeout(()=>intro.classList.add("done"),1000);}
 // Mobile nav
 $("menuToggle")?.addEventListener("click",()=>document.querySelector(".topbar nav")?.classList.toggle("open"));
 document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".topbar nav")?.classList.remove("open")));
 $("year").textContent=new Date().getFullYear();
 // Offline handling
 function network(){ $("offlineBanner")?.classList.toggle("hidden",navigator.onLine); }
 window.addEventListener("online",network);window.addEventListener("offline",network);network();
 // Booking availability
 const dateInput=$("bookDate"), timeSelect=$("bookTime"), slotStatus=$("slotStatus");
 const today=new Date(); const localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
 if(dateInput){dateInput.min=localDate;dateInput.value=localDate;}
 async function loadSlots() {
   if(!dateInput||!timeSelect)return;
   const d=dateInput.value;if(!d)return;
   timeSelect.innerHTML='<option value="">Loading availability…</option>';
   slotStatus.textContent="Checking live schedule…";slotStatus.className="slot-status";
   try{
    const r=await fetch("/api/schedule?date="+encodeURIComponent(d),{cache:"no-store"});
    if(!r.ok)throw new Error("Schedule unavailable");
    const data=await r.json(), slots=data.slots||[];
    timeSelect.innerHTML="";
    if(!slots.length){
      // no uploaded schedule yet: allow user to pick a time but clearly mark as needing confirmation
      ["5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"].forEach(t=>{let o=document.createElement("option");o.value=t;o.textContent=t+" · confirm with arena";timeSelect.appendChild(o);});
      slotStatus.textContent="No schedule uploaded for this date. Requests will still be checked for existing reservations; final availability must be confirmed by the arena.";
      slotStatus.classList.add("warning");return;
    }
    const available=slots.filter(s=>s.status==="Available");
    slots.forEach(s=>{let o=document.createElement("option");o.value=s.start_time;o.textContent=s.start_time+(s.end_time?" – "+s.end_time:"")+" · "+s.status+(s.status==="Booked"&&s.booked_name?" — "+s.booked_name:"");o.disabled=s.status!=="Available";timeSelect.appendChild(o);});
    slotStatus.textContent=available.length?`${available.length} available slot(s) found for ${d}.`:"No available slots recorded for this date.";
    if(!available.length){timeSelect.innerHTML='<option value="">No available slots</option>';timeSelect.disabled=true;}else timeSelect.disabled=false;
   }catch(e){timeSelect.innerHTML='<option value="">Could not load schedule</option>';slotStatus.textContent="Could not load the live schedule. Check your connection and try again.";slotStatus.classList.add("warning");}
 }
 dateInput?.addEventListener("change",loadSlots);loadSlots();
 $("bookingForm")?.addEventListener("submit",async e=>{
  e.preventDefault();const form=e.currentTarget,btn=$("bookingSubmit");btn.disabled=true;btn.textContent="CHECKING AVAILABILITY…";
  const data=Object.fromEntries(new FormData(form).entries());
  try{
   const res=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
   const result=await res.json();if(!res.ok)throw new Error(result.error||"Could not submit booking.");
   const msg=`PITCH & BREW BOOKING REQUEST%0AName: ${data.name}%0APhone: ${data.phone}%0ASport: ${data.sport}%0ADate: ${data.date}%0ATime: ${data.time}%0ADuration: ${data.duration} day(s)%0APlayers: ${data.players}%0ANotes: ${data.message||"None"}%0AStatus: Pending — please confirm availability.`;
   whatsapp(decodeURIComponent(msg));toast("Request saved. Complete the message in WhatsApp.");loadSlots();
  }catch(err){toast(err.message||"Booking failed. Please try again.",true);}
  finally{btn.disabled=false;btn.innerHTML='CHECK & REQUEST BOOKING <span>↗</span>';}
 });
 // Cafe cart
 function cartTotals(){let count=0,total=0;for(const [id,qty] of Object.entries(cart)){const p=cfg.cafe.find(x=>x.id===id);if(p){count+=qty;total+=p.price*qty;}}
  $("cartCount").textContent=count;$("cartTotal").textContent=money(total);
  const host=$("cartItems");host.innerHTML="";
  if(!count){host.innerHTML='<p class="empty-cart">Your next favourite starts here.</p>';return;}
  Object.entries(cart).forEach(([id,qty])=>{const p=cfg.cafe.find(x=>x.id===id);if(!p)return;const row=document.createElement("div");row.className="cart-row";row.innerHTML=`<div><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="qty"><button type="button" data-cart="${id}" data-delta="-1">−</button><span>${qty}</span><button type="button" data-cart="${id}" data-delta="1">+</button></div><strong>${money(p.price*qty)}</strong>`;host.appendChild(row);});
 }
 document.querySelectorAll(".add-btn").forEach(btn=>btn.addEventListener("click",()=>{const id=btn.dataset.id;cart[id]=Math.min(10,(cart[id]||0)+1);cartTotals();toast("Added to your order.");}));
 $("cartItems")?.addEventListener("click",e=>{const b=e.target.closest("button[data-cart]");if(!b)return;const id=b.dataset.cart;cart[id]=(cart[id]||0)+Number(b.dataset.delta);if(cart[id]<=0)delete cart[id];cartTotals();});
 $("cafeForm")?.addEventListener("submit",async e=>{e.preventDefault();const items=Object.entries(cart).map(([id,qty])=>({id,qty}));if(!items.length){toast("Add an item to your cart first.",true);return;}
  const name=$("cafeName").value.trim(),phone=$("cafePhone").value.trim();
  try{const r=await fetch("/api/cafe-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,phone,items})});const out=await r.json();if(!r.ok)throw new Error(out.error||"Order failed");
   const lines=out.items.map(x=>`${x.qty} x ${x.name} — Rs ${x.subtotal}`).join("\n");
   whatsapp(`PITCH & BREW CAFE ORDER\nName: ${name}\nPhone: ${phone}\n${lines}\nTOTAL: Rs ${out.total}\nPlease confirm this order.`);
   toast("Cafe order saved. Complete it in WhatsApp.");
  }catch(err){toast(err.message||"Could not save cafe order.",true);}
 });
 cartTotals();
})();
