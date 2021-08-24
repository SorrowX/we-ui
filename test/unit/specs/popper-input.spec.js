import { createTest, destroyVM } from '../util';
import PopperInput from 'packages/popper-input';

describe('PopperInput', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(PopperInput, true);
    expect(vm.$el).to.exist;
  });
});

