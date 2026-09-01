const res = await fetch('https://api.render.com/v1/services/srv-daatuq7qj5pc73b9c9sg/custom-domains', {
  headers: { Authorization: `Bearer ${process.env.RENDER_API_KEY}` },
});
const body = await res.text();
console.log(res.status);
console.log(body);
