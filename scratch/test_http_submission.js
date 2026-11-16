const fs = require('fs');

async function testSubmit() {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  
  const typePart = `--${boundary}\r\nContent-Disposition: form-data; name="type"\r\n\r\ncage\r\n`;
  const specsPart = `--${boundary}\r\nContent-Disposition: form-data; name="specs"\r\n\r\n{"diameter":"28 ft Professional Octagon","canvasColor":"Matte Black","meshColor":"Heavy PVC Black"}\r\n`;
  const customerPart = `--${boundary}\r\nContent-Disposition: form-data; name="customer"\r\n\r\n{"name":"Arjun Pro Gym","phone":"+91 9988776655","city":"Bangalore","timeline":"Immediate"}\r\n`;
  
  // Dummy png file content (1x1 transparent png)
  const fakePngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  const fileHeader = `--${boundary}\r\nContent-Disposition: form-data; name="photos"; filename="arjun_gym_center_logo.png"\r\nContent-Type: image/png\r\n\r\n`;
  const fileEnd = `\r\n--${boundary}--\r\n`;

  const body = Buffer.concat([
    Buffer.from(typePart, 'utf8'),
    Buffer.from(specsPart, 'utf8'),
    Buffer.from(customerPart, 'utf8'),
    Buffer.from(fileHeader, 'utf8'),
    fakePngBuffer,
    Buffer.from(fileEnd, 'utf8')
  ]);

  console.log("Submitting custom cage enquiry via HTTP to http://localhost:3000/api/custom-enquiry...");
  const res = await fetch('http://localhost:3000/api/custom-enquiry', {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    },
    body
  });

  const json = await res.json();
  console.log("Response from server:", json);

  // Check mongo-status
  const statusRes = await fetch('http://localhost:3000/api/mongo-status');
  const statusJson = await statusRes.json();
  console.log("Updated Mongo Status:", statusJson);
}

testSubmit().catch(console.error);
