// Tool.js

function getLoaingObj() {
  const page = getCurrentPages() // 获取当前页面栈
  return page[page.length - 1].selectComponent('#loading') // 当前显示的页面中找到loading组件
}

export default {
  // 其他全局功能 ...
  loading(loadingText = '加载中···', mask = true) {
    const loading = getLoaingObj()
    if (loading) {
      loading.show(loadingText, mask) // 调用loading组件的show方法实现显示，这样就不需要在每个页面的js部分写一次获取loading组件和show
    }
  },
  hideLoading() {
    const loading = getLoaingObj()
    if (loading) {
      loading.hide() // 同 show
    }
  }
}

