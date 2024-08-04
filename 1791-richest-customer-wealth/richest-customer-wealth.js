/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function(accounts) {
    let maxWealth = 0;
    
    for (let i = 0; i < accounts.length; i++) {
        let customerWealth = 0;
        for (let j = 0; j < accounts[i].length; j++) {
            customerWealth += accounts[i][j];
        }
        if (customerWealth > maxWealth) {
            maxWealth = customerWealth;
        }
    }
    
    return maxWealth;
};