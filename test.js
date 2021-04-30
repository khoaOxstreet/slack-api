const mem = require('mem');

let i = 0;
const counter = () => {
  console.log('not get from cache');
  return ++i;
}
  const memoized = mem(counter);

// const memIt = mem((str) => {
//   console.log('still get here');
//   return str + 'hey';
// })
// memIt('khoa');
// memoized('foo');
// const data = memoized('foo');
// console.log('data is', data);
// console.log(memoized('foo'));
// console.log(memIt('khoa'));


const getPrice = (sku, currency) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('result', sku+currency);
    resolve(sku+'----'+currency);
  }, 4000);
});

const memData = mem(getPrice, {
  maxAge: 10000
});
// console.log(memData('SKDKD', 'SGD').then(r => console.log('result', r)));
// console.log(memData('SKDKD', 'SGD').then(r => console.log('result', r)));


const main = async () => {
  await memData('KHOa', 'MYR');
  const data = await memData('KHOa', 'MYR');
  console.log('data', data);
}
main();