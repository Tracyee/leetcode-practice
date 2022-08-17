import PriorityQueue from './heapPQ';

const pq = new PriorityQueue([3, 1, 2, 5, 10]);

// Array(5)
//   .fill(0)
//   .forEach((_, i) => {
//     pq.insert(i);
//     console.log(pq.max());
//   });

// console.log(pq.delMax());
for (let item of pq) {
  console.log(item);
}
