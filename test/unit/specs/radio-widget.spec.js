import { createTest, destroyVM } from '../util';
import RadioWidget from 'packages/radio-widget';

describe('RadioWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(RadioWidget, true);
    expect(vm.$el).to.exist;
  });
});

