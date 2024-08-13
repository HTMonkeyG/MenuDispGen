let menu = {
  Layer: 1,
  Content: [
    {
      Static: true,
      Text: '§b地图控制菜单§r§a/§b传送',
      NewLine: true
    },
    {
      Ctr: 0,
      Text: '上一层',
      NewLine: true
    }
  ]
};

/*menu = {
  Layer: 2,
  Content: [
    {
      Static: true,
      Text: '§d女巫§d操作面板\n§b请在下方选择目标',
      NewLine: true
    },
    {
      Ctr: 0,
      Text: '§c红',
      NewLine: true
    },
    {
      Ctr: 1,
      Text: '§9蓝',
      NewLine: true
    },
    {
      Ctr: 2,
      Text: '§d粉',
      NewLine: true
    },
    {
      Ctr: 3,
      Text: '§5紫',
      NewLine: true
    },
    {
      Ctr: 4,
      Text: '§a绿',
      NewLine: true
    },
    {
      Ctr: 5,
      Text: '§e黄',
      NewLine: true
    },
    {
      Ctr: 6,
      Text: '§f白',
      NewLine: true
    },
    {
      Ctr: 7,
      Text: '§7灰',
      NewLine: true
    }
  ]
};*/

const iuTag = 'iu';
const cuTag = 'cu';
const mCtrScb = 'mCtr';
const mLayerScb = 'mLayer';
const mColorScb = 'mColor';
const pointer = '＞';

let text = `execute @a[tag=${iuTag},scores={${mLayerScb}=${menu.Layer}}] ~~~ titleraw @s actionbar `;

//text = `execute @a[tag=${iuTag}] ~~~ titleraw @s actionbar `;

let object = {
  rawtext: []
};

for(let i = 0;i < menu.Content.length;i++){
  let content = menu.Content[i];
  let isFinal = (i == menu.Content.length - 1);
  if(content.Static){
    object.rawtext.push(genStr(content.Text, content.NewLine, isFinal, true));
  } else {
    object.rawtext.push(genScb(content.Ctr));
    object.rawtext.push(genStr(content.Text,  content.NewLine, isFinal, false));
  }
}

function genScb(ctr){
  let obj = {
    score: {
      objective: mColorScb,
      name: `@s[scores={${mCtrScb}=${ctr}}]`
    }
  };

  return obj;
}

function genStr(str, newLine, final, static){
  let obj;

  if(final){
    obj = {
      text: `${static ? '' : pointer}${str}`
    };
  } else {
    obj = {
      text: `${static ? '' : pointer}${str}${newLine ? '\n§r§' : '§r§'}`
    };
  }

  return obj;
}

console.log(text, JSON.stringify(object));