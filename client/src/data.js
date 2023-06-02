export const predefinedTemplates = (profession) => {
  const data = [
    {
      id: 1,
      name: "Subjective, Objective, Assessment, Plan (SOAP)",
      description: `You are a ${profession}, create a comprehensive four paragraph SOAP note that supports medical necessity. Be sure to make the subjective and objective sections distinct from one another`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 2,
      name: "Behavior, Intervention, Response, Plan (BIRP)",
      description: `You are a ${profession}, create a 3 page Behavior intervention response plan note that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 3,
      name: "Situation, Background, Assessment, Recommendation (SBAR)",
      description: `You are a ${profession}, create a comprehensive SBAR (situation background, assessment, recommendation)  note that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 4,
      name: "Progress Note",
      description: `You are a medical ${profession}, create a comprehensive progress note that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 5,
      name: "Treatment Plan",
      description: `You are a ${profession}, create a comprehensive treatment planthat supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 6,
      name: "Discharge Summary",
      description: `You are a ${profession}, create a 1-2 page discharge summary that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 7,
      name: "Critical incident report",
      description: `You are a ${profession}, create a critical incident report that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 8,
      name: "Recommendations",
      description: `You are a ${profession}, create medical recommendations for patients that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 9,
      name: "Problem Intervention Evaluation",
      description: `You are a ${profession}, create a comprehensive 3 paragraph PIE (problem intervention evaluation) note that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 10,
      name: "Report Intake",
      description: `You are a ${profession}, create a comprehensive intake note that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 11,
      name: "Crisis Intervention",
      description: `You are a medical ${profession}, create a comprehensive crisis management note that supports medical necessity`,
      profession: `${profession}`,
      type: "predefined"
    },
    {
      id: 12,
      name: "Task Management",
      description: `You are a medical ${profession}, create a comprehensive task management note`,
      profession: `${profession}`,
      type: "predefined"
    }
  ]
  
  return data
}
