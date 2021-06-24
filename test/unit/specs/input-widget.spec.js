import { createTest, destroyVM } from '../util';
import InputWidget from 'packages/input-widget';

describe('InputWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputWidget, true);
    expect(vm.$el).to.exist;
  });
});

