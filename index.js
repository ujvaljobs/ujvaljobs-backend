const express = require('express');
const app = express();
const axios = require('axios');
const port = 5231;
require('dotenv').config()
const cors = require('cors')
app.use(express.json())
app.use(cors({
	origin: 'http://ujvaljob.com/'
}))


app.get('/', (req, res) => {
	const authHeader = `Basic ${btoa(`${process.env.KEY}:${process.env.SECRET}`)}`;
	axios({
		method: 'post',
		url: `https://api.razorpay.com/v1/orders`,
		headers: { "content-type": "application/json", 'authorization': authHeader },
		data: {
			amount: Number(req.query.amount),
			currency: req.query.currency,
		}
	})
		.then((response) => {
			res.send(response.data)
		})
		.catch((err) => {
			res.send(err)
		})
})


app.listen(process.env.PORT || port, () => {
	console.log(`Server Started on port ${port}`);
})
