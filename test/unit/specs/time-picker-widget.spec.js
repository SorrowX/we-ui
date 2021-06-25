import { createTest, destroyVM } from '../util';
import TimePickerWidget from 'packages/time-picker-widget';

describe('TimePickerWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TimePickerWidget, true);
    expect(vm.$el).to.exist;
  });
});

