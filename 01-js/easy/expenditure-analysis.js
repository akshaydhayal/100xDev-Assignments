/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let ans=[];
  for(let i=0; i<transactions.length; i++){
    let cat=transactions[i].category;
    let flag=false;
    for(let k=0; k<ans.length; k++){
      if(ans[k].category===cat){
        flag=true;
        break;
      }
    }
    if(flag===true){
      continue;
    }
    let total=transactions[i].price;
    for(let j=i+1; j<transactions.length; j++){
      if(transactions[j].category===transactions[i].category){
        total+=transactions[j].price;
      }
    }
    ans.push({"category":cat,"totalSpent":total});
  }
  console.log(ans);
  return ans;
  // return [];
}
calculateTotalSpentByCategory([
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: "Food",
    itemName: "Pizza",
  },
  {
    id: 2,
    timestamp: 1656105600000,
    price: 20,
    category: "Food",
    itemName: "Burger",
  },
  {
    id: 3,
    timestamp: 1656134400000,
    price: 30,
    category: "Food",
    itemName: "Sushi",
  },
]);

module.exports = calculateTotalSpentByCategory;
