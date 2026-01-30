// import fetch from 'node-fetch'


// Sample payload from EdgeOne.txt
const payload = { 
 "deploymentId": "bivgkb9rab", 
 "projectName": "xiang-time", 
 "repoBranch": "main", 
 "subscriptionId": 63, 
 "eventType": "deployment.succeeded", 
 "projectId": "pages-e3ohztndzl7f", 
 "timestamp": "2026-01-30T17:08:04.472Z" 
 }

async function test() {
  try {
    const response = await fetch('http://localhost:3001/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    const data = await response.json()
    console.log('Response Status:', response.status)
    console.log('Response Body:', JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error:', err)
  }
}

test()
