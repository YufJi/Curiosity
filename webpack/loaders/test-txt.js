

function testLoader(content) {
  console.log(typeof content, 'content type');
  const json = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `export default ${json}`;
}

module.exports = testLoader;
