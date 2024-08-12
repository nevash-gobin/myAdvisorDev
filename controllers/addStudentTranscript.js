const Transcript = require("../models/Transcript");

async function addStudentTranscript(transcriptData){
    const { 
        studentId, 
        degreeGpa: gpa, 
        name, 
        credits, 
        degree, 
        major, 
        admitTerm, 
        degreeAttemptHours, 
        degreePassedHours, 
        degreeEarnedHours, 
        degreeGpaHours, 
        degreeQualityPoints 
    } = transcriptData;
    if(!await Transcript.findOne({ where: { studentId: studentId } })){
        const studentTranscript = await Transcript.create({
            studentId,
            gpa,
            name,
            credits,
            degree,
            major,
            admitTerm,
            degreeAttemptHours,
            degreePassedHours,
            degreeEarnedHours,
            degreeGpaHours,
            degreeQualityPoints
        });
        return studentTranscript
    }else{
        return null
    }
}
module.exports = { addStudentTranscript }