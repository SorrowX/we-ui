import { createTest, destroyVM } from '../util';
import SelectWidget from 'packages/select-widget';

describe('SelectWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SelectWidget, true);
    expect(vm.$el).to.exist;
  });
});

