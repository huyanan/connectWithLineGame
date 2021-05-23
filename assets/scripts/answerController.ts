// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    isFollow: boolean = false;

    @property(cc.BoxCollider)
    collider: cc.BoxCollider = null;

    data: object = {
      text: '',
      answerId: ''
    };

    // 记录拖拽前的坐标
    x: number = 0;
    y: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      
    }

    start () {
      var node = this.node;

    }

    init (data) {
      Object.assign(this.data, data);
      this.label.string = this.data.text;
    }

    
    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node左下角
     * @param {*} node 
     * @param {*} worldPoint 
     */
     worldConvertLocalPoint (node, worldPoint) {
      if (node) {
          return node.convertToNodeSpace(worldPoint);
      }
      return null;
    }

    // update (dt) {}
}
