var _ = require('lodash');

module.exports = function _main(nico) {
  var exports = {};
  var Categories = {};
  var Posts = [];

  /**
   *
   * @param pages {Object}
   */
  function getAllPosts(pages) {
    if (Posts && Posts.length > 0) {
      return Posts;
    }
    Object.keys(pages).forEach((key) => {
      Posts.push(pages[key]);
    });
    return Posts;
  }

  // 设置模版的类型
  exports.reader = function _reader(post) {
    var filepath = post.meta.filepath.toLowerCase();
    if (filepath.indexOf('src/components') >= 0) {
      post.template = post.meta.template = 'component';
    } else {
      post.template = post.meta.template = (post.meta.template || 'page');
    }
    if (filepath === 'readme.md') {
      post.filename = post.meta.filename = 'index';
      post.template = post.meta.template = 'home';
    }
    if (filepath.indexOf('/demo/') > 0) {
      post.template = post.meta.template = 'code';
    }
    return post;
  };

  exports.filters = {
    find_category: function findCategory(posts, cats) {
      var ret = [];
      if (typeof cats === 'string') {
        cats = [cats];
      }
      getAllPosts(posts).forEach((post) => {
        if (cats.indexOf(post.meta.category) >= 0) {
          ret.push(post);
        }
      });
      ret = ret.sort((a, b) => {
        a = a.meta.order || 10;
        b = b.meta.order || 10;
        return parseInt(a, 10) - parseInt(b, 10);
      });
      return ret;
    },

    // 将所有的post进行分类和排序
    get_categories: function getCategories(posts, post) {
      var directories, cacheKey, categories, rootDirectory, subDirectory;
      rootDirectory = post.directory.split('/')[0];
      subDirectory = post.directory.split('/')[1];
      if (!rootDirectory && post.filename.indexOf('CHANGELOG') < 0) {
        return [];
      }
      directories = [rootDirectory];
      // docs 和 components 放在同一页
      if (rootDirectory === 'docs' ||
         (rootDirectory === 'src' && subDirectory === 'components') ||
         (rootDirectory === 'src' && subDirectory === 'library') ||
          post.filename.indexOf('CHANGELOG') >= 0) {
        directories = ['docs', 'components', 'library'];
      }
      cacheKey = directories.join('-');
      if (Categories[cacheKey]) {
        categories = Categories[cacheKey];
      } else {
        categories = {};
        _.uniq(getAllPosts(posts).forEach((item) => {
          var itemDirectory = item.directory.split('/')[0];
          var itemSubDirectory = item.directory.split('/')[1];
          var cat = item.meta.category;
          if (!cat) {
            return;
          }
          if (directories.indexOf(itemDirectory) >= 0 ||
              directories.indexOf(itemSubDirectory) >= 0 ||
              item.filename.indexOf('CHANGELOG') >= 0) {
            item.filename = item.filename.toLowerCase();
            categories[cat] = categories[cat] || [];
            categories[cat].push(item);
          }
        }));

        // 类别和所属文章的映射
        categories = Object.keys(categories).map((cat) => {
          return {
            name: cat,
            pages: categories[cat]
          };
        });
        // React 的分类排序
        categories = categories.sort((a, b) => {
          var cats = ['React', 'Components'];
          a = cats.indexOf(a.name);
          b = cats.indexOf(b.name);
          return a - b;
        });

        // 设计的分类排序
        categories = categories.sort((a, b) => {
          var cats = ['风格', '动画', '模式', '资源'];
          a = cats.indexOf(a.name);
          b = cats.indexOf(b.name);
          return a - b;
        });
      }

      Categories[cacheKey] = categories;

      return categories;
    },

    find_demo_in_component: function findDemoInComponent(pages, directory) {
      var ret = [], hasOnly;
      getAllPosts(pages).forEach((post) => {
        if (post.filepath.indexOf(directory + '/demo/') === 0 && !post.meta.hidden) {
          ret.push(post);
        }
      });
      ret.forEach((post) => {
        if (post.meta.only) {
          hasOnly = true;
        }
      });
      if (hasOnly) {
        ret = ret.filter((post) => {
          return post.meta.only;
        });
      }
      ret = ret.sort((a, b) => {
        if (/index$/i.test(a.filename)) {
          a.meta.order = 1;
        }
        if (/index$/i.test(b.filename)) {
          b.meta.order = 1;
        }
        a = a.meta.order || 100;
        b = b.meta.order || 100;
        return parseInt(a, 10) - parseInt(b, 10);
      });
      return ret;
    },
    // For Debug
    console: function console(target) {
      console.log(target);
    },

    parsePost: function parsePost(filepath) {
      return nico.sdk.post.read(filepath);
    },

    odd: function odd(items) {
      return items.filter((item, i) => {
        return (i + 1) % 2 === 1;
      });
    },

    even: function even(items) {
      return items.filter((item, i) => {
        return (i + 1) % 2 === 0;
      });
    },

    rootDirectoryIn: function rootDirectoryIn(directory, rootDirectories) {
      return rootDirectories.indexOf(directory.split('/')[0]) >= 0;
    },

    removeCodeBoxIdPrefix: function removeCodeBoxIdPrefix(id) {
      return id.split('-').slice(2).join('-');
    },

    splitComponentsByType: function splitComponentsByType(pages, category) {
      var tempResult, lastType, result = [];
      if (category !== 'Components') {
        return pages.sort((a, b) => {
          a = a.meta.order || 100;
          b = b.meta.order || 100;
          return parseInt(a, 10) - parseInt(b, 10);
        });
      }
      // 加入组件的类别分隔符
      tempResult = _.sortBy(pages, (p) => {
        var types = ['基本', '表单', '展示', '导航', '其他'];
        return types.indexOf(p.meta.type || '其他');
      });
      tempResult.forEach((p) => {
        if (p.meta.type !== lastType) {
          result.push({
            name: p.meta.type || '其他',
            divider: true
          });
          lastType = p.meta.type;
        }
        result.push(p);
      });
      return result;
    },

    add_anchor: function addAnchor(content) {
      var i, reg;
      for (i = 1; i <= 6; i++) {
        // reg = new RegExp('(<h' + i + '\\sid="(.*?)">.*?)(<\/h' + i + '>)', 'g');
        reg = new RegExp(`(<h${i}\\sid="(.*?)">.*?)(<\/h${i}>)', 'g`);
        content = content.replace(reg, '$1<a href="#$2" class="anchor">#</a> $3');
      }
      return content;
    }
  };

  return exports;
};
