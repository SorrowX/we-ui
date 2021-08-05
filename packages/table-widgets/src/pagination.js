import ElPagination from 'element-ui/packages/pagination';
import * as utils from 'element-ui/packages/widgets/src/utils';

const { merge, bindContext } = utils;

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGESIZE = 5;
const DEFAULT_LAYOUT = 'total, prev, pager, next, sizes';
const PAGINATION_MODE = 'pagination';
const DEFAULT_PAGESIZES = [5, 10, 20, 30, 40, 50, 100];

export default {
  data() {
    return {
      currentPage: DEFAULT_CURRENT_PAGE,
      pageSize: DEFAULT_PAGESIZE,
      layout: DEFAULT_LAYOUT,
      pageSizes: DEFAULT_PAGESIZES
    };
  },

  watch: {
    paginationData: {
      immediate: true,
      deep: true,
      handler(data = {}) {
        const currentPage = (data.props || {}).currentPage || DEFAULT_CURRENT_PAGE;
        const pageSize = (data.props || {}).pageSize || DEFAULT_PAGESIZE;
        const pageSizes = (data.props || {}).pageSizes || [];

        this.setCurrentPage(currentPage);
        this.setPageSize(pageSize);
        this.setPageSizes(pageSizes, pageSize);
      }
    }
  },

  methods: {
    initPageSizeAndCurrentPage() {
      const { mode, data } = this;
      if (mode !== PAGINATION_MODE) {
        this.setCurrentPage(DEFAULT_CURRENT_PAGE);
        this.setPageSize(data.length);
      }
    },

    setCurrentPage(currentPage) {
      this.currentPage = currentPage <= 0 ? DEFAULT_CURRENT_PAGE : currentPage;
    },

    setPageSize(pageSize) {
      this.pageSize = pageSize <= 0 ? DEFAULT_PAGESIZE : pageSize;
    },

    setPageSizes(pageSizes, pageSize) {
      const copy = DEFAULT_PAGESIZES.slice(0);
      const newPageSizes = copy.slice(0);
      newPageSizes.push(pageSize);
      const defaultPageSizes = DEFAULT_PAGESIZES.includes(pageSize)
        ? copy
        : newPageSizes.sort((a, b) => a - b);
      this.pageSizes = pageSizes.length ? pageSizes : defaultPageSizes;
    },

    renderPagination(h) {
      const {
        currentPage,
        pageSize,
        pageSizes,
        layout,
        paginationData: userPaginationData,
        paginationClass
      } = this;

      const data = merge(
        {
          props: {
            layout,
            pageSizes,
            background: true
          }
        },
        userPaginationData || {},
        {
          props: {
            total: this.data.length,
            currentPage,
            pageSize
          }
        }
      );

      const on = data.on || {};
      const mapEvents = {
        sizeChange: () => {},
        currentChange: () => {},
        'update:currentPage': currentPage => {
          this.setCurrentPage(currentPage);
        },
        'update:pageSize': pageSize => {
          this.setPageSize(pageSize);
        }
      };
      Object.keys(mapEvents).forEach(eventName => {
        let original = on[eventName];
        original = (typeof original === 'function' || Array.isArray(original))
          ? bindContext(on[eventName], this)
          : () => {};
        const inner = mapEvents[eventName];
        on[eventName] = [].concat(original, inner);
      });
      data.on = on;

      return h('div', {
        class: [
          'el-table-widgets__pagination-wrap',
          paginationClass
        ]
      }, [h(ElPagination, data)]);
    }
  }
};
