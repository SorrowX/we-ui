import { createTest, destroyVM } from '../util';
import DatePickerWidget from 'packages/date-picker-widget';

describe('DatePickerWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(DatePickerWidget, true);
    expect(vm.$el).to.exist;
  });
});

