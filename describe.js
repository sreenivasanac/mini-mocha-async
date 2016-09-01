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
  ({ title, tests: [], setup: [], teardown: [], describe: [] });

const execTop = () => 'setup tests describe teardown'.split(' ')
  .forEach(key => stackTop()[key].forEach(activity[key]));

const execDescribe = (title, describeFn) => {
  log(indentedTitle(title));
  stack.push(newTop(title));
  describeFn.call(ctx);   // collect describe, setup, teardown and it.
  execTop();              // execute them
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
activity.teardown = fn => fn.call(ctx);
activity.describe = ([title, testFn]) =>
  execDescribe(title, testFn);
activity.tests = ([title, testFn]) =>
  reportTests(testFn, title);

export const it = (desc, fn) => spush('tests', [desc, fn]);
export const describe = (title, testfn) => {
  if (isEmptyStack()) {
    execDescribe(title, testfn);
    return;
  }

  spush('describe', [title, testfn]);
};
export const setup = spush.bind(null, 'setup');
export const teardown = spush.bind(null, 'teardown');
