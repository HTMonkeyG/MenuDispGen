const fs = require("fs");

var menu = JSON.parse(fs.readFileSync("./menu.json", 'utf-8'));

// Tag for player who is using menu.
var iuTag = menu.iuTag
  // Tag for player who can use menu.
  , cuTag = menu.cuTag
  // Objective for menu item counter.
  , mCtrScb = menu.mCtrScb
  // Objective for menu page.
  , mLayerScb = menu.mLayerScb
  // Objective for menu color.
  , mColorScb = menu.mColorScb
  // Must be single character.
  // Prompt for selected menu item.
  , prompt = menu.prompt
  // Only returns JSON part of command
  , onlyJson = menu.onlyJson;

//var text = `execute @a[tag=${iuTag},scores={${mLayerScb}=${menu.Layer}}] ~~~ titleraw @s actionbar `;
var text = `execute as @a[tag=${iuTag},scores={${mLayerScb}=${menu.Layer}}] run titleraw @s actionbar `;
//var text = `execute as @a[tag=${iuTag}] run titleraw @s actionbar `;

var object = { rawtext: [] };

for (var ind = 0; ind < menu.Content.length; ind++) {
  var content = menu.Content[ind]
    , isFinal = !menu.Content[ind + 1]
    , nextStatic = menu.Content[ind + 1] && menu.Content[ind + 1].Static
    , obj = null;

  if (content.Score)
    obj = genDispScb(
      content.Score.Objective,
      content.Score.Name,
      content.NewLine,
      isFinal,
      content.Static,
      nextStatic
    );
  else
    obj = genStr(
      content.Text,
      content.NewLine,
      isFinal,
      content.Static,
      nextStatic
    );

  content.Static || object.rawtext.push(genSelectScb(content.Ctr));
  object.rawtext.push(obj);
}

function genSelectScb(ctr) {
  return {
    score: {
      objective: mColorScb,
      name: `@s[scores={${mCtrScb}=${ctr}}]`
    }
  }
}

function genDispScb(obj, name, newLine, final, static, nextStatic) {
  var result = [], a = nextStatic ? '' : '§';
  !static && result.push({ text: prompt });
  result.push(
    {
      score: {
        objective: obj,
        name: name
      }
    },
    { text: final ? '' : newLine ? '\n§r' + a : a }
  );
  return result
}

function genStr(str, newLine, final, static, nextStatic) {
  var a = nextStatic ? '' : '§';
  return { text: `${static ? '' : prompt}${str}${final ? '' : newLine ? '\n§r' + a : a}` }
}

object.rawtext = object.rawtext.flat();

fs.writeFileSync("./result.txt", (onlyJson ? '' : text) + JSON.stringify(object));