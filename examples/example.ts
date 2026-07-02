import SpigetClient from 'spiget-js';

const client = new SpigetClient({
  userAgent: 'my-app/1.0',
});

const resource = await client.resources.get(9089);
const author = await client.resources.getAuthor(9089);
const { data: reviews } = await client.resources.getReviews(9089);

console.log(resource);
console.log(author);
console.log(reviews);
