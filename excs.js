/* eslint-disable no-console */


// 1- How many searches?
const sorted = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];

function binarySearch(array, value, start, end) {
  let startArray = start === undefined ? 0 : start;
  let endArray = end === undefined ? array.length : end;

  if (startArray > endArray) {
    return -1;
  }
  const index = Math.floor((startArray + endArray) / 2);
  const item = array[index];

  console.log(startArray, endArray);
  if (item == value) {
    return index;
  } else if (item < value) {
    return binarySearch(array, value, index + 1, endArray);
  } else if (item > value) {
    return binarySearch(array, value, startArray, index - 1);
  }
}


console.log('binarySearch(sorted, 8, 0, 9)', binarySearch(sorted, 8, 0, 9));
// 0 9 | 0 3 | 2 3 | 3 3 

console.log('binarySearch(sorted, 16, 0, 9)', binarySearch(sorted, 16, 0, 9));
// 0 9 | 5 9 | 8 9 


// 2- Linear vs Binary
const arr = [
  89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13,
  40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68,
  15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85,
  63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46,
  13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64,
  43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51,
  54, 84, 34, 53, 78, 40, 14, 5,
];

// 2.1 - Linear search 

const linearSearch = (arr, value) => {
  let returnValue = 'Nothing found.';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      returnValue = i;
    }
  }
  return returnValue;
};

// linearSearch(arr, 1000)

console.log('linearSearch(arr, 1000)', linearSearch(arr, 1000));
// Binary

let sortedArr = arr.sort();

console.log('binarySearch(sortedArray, 78, 0, 92)', binarySearch(sortedArr, 78, 0, 92));
// 6 searches


// 3- find a book

const findBook = (lib, dewey, title) => {
  let start = 0;
  let end = lib.length;
  while (start < end) {

    let middle = Math.floor((start + end) / 2);

    if (lib[middle].dewey == dewey) {
      if (lib[middle].title == title) {
        return lib[middle];
      } else {
        for (let index = middle + 1; lib[index].dewey == dewey; index++) {
          if (lib[index].title == title) {
            return lib[index];
          }
        }
        for (let index = middle - 1; lib[index].dewey == dewey; index--) {
          if (lib[index].title == title) {
            return lib[index];
          }
        }
        return null;
      }
    //   if (lib[middle].dewey < dewey) {
    //     start = middle + 1;
    //   } else {
    //     end = middle - 1;
    //   }
    }
  }
  return null;
};

findBook();


//4 - Searching in a BST 

// 1-  Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?

// in-order: 14 15 19 25 27 35 79 89 90 91 (given)
// pre-order: 35 25 15 14 19 27 89 79 91 90 (given)
// post-order: 14 15 19 27 25 79 90 91 89 35 (ANSWER)
//       35
//    /      \
//   25      89
//  /  \    /  \ 
// 15  27  79   91
// /  \ / \ /\   /  \
// 14  19        90
// / \  / \       / \



// 2- The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?

// pre-order: 5 7 6 9 8 11 10
//  post-order: 6 8 10 11 9 7 5
//        5
//       / \
//            7
//          /   \ 
//         6      9
//        / \    /   \
//              8     11
//            /  \    / \
//                  10 
//                  / \


//5- Implement Different tree traversals 

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {

    if (this.key == null) {
      this.key = key;
      this.value = value;
    }


    else if (key < this.key) {

      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }

      else {
        this.left.insert(key, value);
      }
    } else {

      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

}

BinarySearchTree();

// 6 - Find the next commanding officer

class _Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
  
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  
  enQueue(data) {
    const node = new _Node(data);
    
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }
  
  deQueue() {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = this.first.next;

    if (node === this.last) {
      this.last = null;
    }
    return node.data;
  }
}
  
////////////////////////////////////////////////////
  
function cmdOfficer(tree, result = []) {
  const queue = new Queue();
  queue.enQueue(tree);
  
  while (queue.first !== null) {
    const node = queue.deQueue();
    result.push(node.value);
  
    if (node.left) {
      queue.enQueue(node.left);
    }
  
    if (node.right) {
      queue.enQueue(node.right);
    }
  }
  result.forEach(officers => console.log(officers));
}
  
function nextOfficer() {
  let BST = new BinarySearchTree();
  BST.insert(5, 'Captain Picard');
  BST.insert(3, 'Commander Riker');
  BST.insert(6, 'Commander Data');
  BST.insert(8, 'Lt. Cmdr. Crusher');
  BST.insert(7, 'Lieutenant Selar');
  BST.insert(2, 'Lt. Cmdr. Worf');
  BST.insert(4, 'Lt. Cmdr. LaForge');
  BST.insert(1, 'Lt. security-officer');
  
  cmdOfficer(BST);
}
  
nextOfficer();

// 7 - Max Profit

const profit = array => {
  let profit = 0;
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 1) {
      profit -= array[i];
    } else {
      profit += array[i];
    }
  }
  return profit;
};

const prices = [128, 97, 121, 123, 98, 97, 105];

console.log('profit(prices)', profit(prices));

// 8 - Egg drop (optional) | Didn't do it!