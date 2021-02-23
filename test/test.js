const { currentTime } = require("../src/module");
const qf = require("../src/QuickFunctions");
function intervalTest() {
    console.log(1+1);
}
function timeoutTest() {
    console.log("Timeout Test Complete")
}
(async () => {
    await qf.dbConnect("localhost", "admin", "admin");
    await qf.CreateDB("TEST");
    qf.currentTime();
    let Interval = qf.interval(intervalTest, 3000);
    Interval;
    qf.clsInter(Interval);
    qf.timeout(timeoutTest, 3000);
    qf.clsTime(timeoutTest);
})();