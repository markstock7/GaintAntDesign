(function _init(window, document, $) {
  var ALL_CATEGORY = window.ALL_CATEGORY,
    searchBox;

  /**
   * 搜索文档，可以搜索component，fn，theme
   *
   */
  function searchDoc(keyword) {

  }

  /**
   * 渲染搜索结果
   */
  function readerSearchResultList() {

  }

  /**
   * 绑定搜索按钮 mousedown 事件
   */
  searchBox = $('#search-box');
  searchBox.on('keyup', function _keyDown(e) {
    var keyword = this.value, resultList;
    e.stopPropagation();
    resultList = searchDoc(keyword);
    readerSearchResultList(resultList);
  });
}(window, document, window.$));
