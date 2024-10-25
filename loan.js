let creditLimit = 50;

const loanOut = function(amount) {
  return new Promise((resolve, reject) => {
    if (creditLimit <= 0) {
      return reject("Insufficient funds");
    }
    if (creditLimit >= amount) {
      creditLimit -= amount;
      amountReceived = amount;
      return resolve(amountReceived);
    } else if (creditLimit < amount) {
      amountReceived = creditLimit;
      return resolve(amountReceived);
    }
  });
}

console.log("Asking for $150, which should be okay ...");
loanOut(150) 
  .then((amountReceived) => { 
    console.log(`\t-> I got $${amountReceived} loan from the bank! Remaining Credit Limit: $${creditLimit}`);
  })
  .catch((err) => { 
    console.log(`\t-> Error: ${err}!`);
  });