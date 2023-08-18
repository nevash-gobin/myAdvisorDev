



function getStudentYear( transcript ) {

    const admitTerm = transcript.admitTerm;
    const admitYear = parseInt(admitTerm.split('/')[0]);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const yearsPassed = currentYear - admitYear;

    // console.log(`Years passed since admit term: ${yearsPassed}`);

    return yearsPassed;
}



module.exports = { getStudentYear };

