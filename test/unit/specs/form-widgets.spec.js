import { createTest, destroyVM } from '../util';
import FormWidgets from 'packages/form-widgets';

describe('FormWidgets', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(FormWidgets, true);
    expect(vm.$el).to.exist;
  });
});

