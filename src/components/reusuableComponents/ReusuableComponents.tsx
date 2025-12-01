
// export onst getLastTwoWords = (str: string): string => {
//     if (!str) return '';
//     const words = str.trim().split(/\s+/);
//     SetUpdateTextValue(words.slice(-3).join(' '))
//     return words.slice(-3).join(' ');
//   };

  export const getLastWords = (str: string, wordCount: number = 3): string => {
    if (!str) return '';
    const words = str.trim().split(/\s+/);
    return words.slice(-wordCount).join(' ');
};
