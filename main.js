const fs = require("fs");

let menu = JSON.parse(fs.readFileSync("./menu.json", 'utf-8'));

// Tag for player who is using menu.
const iuTag = menu.iuTag;
// Tag for player who can use menu.
const cuTag = menu.cuTag;
// Objective for menu item counter.
const mCtrScb = menu.mCtrScb;
// Objective for menu page.
const mLayerScb = menu.mLayerScb;
// Objective for menu color.
const mColorScb = menu.mColorScb;
// Must be single character.
// Prompt for selected menu item.
const prompt = menu.prompt;

//let text = `execute @a[tag=${iuTag},scores={${mLayerScb}=${menu.Layer}}] ~~~ titleraw @s actionbar `;
let text = `execute as @a[tag=${iuTag},scores={${mLayerScb}=${menu.Layer}}] run titleraw @s actionbar `;
//let text = `execute as @a[tag=${iuTag}] run titleraw @s actionbar `;

let object = { rawtext: [] };

menu.Content.forEach((content, ind) => {
  let isFinal = ind == menu.Content.length - 1;
  if (content.Static)
    object.rawtext.push(genStr(content.Text, content.NewLine, isFinal, true));
  else {
    object.rawtext.push(genSelectScb(content.Ctr));
    object.rawtext.push(genStr(content.Text, content.NewLine, isFinal, false));
  }
});

function genSelectScb(ctr) {
  return {
    score: {
      objective: mColorScb,
      name: `@s[scores={${mCtrScb}=${ctr}}]`
    }
  }
}

function genStr(str, newLine, final, static) {
  let obj;

  if (final)
    obj = { text: `${static ? '' : prompt}${str}` };
  else
    obj = { text: `${static ? '' : prompt}${str}${newLine ? '\n§r§' : '§r§'}` };

  return obj;
}

fs.writeFileSync("./result.txt", JSON.stringify(object));