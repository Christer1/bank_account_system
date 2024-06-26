class BankAccount {
    constructor(accountNumber, firstName, lastName) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._accountHolder = firstName +" "+ lastName;  //concatenation of first name and last name
        this._balance = 0;   //default balance should be 0
        this._transactions = [];
        this._dailyWithdrawalLimit = 1000; // Default daily withdrawal limit
        this._dailyWithdrawalAmount = 0; // Tracks daily withdrawal amount
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
        if (amount <= 0) {
            console.log("Withdrawal amount must be greater than 0.");        }
        if (amount > this._balance) {
            console.log("Insufficient funds.");
        }
        if (this._dailyWithdrawalAmount + amount > this._dailyWithdrawalLimit) {
            console.log("Daily withdrawal limit exceeded.");
        }
        this._balance -= amount;
        const transaction = new Transaction("Withdrawal", amount);
        this._transactions.push(transaction);
        this._dailyWithdrawalAmount += amount;
        console.log("Withdrawal of " + amount + " was successful");
    }


    getTransactions() {
        // Return transactions as array of objects
        return this._transactions.map(transaction => ({
            type: transaction.type,
            amount: transaction.amount,
            timestamp: transaction.timestamp
        }));
    }

    // Method to transfer money to another account
    transfer(amount, targetAccount) {
        if (amount <= 0) {
            console.log("Transfer amount must be greater than 0.");
            return;
        }
        if (amount > this._balance) {
            console.log("Insufficient funds for transfer.");
            return;
        }
        // Withdraw from current account
        this.withdraw(amount);
        // Deposit into target account
        targetAccount.deposit(amount);
        console.log("Transfer of " + amount + " to " + targetAccount.accountHolder + " was successful");
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


// const account = new BankAccount(123456789, "Olawale", "Yussuph");
// console.log("Account holder is: " + account.accountHolder); // Account holder is: Olawale Yussuph
// console.log("Account balance is: " + account.balance); // Account balance is: 0

// account.deposit(2000); // Deposit of 2000 was successful1
// account.withdraw(40); // Withdrawal of 40 was successful1

// console.log("New account balance is " + account.balance); // New account balance is 1960

// const transactions = account.getTransactions();
// console.log(transactions);

// Creating two bank accounts
const account1 = new BankAccount(123456789, "John", "Doe");
const account2 = new BankAccount(987654321, "Jane", "Smith");

// Depositing some initial amount into both accounts
account1.deposit(1000);
account2.deposit(500);

// Transferring money from account1 to account2
account1.transfer(200, account2);

// Outputting balances after transfer
console.log("Account 1 balance:", account1.balance);
console.log("Account 2 balance:", account2.balance);
