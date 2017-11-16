const success = desc => console.log(`${desc} : Pass`);
const failure = (desc, msg) => console.log(`:( ${desc} : Fail => ${msg}`);
const log = desc => console.log(desc);

const activity = {};
const stack = [];
const isEmptyStack = () => stack.length === 0;
const stackTop = () => stack[stack.length - 1];
const ctx = {};

const spush = (key, val) => stackTop()[key].push(val);

const indentedTitle = ctxt =>
  `${stack.map(() => '   ').join('')}${ctxt}`;

const newTop = title =>
  ({ title, tests: [], setup: [], teardown: [], testSuites: [] });

const execTop = () => 'setup tests testSuites teardown'.split(' ')
  .forEach(key => stackTop()[key].forEach(activity[key]));

const execTestSuite = (title, testSuiteFn) => {
  log(indentedTitle(title));
  stack.push(newTop(title));
  testSuiteFn.call(ctx);   // collect testSuites, setup, teardown and it.
  execTop();               // execute them
  stack.pop();
};

const reportTests = (fn, title) => {
  const desc = indentedTitle(title);

  try {
    fn.call(ctx);
    success(desc);
  } catch (e) {
    failure(desc, e.message);
  }
};

activity.setup = fn => fn.call(ctx);
activity.async = fn => fn && fn.length;
activity.teardown = fn => fn.call(ctx);
activity.testSuites = ([title, testFn]) =>
  execTestSuite(title, testFn);
activity.tests = ([title, testFn]) =>
  reportTests(testFn, title);



export const test = (desc, fn) => {
  function done(err = '') {
    console.log("done");
  }
  // console.log("test")
  spush('tests', [desc, fn]);
};

export const testSuite = (title, testfn) => { 
  if (isEmptyStack()) {
    execTestSuite(title, testfn);
    return;
  }

  spush('testSuites', [title, testfn]);
};
export const setup = spush.bind(null, 'setup');
export const teardown = spush.bind(null, 'teardown');
