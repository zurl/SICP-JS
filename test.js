//js little framework
var _ = {};
exports._ = _;

_.test_cnt = 0;
_.test = (testname, callee) => {
    _.test_cnt++;
    console.log(`Test # ${_.test_cnt} ${testname} :`);
    let start = new Date().getTime();
    console.log(callee());
    let end = new Date().getTime();
    _.test_success++;
    console.log(`Test # ${_.test_cnt} passed! in ${end - start}ms`);
}
_.test_success = 0;
_.test.fail = 0;
_.assert = (testname, callee, result) => {
    _.test_cnt++;
    console.log(`Test # ${_.test_cnt} ${testname} :`);
    let ret = callee();
    console.log(ret);
    if (ret == result) {
        _.test_success++;
        console.log(`Test # ${_.test_cnt} passed! in ${end - start}ms`);
    } else {
        console.log(`Test # ${_.test_cnt} failed! `);
        _.test_fail++;
        console.log(`Except : ${result} \n Output : ${ret}`);
    }
}
_.status = () => {
    console.log(`Test total ${_.test_cnt} , Success : ${_.test_success} , Failed : ${_.test_fail}`)
}