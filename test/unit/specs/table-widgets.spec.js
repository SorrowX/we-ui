import { createTest, destroyVM } from '../util';
import TableWidgets from 'packages/table-widgets';

describe('TableWidgets', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TableWidgets, true);
    expect(vm.$el).to.exist;
  });
});

