const build = () => ({ ready: true });
console.log(new build());
// 预期错误：TypeError；build is not a constructor
