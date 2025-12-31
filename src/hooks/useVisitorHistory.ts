const STORAGE_KEY = "instaespiao_visitor";

interface VisitorData {
  username: string;
  firstVisit: number;
  hasCompletedFlow: boolean;
}

export const useVisitorHistory = () => {
  const getVisitorData = (): VisitorData | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error reading visitor data:", error);
    }
    return null;
  };

  const markAsVisited = (username: string) => {
    try {
      const existingData = getVisitorData();
      const visitorData: VisitorData = {
        username,
        firstVisit: existingData?.firstVisit || Date.now(),
        hasCompletedFlow: true,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visitorData));
    } catch (error) {
      console.error("Error saving visitor data:", error);
    }
  };

  const hasVisited = (): boolean => {
    const data = getVisitorData();
    return data?.hasCompletedFlow || false;
  };

  const getSavedUsername = (): string | null => {
    const data = getVisitorData();
    return data?.username || null;
  };

  const getTimeSinceFirstVisit = (): number | null => {
    const data = getVisitorData();
    if (data?.firstVisit) {
      return Date.now() - data.firstVisit;
    }
    return null;
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing visitor data:", error);
    }
  };

  return {
    getVisitorData,
    markAsVisited,
    hasVisited,
    getSavedUsername,
    getTimeSinceFirstVisit,
    clearHistory,
  };
};
