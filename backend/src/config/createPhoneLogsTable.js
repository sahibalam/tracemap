// backend/src/config/createPhoneLogsTable.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { docClient } from "./aws.js";

export const createPhoneLogsTable = async () => {
  try {
    console.log("📊 Creating PhoneChangeLogs table...");
    
    const command = new CreateTableCommand({
      TableName: "PhoneChangeLogs",
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
    console.log("✅ PhoneChangeLogs table created successfully");
    return { success: true };
  } catch (error) {
    if (error.name === "ResourceInUseException") {
      console.log("ℹ️ PhoneChangeLogs table already exists");
      return { success: true, exists: true };
    } else {
      console.error("❌ Error creating PhoneChangeLogs table:", error);
      throw error;
    }
  }
};

// Auto-execute when run directly
const run = async () => {
  try {
    await createPhoneLogsTable();
    console.log("✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed:", error.message);
    process.exit(1);
  }
};

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}

export default createPhoneLogsTable;