document.querySelector('#loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value.trim();
    const currentAmount = parseFloat(document.querySelector('#currentAmount').value);
    const loanAmount = parseFloat(document.querySelector('#loanAmount').value);
    const creditHistory = document.querySelector('#creditHistory').value;
    const lastDeposit = new Date(document.querySelector('#lastDeposit').value);
    const lastLoanCollection = new Date(document.querySelector('#lastLoanCollection').value);
    const loanRepaymentStart = new Date(document.querySelector('#loanRepaymentStart').value);
    const loanRepaymentEnd = new Date(document.querySelector('#loanRepaymentEnd').value);
    const accountType = document.querySelector('#accountType').value;


    
    

    let valid = true
    const nameError = document.querySelector('#nameError')
    const currentAmountError = document.querySelector('#currentAmountError')
    const loanAmountError = document.querySelector('#loanAmountError')
    
    // if(name === ''){
    //     nameError.style.display = 'block'
    //     valid = false
    // }else{
    //     nameError.style.display = 'none'
    // }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        nameError.style.display = 'block';
        valid = false;
    } else {
        nameError.style.display = 'none';
    }


    if (isNaN(currentAmount)) {
        currentAmountError.style.display = 'block';
        valid = false;
    } else {
        currentAmountError.style.display = 'none';
    }
    if (isNaN(loanAmount)) {
        loanAmountError.style.display = 'block';
        valid = false;
    } else {
        loanAmountError.style.display = 'none';
    }
    if (!valid) {
        return;
    }

    





    
    let score = 0;

    
    if (currentAmount > loanAmount) {
        score += 10;
    } else {
        score -= 10;
    }

    
    if (creditHistory === 'yes') {
        score += 10;
    }else{
        score = 0
    }

    // if (creditHistory >= 6) {
    //     score += 10;
    // }else{
    //     score = 0
    // }


    
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    if (lastDeposit >= oneMonthAgo) {
        score += 5;
    }

    //  (above 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    if (lastLoanCollection <= sixMonthsAgo) {
        score += 10;
    }

    //  (below 6 months)
    const repaymentPeriod = (loanRepaymentEnd - loanRepaymentStart) / (1000 * 60 * 60 * 24);
    if (repaymentPeriod <= 180) {
        score += 5;
    }

    
    if (accountType === 'current') {
        score += 10;
    } else if (accountType === 'savings') {
        score += 5;
    }

    
    const resultDiv = document.querySelector('#result');
    if (score > 30) {
        resultDiv.innerHTML = `
            <p>Congratulations ${name}! You are eligible for a loan.</p>
            <p>Your Score: ${score}</p>
        `;
    } else {
        resultDiv.innerHTML = `
            <p>Sorry ${name}, you are not eligible for a loan.</p>
            <p>Your Score: ${score}</p>
        `;
    }
});
