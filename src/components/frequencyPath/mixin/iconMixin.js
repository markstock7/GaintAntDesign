const IconMixin = {
  _generateIcon: function _generateIcon(type) {
    switch (type) {
      case 'click':
        return (<Icon type='pushpin' />);
      case 'page':
        return (<Icon type='book' />);
      case 'text':
        return (<Icon type='edit' />);
      default:
        return null;
    }
  }
};
export default IconMixin;
