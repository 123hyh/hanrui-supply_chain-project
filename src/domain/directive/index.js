//  v-enterToNext 表单enter自动走下面一步
export default {
  install(Vue) {
    // focus
    Vue.directive('enterToNext', {
      inserted(el) {
        console.log("enterToNext...")
        //let frm = el.querySelector('.el-form');
        let inputs = el.querySelectorAll('input');
        console.log(inputs);
        //绑定回写事件
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].setAttribute("keyFocusIndex", i);
          inputs[i].addEventListener('keyup', (ev) => {
            if (ev.keyCode === 13 && ev.target.value) {
              let targetTo = ev.srcElement.getAttribute('keyFocusTo');
              if (targetTo) {
                this.$refs[targetTo].$el.focus();
              } else {
                var attrIndex = ev.srcElement.getAttribute('keyFocusIndex');
                var ctlI = parseInt(attrIndex);
                if (ctlI < inputs.length - 1)
                  inputs[ctlI + 1].focus();
              }
            }
          });
        }

      },
    });
    // v-dialogDrag: 弹窗拖拽属性
    Vue.directive('dialogDrag', {
      bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');

        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (() => {
          if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr];
          } else {
            return (dom, attr) => getComputedStyle(dom, false)[attr];
          }
        })()

        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft;
          const disY = e.clientY - dialogHeaderEl.offsetTop;

          const screenWidth = document.body.clientWidth; // body当前宽度
          const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
          const dragDomheight = dragDom.offsetHeight; // 对话框高度

          const minDragDomLeft = dragDom.offsetLeft;
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


          // 获取到的值带px 正则匹配替换
          let styL = sty(dragDom, 'left');
          let styT = sty(dragDom, 'top');

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
          } else {
            styL = +styL.replace(/\px/g, '');
            styT = +styT.replace(/\px/g, '');
          };

          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            // 边界处理
            if (-(left) > minDragDomLeft) {
              left = -(minDragDomLeft);
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft;
            }

            if (-(top) > minDragDomTop) {
              top = -(minDragDomTop);
            } else if (top > maxDragDomTop) {
              // top = maxDragDomTop;
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
          };

          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      }
    });
    Vue.directive('models', {
      bind(el) {
        el.onchange = function (e) {
        }
      },
      /*  update(el, {
         value
       }, vnode, oldVnode) {
         el.onchange = function (e) {
           value && (e.value = value)
         }
       } */
    });
    // 绑定 计算属性
    Vue.directive('calculate', function (el, binding) {
      const {
        oldValue,
        value
      } = binding;
      el.value = value;
    })
  }
}
/* const foucs = Vue.directive('enterToNext', {
  inserted: function (el) {
    console.log("enterToNext...")
    //let frm = el.querySelector('.el-form');
    let inputs = el.querySelectorAll('input');
    console.log(inputs);
    //绑定回写事件
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute("keyFocusIndex", i);
      inputs[i].addEventListener('keyup', (ev) => {
        if (ev.keyCode === 13 && ev.target.value) {
          let targetTo = ev.srcElement.getAttribute('keyFocusTo');
          if (targetTo) {
            this.$refs[targetTo].$el.focus();
          } else {
            var attrIndex = ev.srcElement.getAttribute('keyFocusIndex');
            var ctlI = parseInt(attrIndex);
            if (ctlI < inputs.length - 1)
              inputs[ctlI + 1].focus();
          }
        }
      });
    }

  },
}); */
// v-dialogDrag: 弹窗拖拽属性
/* const dialogDrag = Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');

    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (() => {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })()

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const dragDomheight = dragDom.offsetHeight; // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left');
      let styT = sty(dragDom, 'top');

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      }
      ;

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft);
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop);
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}) */