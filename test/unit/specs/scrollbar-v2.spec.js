import { createTest, destroyVM } from '../util';
import ScrollbarV2 from 'packages/scrollbar-v2';

describe('ScrollbarV2', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(ScrollbarV2, true);
    expect(vm.$el).to.exist;
  });
});

