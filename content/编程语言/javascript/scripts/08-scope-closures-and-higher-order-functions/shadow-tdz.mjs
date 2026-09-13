const title = "外层";
{
  console.log(typeof title);
  let title = "内层";
}
// 预期错误：ReferenceError；Cannot access 'title' before initialization
