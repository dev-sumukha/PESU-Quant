const roleCheck = (roles) => (yes,no) => {
    console.log(`${yes} ${no} ${roles}`);
}

roleCheck(["admin"])("yes","no");
