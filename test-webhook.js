// import fetch from 'node-fetch'


// Sample payload from EdgeOne.txt
const payload = {
  "eventType": "deployment.created",
  "appId": "app-123",
  "projectId": "project-456",
  "deploymentId": "deploy-789",
  "projectName": "my-project",
  "repoBranch": "main",
  "timestamp": "2024-01-13T12:34:56.789Z"
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
