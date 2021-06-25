import { createTest, destroyVM } from '../util';
import TimeSelectWidget from 'packages/time-select-widget';

describe('TimeSelectWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TimeSelectWidget, true);
    expect(vm.$el).to.exist;
  });
});

