const key = process.env.RENDER_API_KEY;
const serviceId = 'srv-daatuq7qj5pc73b9c9sg';
const res = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys?limit=1`, {
  headers: { Authorization: `Bearer ${key}` }
});
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
