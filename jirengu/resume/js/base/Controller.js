/* 
Controller({
  init:(){
    this.view
    this.model
    this.xxx()
    this.yyy()
  },
  xxx(){}
  yyy(){}
})
  */

window.Controller = function(options) {
    let init = options.init;

    let object = {
        view: null,
        model: null,
        init(view, model) {
            this.view = view;
            this.model = model;

            // 初始化 model
            this.model.init();
            init.call(this, view, model); // 这是哪个 init
            this.bindEvents.call(this);
        }
    };

    // 其他的函数从 options 里面拿
    for(let key in options) {
      if(key !== 'init') {
        object[key] = options[key];
      }
    }

    return object;
}