import { createTest, destroyVM } from '../util';
import CascaderWidget from 'packages/cascader-widget';

describe('CascaderWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(CascaderWidget, true);
    expect(vm.$el).to.exist;
  });
});

