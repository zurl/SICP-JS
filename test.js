//js little unit test framework
var _ = {};
exports._ = _;

_.test_cnt = 0;
_.test = (testname, callee, display = true) => {
    _.test_cnt++;
    console.log(`Test # ${_.test_cnt} ${testname} :`);
    let start = new Date().getTime();
    if(display)console.log(callee());
    let end = new Date().getTime();
    _.test_success++;
    console.log(`Test # ${_.test_cnt} passed! in ${end - start}ms`);
}
_.test_success = 0;
_.test_fail = 0;
_.test_fail_list = new Set();
_.assert = (testname, callee, result, display = true) => {
    _.test_cnt++;
    console.log(`Test # ${_.test_cnt} ${testname} :`);
    let start = new Date().getTime();
    let ret = callee();
    let end = new Date().getTime();
    if(display)console.log(ret);
    if (ret == result) {
        _.test_success++;
        console.log(`Test # ${_.test_cnt} passed! in ${end - start}ms`);
    } else {
        console.log(`Test # ${_.test_cnt} failed! `);
        _.test_fail++;
        _.test_fail_list.add({code:_.test_cnt,name:testname});
        console.log(`Except : ${result} \n Output : ${ret}`);
    }
}
_.status = () => {
    console.log(`Test total ${_.test_cnt} , Success : ${_.test_success} , Failed : ${_.test_fail}`)
}
_.out = x=>console.log(x);

var arraylize = x=>x.length == 0?[]:[x[0]].concat(arraylize(x[1]));
_.list = x=>console.log(arraylize(x));
