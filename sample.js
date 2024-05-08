class BankAccount {
    constructor(accountNumber, firstName, lastName) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._accountHolder = firstName + " " + lastName;
        this._balance = 0;
        this._transactions = [];
        this._dailyWithdrawalLimit = 1000; // Default daily withdrawal limit
        this._dailyWithdrawalAmount = 0; // Tracks daily withdrawal amount
    }

    // Getters for account details
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

    // Method to set daily withdrawal limit
    setDailyWithdrawalLimit(limit) {
        this._dailyWithdrawalLimit = limit;
    }

    // Method to deposit money into the account
    deposit(amount) {
        if (amount <= 0) {
            console.log("Deposit amount must be greater than 0.");
            return;
        }
        this._balance += amount;
        const transaction = new Transaction("Deposit", amount);
        this._transactions.push(transaction);
        console.log("Deposit of " + amount + " was successful");
    }

    // Method to withdraw money from the account
    withdraw(amount) {
        if (amount <= 0) {
            console.log("Withdrawal amount must be greater than 0.");
            return;
        }
        if (amount > this._balance) {
            console.log("Insufficient funds.");
            return;
        }
        if (this._dailyWithdrawalAmount + amount > this._dailyWithdrawalLimit) {
            console.log("Daily withdrawal limit exceeded.");
            return;
        }
        this._balance -= amount;
        const transaction = new Transaction("Withdrawal", amount);
        this._transactions.push(transaction);
        this._dailyWithdrawalAmount += amount;
        console.log("Withdrawal of " + amount + " was successful");
    }

    // Method to get transaction history
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
