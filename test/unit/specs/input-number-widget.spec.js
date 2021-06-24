import { createTest, destroyVM } from '../util';
import InputNumberWidget from 'packages/input-number-widget';

describe('InputNumberWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputNumberWidget, true);
    expect(vm.$el).to.exist;
  });
});

