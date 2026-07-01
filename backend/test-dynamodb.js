// backend/test-dynamodb.js
import { docClient, WORKER_WIZARD_TABLE } from './src/config/aws.js'
import { ListTablesCommand } from '@aws-sdk/client-dynamodb'

const testDynamoDB = async () => {
  try {
    const result = await docClient.send(new ListTablesCommand({}))
    console.log('✅ DynamoDB Connection Successful!')
    console.log('🗄️ Tables:', result.TableNames.join(', '))
  } catch (error) {
    console.error('❌ DynamoDB Connection Failed:', error.message)
  }
}

testDynamoDB()