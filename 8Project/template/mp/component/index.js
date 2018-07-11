
var app = getApp() 

Component({ 
  data: {   
    // 
  }  
  ,properties: {  
    attr1: {
      type: null 
      ,value: {}
      ,observer: function(newVal ,oldVal){ 
        // 
      } 
    }
  }  
  ,externalClasses: [ 
    'xxx'
  ] 
  ,methods: {    
    // func 
    
    // event  
    
  }  
  // 生命周期  
  ,created: function(){   
    // 在组件实例进入页面节点树时执行 
    // 此时不能调用 setData
  }  
  ,attached: function(){  
    // 在组件实例进入页面节点树时执行 
  }  
  ,ready: function(){     
    // 组件布局完成后执行 
  }  
  ,moved: function(){     
    // 在组件实例被移动到节点树另一个位置时执行 
  }  
  ,detached: function(){  
    // 在组件实例被从页面节点树移除时执行 
  }  
  ,options: {   // 一些组件选项 
    multipleSlots: true // 启用多slot支持,默认只支持单slot 
  }  
  ,relations: {         // 组件间关系定义 
    // './xxx-xx': {  
    //   type: <kw>   // 必选,目标组件相对于当前组件的关系 
    //     'ancestor'   祖先节点 
    //     'parent'     父节点 
    //     'child'      子节点  
    //     'descendant' 子孙节点 
    //   // 关系生命周期函数
    //   ,linked: function(cpnt){      // 可选,当关系被建立在页面节点树中时触发 
    //     // 触发时机在组件attached生命周期之后
    //     // cpnt 关联组件的实例 
    //   }  
    //   ,linkChanged: function(cpnt){ // 可选,当关系在页面节点树中发生改变时触发 
    //     // 触发时机在组件moved生命周期之后
    //     // cpnt 关联组件的实例 
    //   }  
    //   ,unlinked: function(cpnt){    // 当关系脱离页面节点树时触发
    //     // 触发时机在组件detached生命周期之后
    //     // cpnt 关联组件的实例 
    //   }
    //   ,target:                  // 可选
    //     如果该项被设置,则它表示关联的目标节点所应具有的behavior,
    //     所有拥有这一behavior的组件节点都会被关联
    //   }
    // }
  }
  ,behaviors: [ ]    // 可选,类似于mixins和traits的组件间代码复用机制 
}) 




