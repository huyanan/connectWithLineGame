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
      const self = this;
      self.node.on('mousedown', function ( event ) {
        // console.log(event);
        self.x = self.node.x;
        self.y = self.node.y;
        self.isFollow = true;
      });
      self.node.on('mousemove', function ( event ) {
        // console.log('Hello!');
        const location = event.getLocation();
        // console.log(location);
        if (self.isFollow) {
          // console.log(event);
          // const worldLocation = self.worldConvertLocalPoint(self.node, cc.v2(event._x, event._y));
          // self.node.x = worldLocation.x;
          // self.node.y = worldLocation.y;
          // const worldLocation = self.worldConvertLocalPoint(self.node, cc.v2(event._x, event._y));
          self.node.x = event._x;
          self.node.y = event._y;
        }
      });
      self.node.on('mouseup', function (event) {
        self.isFollow = false;
        // self.node.x = self.x;
        // self.node.y = self.y;
        const customEvent = new cc.Event.EventCustom('dragQuestionEnd', true);
        customEvent.setUserData({
          questionNode: self.node,
          position: {
            x: event._x,
            y: event._y
          }
        });
        // 节点 c 的组件脚本中
        self.node.dispatchEvent(customEvent);
      })
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
          return node.convertToNodeSpaceAR(worldPoint);
      }
      return null;
    }

    // update (dt) {}
}
