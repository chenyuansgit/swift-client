const SwiftClient = require('../index');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const {SWIFT_USERNAME, SWIFT_PASSWORD, SWIFT_AUTHURL, SWIFT_VERSION} = process.env;


async function test() {
  let client = await SwiftClient.create(SWIFT_AUTHURL,
    SWIFT_USERNAME, SWIFT_PASSWORD, SWIFT_VERSION);

 /* let result = await client.list();
  console.log("###result:", result)*/
 /* let data = await client.create('my-container333', true, {colour: 'blue'});
  console.log("###data:", data)*/

  let stream = fs.createReadStream('test.txt');

  let container = client.container('my-container333');
  const data = await container.create('test.txt',
    stream, {author: 'Arthur chenyuan'});
  console.log("####data:", data);
}

test();