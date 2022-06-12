const pvitalSIgn=document.getElementById('p-vital-sign');
const history=document.getElementById('history-btn');
const update=document.getElementById('update-btn');
const hiddenNotes=document.getElementById('hidden-btn');
// show vital-signs and weight;
pvitalSIgn.addEventListener('click',function()
{
   const template=document.getElementById('vital-sign');
   lower.appendChild(template.content);  
})
history.addEventListener('click',function()
{

   const template1=document.getElementById('history-temp');
   lower.appendChild(template1.content);  
})
update.addEventListener('click',function()
{
   alert("update");
   const template2=document.getElementById('update-temp');
   lower.appendChild(template2.content);  
})
hiddenNotes.addEventListener('click',function()
{
   alert("HIdden Notes");
   const template3=document.getElementById('hidden-temp');
   lower.appendChild(template3.content);  
})





