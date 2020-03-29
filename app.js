const express = require('express')
const app = express()
const port = 8000

//app.get('/', (req, res) => res.send('Hello World!\n'))

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
	str+='"time":"'+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec+'",';
	str+='"email":"cmc9595@nate.com",'
	str+='"stuno":"20141588"}'
	res.send(str)
})



app.post('/form',(req,res)=>{
	console.log(req.body.name)
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
