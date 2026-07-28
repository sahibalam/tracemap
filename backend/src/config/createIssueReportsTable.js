// backend/src/config/createIssueReportsTable.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { docClient } from "./aws.js";

export const createIssueReportsTable = async () => {
  try {
    console.log("📊 Creating IssueReports table...");
    
    const command = new CreateTableCommand({
      TableName: "IssueReports",
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
    console.log("✅ IssueReports table created successfully");
    return { success: true };
  } catch (error) {
    if (error.name === "ResourceInUseException") {
      console.log("ℹ️ IssueReports table already exists");
      return { success: true, exists: true };
    } else {
      console.error("❌ Error creating IssueReports table:", error);
      throw error;
    }
  }
};

// Auto-execute when run directly
const run = async () => {
  try {
    await createIssueReportsTable();
    console.log("✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed:", error.message);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}

export default createIssueReportsTable;