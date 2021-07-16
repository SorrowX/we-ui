import { createTest, destroyVM } from '../util';
import UploadWidget from 'packages/upload-widget';

describe('UploadWidget', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(UploadWidget, true);
    expect(vm.$el).to.exist;
  });
});

