
export const getDataFromLocalStorage = <T>(
    key: string,
    initialState: T
  ): T => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        try {
          return { ...initialState, ...JSON.parse(savedData) };
        } catch (error) {
          console.error("Error parsing localStorage data for key:", key, error);
        }
      }
    }
    return initialState;
  };
  
  export const saveDataToLocalStorage = <T>(
    key: string,
    data: T
  ): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving data to localStorage for key:", key, error);
      }
    }
  };
  