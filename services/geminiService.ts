
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, LogType } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        totalLogEntries: { type: Type.INTEGER, description: "Total number of log entries processed." },
        threatsDetected: { type: Type.INTEGER, description: "Total number of unique security threats detected." },
        highSeverityAlerts: { type: Type.INTEGER, description: "Count of threats with 'High' or 'Critical' severity." },
      },
    },
    threats: {
      type: Type.ARRAY,
      description: "A list of all detected security threats.",
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.STRING, description: "Timestamp of the threat occurrence in ISO 8601 format." },
          sourceIp: { type: Type.STRING, description: "Source IP address of the attacker." },
          threatType: { type: Type.STRING, description: "Classification of the threat (e.g., 'Brute-Force', 'Directory Fuzzing', 'SQL Injection Attempt')." },
          severity: { type: Type.STRING, description: "Severity of the threat: 'Low', 'Medium', 'High', or 'Critical'." },
          description: { type: Type.STRING, description: "A brief summary of why this event is considered a threat." },
          logEntry: { type: Type.STRING, description: "The raw log line that triggered this detection." },
        },
      },
    },
    timelineData: {
      type: Type.ARRAY,
      description: "Data for a time-series chart, showing threat counts aggregated by hour.",
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING, description: "The hour of the day (e.g., '10:00', '11:00')." },
          count: { type: Type.INTEGER, description: "Number of threats detected in that hour." },
        },
      },
    },
    attackTypeDistribution: {
      type: Type.ARRAY,
      description: "Data for a pie chart, showing the distribution of different attack types.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the attack type." },
          value: { type: Type.INTEGER, description: "The count for this attack type." },
        },
      },
    },
    topAttackers: {
      type: Type.ARRAY,
      description: "A list of the top 5 most frequent attacker IP addresses.",
      items: {
        type: Type.OBJECT,
        properties: {
          ip: { type: Type.STRING, description: "The attacker's IP address." },
          count: { type: Type.INTEGER, description: "The number of attacks from this IP." },
        },
      },
    },
  },
};


export const analyzeLogFile = async (logContent: string, logType: LogType): Promise<AnalysisResult> => {
  const prompt = `
    You are a world-class cybersecurity analyst AI named SentinelLog. Your task is to analyze the provided ${logType} log data and identify security threats.
    
    Analyze the following log content:
    ---
    ${logContent.substring(0, 20000)} 
    ---
    
    Please perform the following actions:
    1.  Parse the log entries to identify suspicious activities like brute-force attacks, directory fuzzing, probing, SQL injection attempts, XSS attempts, and other anomalies.
    2.  For each identified threat, extract key information: timestamp, source IP, threat type, severity, a brief description, and the raw log entry.
    3.  Aggregate the data to provide summaries for a dashboard visualization.
    4.  Return the entire analysis in the specified JSON format. Ensure timeline data is sorted chronologically.
    5. Summarize the number of total logs, threats and high severity alerts. High severity alerts are those with 'High' or 'Critical' severity.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);

    // Sort timeline data just in case the model doesn't
    if (result.timelineData) {
      result.timelineData.sort((a: { time: string }, b: { time: string }) => a.time.localeCompare(b.time));
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
