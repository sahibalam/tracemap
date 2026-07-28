// backend/src/config/createEmailLogsTable.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { docClient } from "./aws.js";

export const createEmailLogsTable = async () => {
  try {
    console.log("📊 Creating EmailChangeLogs table...");
    
    const command = new CreateTableCommand({
      TableName: "EmailChangeLogs",
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" }
      ],
      BillingMode: "PAY_PER_REQUEST",
      TimeToLiveSpecification: {
        AttributeName: "ttl",
        Enabled: true
      }
    });

    await docClient.send(command);
    console.log("✅ EmailChangeLogs table created successfully");
  } catch (error) {
    if (error.name === "ResourceInUseException") {
      console.log("ℹ️ EmailChangeLogs table already exists");
    } else {
      console.error("❌ Error creating EmailChangeLogs table:", error);
    }
  }
};

export default createEmailLogsTable;