import { createTest, destroyVM } from '../util';
import SwitchWidget from 'packages/switch-widget';

describe('SwitchWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SwitchWidget, true);
    expect(vm.$el).to.exist;
  });
});

