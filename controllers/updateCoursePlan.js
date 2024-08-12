const AdvisingSession = require("../models/AdvisingSession");
const { Op } = require('sequelize');
async function updatePlanStatus(studentId, semesterId, newStatus) {
    try {
        const plan = await AdvisingSession.update(
            { planStatus: newStatus }, // Update the attribute directly
            {
                where: {
                    [Op.and]: [
                        { studentId: studentId },
                        { semesterId: semesterId }
                    ]
                }
            }
        );
        console.log(plan);
        return plan
    } catch (error) {
        console.log("Unable to update CoursePlan Status:", error.message)
        return null;
    }
}
module.exports = { updatePlanStatus }