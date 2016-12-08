#####wx-flux

````
    该库准确的名字应该叫wx-redux,遗憾的是已经被人占坑,so....暂用wx-flux顶替
````

注:
1.wx-flux不对微信小程序书写规范和编码方式有任何的影响
2.wx-flux只对微信小程序的data进行管理


#####Example

1.首先安装wx-flux库: npm i wx-flux --save


##### Getting Started

app.js

````
var {createSotre} = require('wx-flux');
//var {createSotre} = require('./wx-flux.js');

var reducers = require("./reducers")

createStore(reducers);
````


.js文件

````
var {connect} = require('wx-flux');

class HomePage{
    constructor(props){
        super(props);

        //this.data
    }
}

connect(
    function(state, props){
        return {}
    },
    function(dispatch){
        return {
            actions: bindActionCreators(Actions, dispatch)
        }
    }
)(HomePage);


Page(new HomePage());

````