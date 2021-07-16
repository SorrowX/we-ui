import widgets from 'element-ui/packages/widgets/src/widgets';

const UploadWidget = widgets['upload'];

/* istanbul ignore next */
UploadWidget.install = function(Vue) {
  Vue.component(UploadWidget.name, UploadWidget);
};

export default UploadWidget;
