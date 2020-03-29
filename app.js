const express = require('express')
const app = express()
const port = 8000
var url = require('url')

app.get('/', (req, res) => {
		res.send('Hello there!')
})

app.use(express.json())
app.post('/', (req,res)=>{
		console.log('receiving data...')
		var str=""
		var ip = req.connection.remoteAddress
		var date = new Date();
		var year = date.getFullYear()
		var month = date.getMonth()+1
		month = (month<10?"0":"") + month
		var day = date.getDate()
		day = (day<10?"0":"") + day
		var hour = date.getHours()
		hour = (hour<10?"0":"") + hour
		var min = date.getMinutes()
		min = (min<10?"0":"") + min
		var sec = date.getSeconds()
		sec = (sec<10?"0":"") + sec
		str+='"ip":"'+ ip.substring(7) +'",' //substr(7) also possible
		str+='"time":"'+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec+'",'
		str+='"email":"cmc9595@nate.com",'
		str+='"stuno":"20141588"}'

		var jsonstr=JSON.stringify(req.body)
		jsonstr = jsonstr.replace('}','')
		jsonstr +=','
		jsonstr += str
		res.send(jsonstr)
})

app.get('/get', (req, res) => {

		var str=""
		var ip = req.connection.remoteAddress
		var date = new Date();
		var year = date.getFullYear()
		var month = date.getMonth()+1
		month = (month<10?"0":"") + month
		var day = date.getDate()
		day = (day<10?"0":"") + day
		var hour = date.getHours()
		hour = (hour<10?"0":"") + hour
		var min = date.getMinutes()
		min = (min<10?"0":"") + min
		var sec = date.getSeconds()
		sec = (sec<10?"0":"") + sec

		for(const key in req.query){
		str+='"'+key+'"'+':'+'"'+req.query[key]+'"'+','
		//console.log('"'+key+'"'+':'+'"'+req.query[key]+'"')
		}
		str+='"ip":"'+ ip.substring(7) +'"' //substr(7) also possible
		str+='"time":"'+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec+'",'
		str+='"email":"cmc9595@nate.com",'
		str+='"stuno":"20141588"}'
		res.send(str)
})

app.get('/*', (req, res)=> {

		   var parts = url.parse(req.url).pathname
		   //console.log(parts)
		   var arr = parts.split('/')
		   //for(var i=0;i<arr.length;i++){
		   //console.log(arr[i])}

		   //var n = Object.keys(req.query).length
		   //res.send('u have got '+ n + ' params')
		   var str=""
		   var ip = req.connection.remoteAddress
		   var date = new Date();
		   var year = date.getFullYear()
		   var month = date.getMonth()+1
		   month = (month<10?"0":"") + month
		   var day = date.getDate()
		   day = (day<10?"0":"") + day
		   var hour = date.getHours()
		   hour = (hour<10?"0":"") + hour
		   var min = date.getMinutes()
		   min = (min<10?"0":"") + min
		   var sec = date.getSeconds()
		   sec = (sec<10?"0":"") + sec

		   str+='{'
		   for(var i=1;i<arr.length;i++){
		   str+='"'+String.fromCharCode(i%26 + 96)+'"'
		   str+=":"
		   str+='"'+arr[i]+'",'
		   }
		   str+='"ip":"'+ ip.substring(7) +'",' //substr(7) also possible
		   str+='"time":"'+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec+'",'
		   str+='"email":"cmc9595@nate.com",'
		   str+='"stuno":"20141588"}'

		   res.send(str)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
