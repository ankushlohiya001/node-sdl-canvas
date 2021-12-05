(async function(){
  for(;;){
    await new Promise((res=>{
      setTimeout(res, 100);
    }));
    process.stdout.write(`${new Date} \r`);
  }
})();
