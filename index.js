const { default: axios } = require('axios');
const express = require('express');
const port = 5231;
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors({
	origin: 'http://ujvaljob.com/'
}))


app.get('/', (req, res) => {
	const authHeader = `Basic ${btoa('rzp_live_i1A7jFovCyA64k:h0GHl1XGT3BbR5En86A1QgCq')}`;
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
