

const vitalSIgn=document.getElementById('vital-sign-btn');
const history=document.getElementById('history-btn');
const update=document.getElementById('update-btn');
const hiddenNotes=document.getElementById('hidden-btn');
const reports=document.getElementById('report-btn');
function show(show,hidden1,hidden2,hidden3,hidden4)
{
   // console.log(show);
   document.getElementById(show).style.display='flex';
   document.getElementById(show).style.visibility='visible';
   console.log(document.getElementById(show));
   document.getElementById(hidden1).style.display='none';
   document.getElementById(hidden2).style.display='none';
   document.getElementById(hidden3).style.display='none';

   const a=document.getElementById(hidden4);
   if(a)
   a.style.display='none';
   return;
}
vitalSIgn.addEventListener('click',function()
{
   show('vital-sign','reports','lastupdate','history','hiddennotes');
   return;
});
history.addEventListener('click',function()
{
   show('history','vital-sign','lastupdate','reports','hiddennotes');
   return;
});
update.addEventListener('click',function()
{
   show('lastupdate','vital-sign','reports','history','hiddennotes');
   return;
});
reports.addEventListener('click',function()
{
   show('reports','vital-sign','lastupdate','history','hiddennotes');
   return;
});
if(hiddenNotes)
{
   hiddenNotes.addEventListener('click',function()
  {
   show('hiddennotes','vital-sign','lastupdate','reports','history');
   return;
  });
}

