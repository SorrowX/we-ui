import { createTest, destroyVM } from '../util';
import CheckboxWidget from 'packages/checkbox-widget';

describe('CheckboxWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(CheckboxWidget, true);
    expect(vm.$el).to.exist;
  });
});

