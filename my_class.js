
class BankAccount {
    constructor(accountNumber, firstName, lastName) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._accountHolder = firstName +" "+ lastName;  //concatenation of first name and last name
        this._balance = 0;   //default balance should be 0
        this._transactions = [];
    }

    get accountNumber() {
        return this._accountNumber;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get accountHolder() {
        return this._accountHolder;
    }

    get balance() {
        return this._balance;
    }

    get transactions() {
        return this._transactions;
    }

    deposit(amount) {
        if (amount <= 0) {  //check if amount is not negative value
            console.log("Deposit amount must be greater than 0.");
        }
        this._balance += amount;   // set the new balance
        const transaction = new Transaction("Deposit", amount);
        this._transactions.push(transaction);  // add the new transation to the array
        console.log("Deposit of "+ amount + " was successful1");  

    }

    withdraw(amount) {
        if (amount <= 0) { //check if amount is not negative value
            console.log("Withdrawal amount must be greater than 0.");
        }else if (amount > this._balance) {  //check if amount is not greater than current account balance
            console.log("Insufficient funds.");
        }
        this._balance -= amount; //set new balance
        const transaction = new Transaction("Withdrawal", amount);
        this._transactions.push(transaction);  //add the new transaction to array
        console.log("Withdrawal of "+ amount + " was successful1");

    }

    getTransactions() {  
        return this._transactions;
    }
}

class Transaction {
    constructor(type, amount) {
        this._type = type;
        this._amount = amount;
        this._timestamp = new Date();
    }

    get type() {
        return this._type;
    }

    get amount() {
        return this._amount;
    }

    get timestamp() {
        return this._timestamp;
    }
}



const account = new BankAccount(123456789, "Olawale", "Yussuph");
console.log("Account holder is: " + account.accountHolder); // Account holder is: Olawale Yussuph
console.log("Account balance is: " + account.balance); // Account balance is: 0

account.deposit(2000); // Deposit of 2000 was successful1
account.withdraw(40); // Withdrawal of 40 was successful1

console.log("New account balance is " + account.balance); // New account balance is 1960

const transactions = account.getTransactions();
console.log(transactions);

// const account = new BankAccount(1021321032, "Olawale", "Yussuph");
// const transaction = new Transaction("Deposit", 100);
// console.log(transaction);
// console.log(account);
