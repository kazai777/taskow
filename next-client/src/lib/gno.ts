import { GnoWSProvider } from "@gnolang/gno-js-client";
import config from "@/config";

export interface Task {
  owner: string;
  title: string;
  description: string;
  amount: number;
}

export const fetchTasks = async (provider: GnoWSProvider): Promise<Task[]> => {
  if (!provider) {
    throw new Error("Invalid chain RPC URL");
  }

  console.log("Provider:", provider);
  console.log("Realm Path:", config.REALM_PATH);

  try {
    const response: string = await provider.evaluateExpression(
      config.REALM_PATH,
      `GetTasks()`,
    );

    console.log("Raw Response:", response);

    const tasks = parseTaskFetchResponse(response);

    console.log("Parsed Tasks:", tasks);

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const parseTaskFetchResponse = (response: string): Task[] => {
  // Use a regular expression to extract the JSON content within the parentheses and quotes
  const jsonStringMatch = response.match(/^\("\[(.*)\]" string\)$/);
  if (!jsonStringMatch || jsonStringMatch.length < 2) {
    throw new Error("Invalid task response format");
  }

  // Extract and unescape the JSON string
  const jsonString = jsonStringMatch[1].replace(/\\"/g, '"');

  // Log the cleaned response
  console.log("Cleaned Response:", jsonString);

  if (jsonString === "No tasks created yet! :/") {
    return [];
  }

  try {
    return JSON.parse(`[${jsonString}]`) as Task[];
  } catch (error) {
    console.error("Error parsing task response:", error);
    throw new Error("Invalid task response format");
  }
};
