import PriorityQueue from './heapPQ';

const pq = new PriorityQueue(
  [
    ['a', 0],
    ['s', 1],
    ['q', 2],
    ['z', 3],
    ['d', 4],
  ] as [string, number][],
  (a, b) => a[0].localeCompare(b[0]),
  // (a, b) => a[1] - b[1],
);

// Array(5)
//   .fill(0)
//   .forEach((_, i) => {
//     pq.insert(i);
//     console.log(pq.max());
//   });

// console.log(pq.delMax());
// console.log(pq.delMax());
// console.log(pq.delMax());
// console.log(pq.delMax());
// console.log(pq.delMax());
for (let item of pq) {
  console.log(item);
}
