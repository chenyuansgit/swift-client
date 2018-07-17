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

  const filename = 'orders.csv';
  const containername = 'my-container333';
  let stream = fs.createReadStream(filename);

  let container = client.container(containername);
  const data = await container.create(filename,
    stream, {author: 'Arthur chenyuan'});


  console.log("####请访问网址:", `http://**host**/test/${containername}/${filename}`);
}
test();

