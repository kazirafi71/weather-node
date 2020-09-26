const http=require('http')
const fs=require("fs")
const requests = require('requests');

const home=fs.readFileSync('index.html','utf-8')

const replaceVal=(temp,org)=>{
    
    let temperature=temp.replace("{%tempval%}",Math.floor(org.main.temp-273))
    temperature=temperature.replace("{%mintempval%}",Math.floor(org.main.temp_min-273))
    temperature=temperature.replace("{%maxtempval%}",Math.floor(org.main.temp_max-273))
    temperature=temperature.replace("{%weather%}",org.weather[0].main)
    temperature=temperature.replace("{%loc%}",org.name)
    temperature=temperature.replace("{%cnt%}",org.sys.country)
    temperature=temperature.replace("{%xyz%}",org.weather[0].main)

    return (temperature)

}


const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('http://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=cf642ece44859893e16b7d49969a8b91')
.on('data', function (chunk) {
    const objData=JSON.parse(chunk)
    const arrData=[objData]
    

const realTimeData=arrData.map((val)=> replaceVal(home,val)).join('')

res.write(realTimeData)

})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end()
});
    }

});


server.listen(8000,"127.0.0.1",()=>{
    console.log('server is running')
});