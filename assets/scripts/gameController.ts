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

    @property(cc.String)
    text: string = 'hello';

    @property(cc.Prefab)
    answerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    questionPrefab: cc.Prefab = null;

    @property(cc.Node)
    main: cc.Node = null;

    // 问题的x坐标
    @property
    questionX: number = 100;
    // 问题的上下间距
    @property
    questionSpaceY: number = 20;

    // 答案的x坐标
    @property
    answerX: number = 500;
    // 问题的上下间距
    @property
    answerSpaceY: number = 20;

    answerList: Array<cc.Node> = [];

    
    

    // @property(cc.Node)
    // questionList: cc.Component = null;

    // @property(cc.Component)
    // answerList: cc.Component = null;

    // @property(cc.Component)
    // questionList: 

    // @property(cc.Array)
    answers: Array<Object> = [];
    questions: Array<Object> = [];

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      cc.director.getCollisionManager().enabled = true;
      cc.director.getCollisionManager().enabledDebugDraw = true;
      // this.question = cc.instantiate(this.questionPrefab);
      const self = this;

      this.mockData();
      this.init();
      self.node.on('mousedown', function ( event ) {
        // console.log('gameController.ts', event);
      });

      self.node.on('dragQuestionEnd', function (event) {
        console.log('dragQuestionEnd', event);
        const userData = event.getUserData();
        // 检查是否答对了
        self.checkResult(userData);
      });

      
    }

    start () {
      
    }

    mockData () {
      this.questions = [
        {
          text: '1+1=',
          answerId: '111'
        },
        {
          text: '2+2=',
          answerId: '222'
        }
      ];

      this.answers = [
        {
          id: '111',
          text: '2'
        },
        {
          id: '222',
          text: '4'
        }
      ];
      console.log(this.answers);
    }

    init () {
      this.createQuestions();
      this.createAnswers();
    }

    // 创建题目节点
    createQuestions () {
      this.questions.forEach((questionData, index) => {
        var question = cc.instantiate(this.questionPrefab);
        this.main.addChild(question);
        // question.width = 100;
        // question.height = 100;
        const questionY = this.getQuestionY(this.questions.length, index, question.height, this.questionSpaceY);
        // question.setPosition(this.questionX, questionY);
        question.setPosition(this.questionX, questionY);
        const questionController = question.getComponent('questionController');
        questionController.init(questionData);
      })
    }

    // 获取问题的y坐标
    getQuestionY (length, index, height, spaceY) {
      const questionListHeight = height * length + spaceY * (length -1);
      const questionListY = (this.node.height - questionListHeight) / 2;
      const curtQuestionY = questionListY + height * index + spaceY * index + height / 2;
      return curtQuestionY;
    }

    // 创建答案节点
    createAnswers () {
      this.answers.forEach((answerData, index) => {
        var answer = cc.instantiate(this.answerPrefab);
        this.answerList.push(answer);
        this.main.addChild(answer);
        // answer.width = 100;
        // answer.height = 100;
        const answerY = this.getAnswerY(this.answers.length, index, answer.height, this.answerSpaceY);
        // answer.setPosition(this.answerX, answerY);
        answer.setPosition(this.answerX, answerY);
        const answerController = answer.getComponent('answerController');
        answerController.init(answerData);
      })
    }

    // 获取问题的y坐标
    getAnswerY (length, index, height, spaceY) {
      const answerListHeight = height * length + spaceY * (length -1);
      const answerListY = (this.node.height - answerListHeight) / 2;
      const curtAnswerY = answerListY + height * index + spaceY * index + height / 2;
      return curtAnswerY;
    }

    // 查看是否答对了
    checkResult ({questionNode, position}) {
      const questionPosition = questionNode.getPosition();
      const questionController = questionNode.getComponent('questionController');
      const questionRect = new cc.Rect(questionNode.x, questionNode.y, questionNode.width, questionNode.height);
      const touchAnswer = this.answerList.find((answer) => {
        const answerRect = new cc.Rect(answer.x, answer.y, answer.width, answer.height);
        return cc.Intersection.rectRect(questionRect, answerRect);
        // return answer.position.sub(questionPosition).mag() < 0;
      });
      const touchAnswerController = touchAnswer.getComponent('answerController');
      if (touchAnswer) {
        if (questionController.data.answerId === touchAnswerController.data.id) {
          console.log('答对了');
        } else {
          console.log('答错了');
        }

      }
    }

    // 碰撞检测
    
    

    // update (dt) {}
}
