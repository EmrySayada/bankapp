export async function login(username, password){
    const res = await fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await res.json()
    return data;
}

export async function register(username, firstName, lastName, birth, address, phoneNumber, email, password){
    const res = await fetch('http://127.0.0.1:5000/register', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            username: username,
            firstName: firstName,
            lastName: lastName,
            birth: birth,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            password: password
        })
    });
    const data = await res.json()
    return data;
}

export async function getInfo(token){
    //total balance : /accounts
    //recent transaction: /tranactions
    //number of accounts: /accounts
    //number of transaction: /transactions
    const accounts = await fetch('http://127.0.0.1:5000/accounts', {
        method: "GET",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token}
    });
    const account_data = await accounts.json();
    const transactions = await fetch('http://127.0.0.1:5000/transactions', {
        method: "GET",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token}
    });
    const transactions_data = await transactions.json();
    return {
        accountData: account_data,
        transactionsData: transactions_data,
        statusCode: accounts.status
    };
}

export async function getTransactions(token){
    const res = await fetch('http://127.0.0.1:5000/transactions', {
        method: "GET",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token}
    });
    const data = await res.json();
    return data;
}

export async function getAccounts(token){
    const res = await fetch('http://127.0.0.1:5000/accounts', {
        method: "GET",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token}
    });
    const data = await res.json();
    return data;
}

export async function createAccount(token){
    const res = await fetch('http://127.0.0.1:5000/create_account', {
        method: "POST",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token},
    })
    const data = await res.json();
    return data;
}

export async function handleTransaction(token, ownAccountId, recAccountId, amount, description){
    //send POST req to the server at endpoint /trasnaction
    //speceify the following in the req:
    //rec account number
    //sender account number
    //amount
    //description.
    //the following are handled by the server
    //finding the owners usernames are handled in the server
    //adding it to a seperate table to keep for histoy is handled as well
    //sufficiet/insufficient funds are handled as well
    //baseically Id just need to send the req
    const res = await fetch('http://127.0.0.1:5000/transaction', {
        method: "POST",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token},
        body: JSON.stringify({
            ownAccountId: ownAccountId,
            recAccountId: recAccountId,
            amount: amount,
            description: description
        })
    });
    const data = await res.json()
    return data
}

export async function hash(password, iterations){
    if (iterations == 0){
        return password;
    }
    return hash(await hashHelper(password), iterations-1)
}

async function hashHelper(password){
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));                
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export async function getUserInfo(token){
    const res = await fetch('http://127.0.0.1:5000/user_info', {
        method: "GET",
        headers: {"Content-type": "application/json", "Authorization": "Bearer "+token},
    });
    const data = await res.json()
    return data;
}