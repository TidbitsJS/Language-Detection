var SCRIPTS
async function loadData () {
  var indexImport = await import('./index.js')
  SCRIPTS = indexImport.SCRIPTS
  console.log(SCRIPTS)
  text = "निबंधाची यादी Say!"
  console.log(textScript(text))

  let inputText = document.querySelector('input')
  let check = document.querySelector('button')
  console.log(check);
  console.log(inputText)

  check.addEventListener('click', (content) => {
      console.log(inputText.value);
      let language = inputText.value

      if(language == "") {alert("Please Enter Something")}
      else {
        var para = document.createElement("p")
        var output = textScript(language)
        var node = document.createTextNode(output)
        para.appendChild(node)
        var element = document.querySelector('.element')
        element.appendChild(para)
      }
  })
}

loadData()

function textScript(text) {
  let scripts = countBy(text, char => {
    console.log("Character Passing",char);
    let script = characterScript(char.codePointAt(0))
    console.log("codePointAt", script);
    return script ? script.name : "none"
  }).filter(({name}) => name != "none")

  let total = scripts.reduce((n, {count}) => n + count, 0)
  console.log(total);
  if(total == 0) return "No scripts found"

  return scripts.map(({name, count}) => {
    console.log("Name and count are", name,count);
    return `${Math.round(count * 100 / total)}% ${name}`
  }).join(",")
}

function countBy(items, groupName) {
  console.log("Items rendering in countBy",items);
  console.log("groupName functionality", groupName);
  let counts = []
  for(let item of items) {
    let name = groupName(item)
    console.log("GroupName name", name)
    let known = counts.findIndex(c => c.name === name)
    console.log("known is", known);
    if(known == -1) {
      counts.push({name, count: 1})
    }
    else {
      counts[known].count++
    }
  }
  console.log("Count here",counts);
  return counts
}

function characterScript(code) {
  for(let script of SCRIPTS) {
    if(script.ranges.some(([from, to]) => {
      return code >= from && code < to
    })) {
      return script
    }
  }
  return null
}
